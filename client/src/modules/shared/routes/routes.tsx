import sharedRoutes from './sharedRoutes'
import authRoutes from '../../auth/routes/routes'
import homeRoutes from '../../home/routes/routes'
import menuRoutes from '../../menu/routes/routes'
import favoriteRoutes from '../../favorite/routes/routes'
import donationRoutes from '../../donation/routes/routes'

const routes = [
  ...sharedRoutes,
  ...authRoutes,
  ...homeRoutes,
  ...menuRoutes,
  ...favoriteRoutes,
  ...donationRoutes,
]

export default routes
