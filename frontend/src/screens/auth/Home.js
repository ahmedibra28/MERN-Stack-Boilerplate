import { Helmet } from 'react-helmet'

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Home Page</title>
        <meta property='og:title' content='Home Page' key='title' />
      </Helmet>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '70vh' }}
      >
        <span className='text-muted'>Welcome MERN Boilerplate</span>
      </div>
    </>
  )
}

export default Home
