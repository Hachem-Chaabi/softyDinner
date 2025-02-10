import { Helmet } from 'react-helmet-async'
import DarkModeProvider from '../modules/shared/provider/DarkModeProvider'
import InternationalizationProvider from '../modules/shared/provider/InternationalizationProvider'
import routes, { renderRoutes } from '../modules/shared/routes'

const App = () => {
  return (
    <main className={'app'}>
      <Helmet>
        <title>SoftyDinner</title>
        <link rel="icon" type="image/png" href="/favicon.png" />
      </Helmet>

      <DarkModeProvider>
        <InternationalizationProvider>{renderRoutes(routes)}</InternationalizationProvider>
      </DarkModeProvider>
    </main>
  )
}

export default App
