const GITHUB_USERNAME = 'Reigne'

export const parseGitHubContributions = (html, today = new Date()) => {
  const year = today.getUTCFullYear()
  const totalMatch = html.match(/<h2[^>]*id="js-contribution-activity-description"[^>]*>\s*([\d,]+)\s+contributions?/i)
  const dayPattern = /data-date="(\d{4}-\d{2}-\d{2})"[\s\S]*?data-level="([0-4])"[\s\S]*?class="ContributionCalendar-day"><\/td>\s*<tool-tip[^>]*>([^<]+)<\/tool-tip>/g
  const cutoff = today.toISOString().slice(0, 10)
  const days = []
  let match

  while ((match = dayPattern.exec(html)) !== null) {
    const [, date, level, label] = match
    if (!date.startsWith(`${year}-`) || date > cutoff) continue

    const countMatch = label.match(/([\d,]+) contributions?/i)
    days.push({
      date,
      level: Number(level),
      count: countMatch ? Number(countMatch[1].replaceAll(',', '')) : 0,
    })
  }

  if (!days.length) throw new Error('GitHub returned no contribution days')

  days.sort((first, second) => first.date.localeCompare(second.date))

  return {
    username: GITHUB_USERNAME,
    year,
    total: totalMatch
      ? Number(totalMatch[1].replaceAll(',', ''))
      : days.reduce((sum, day) => sum + day.count, 0),
    days,
    updatedAt: today.toISOString(),
  }
}

export default async function handler(_request, response) {
  try {
    const today = new Date()
    const year = today.getUTCFullYear()
    const githubResponse = await fetch(`https://github.com/users/${GITHUB_USERNAME}/contributions?from=${year}-01-01&to=${today.toISOString().slice(0, 10)}`, {
      headers: {
        Accept: 'text/html',
        'User-Agent': 'reigne-portfolio',
      },
    })

    if (!githubResponse.ok) throw new Error(`GitHub responded with ${githubResponse.status}`)

    const data = parseGitHubContributions(await githubResponse.text(), today)
    response.setHeader('Cache-Control', 'public, s-maxage=3600, stale-while-revalidate=86400')
    response.status(200).json(data)
  } catch {
    response.status(502).json({ error: 'Contribution data is temporarily unavailable' })
  }
}
