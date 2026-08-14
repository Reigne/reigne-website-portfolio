const ASCII_CHARACTERS = '@#S08Xx+=-;:.'

export function createAsciiField(rows = 760, columns = 480, initialSeed = 918273) {
  let seed = initialSeed
  const random = () => {
    seed = (seed * 1664525 + 1013904223) % 4294967296
    return seed / 4294967296
  }

  return Array.from({ length: rows }, () => {
    return Array.from({ length: columns }, () => {
      if (random() < 0.13) return ' '
      return ASCII_CHARACTERS[Math.floor(random() * ASCII_CHARACTERS.length)]
    }).join('')
  }).join('\n')
}
