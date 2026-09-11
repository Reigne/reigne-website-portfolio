import { renderToString } from 'react-dom/server'
import { StaticRouter } from 'react-router-dom'
import SiteRoutes from './SiteRoutes'

export function render(path) {
  return renderToString(<StaticRouter location={path}><SiteRoutes /></StaticRouter>)
}
