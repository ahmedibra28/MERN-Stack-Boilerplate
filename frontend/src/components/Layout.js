import Navigation from './Navigation'
import Footer from './Footer'

export default function Layout({ children }) {
  return (
    <>
      {/* <Helmet>
        <title>NEXT.js Boilerplate</title>
        <meta property='og:title' content='NEXT.js Boilerplate' key='title' />
      </Helmet> */}
      <Navigation />
      <main className='container py-2' style={{ minHeight: '70vh' }}>
        {children}
      </main>
      <Footer />
    </>
  )
}
