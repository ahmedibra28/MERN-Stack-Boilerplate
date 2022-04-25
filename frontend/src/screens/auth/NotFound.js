import { Helmet } from 'react-helmet'

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>404 - Not Found</title>
        <meta property='og:title' content='404 - Not Found' key='title' />
      </Helmet>
      <div
        className='d-flex justify-content-center align-items-center'
        style={{ height: '70vh' }}
      >
        <span className='text-muted'>
          <span className='fw-bold'>404 </span> Not Found
        </span>
      </div>
    </>
  )
}

export default NotFound
