const NotFound = () => {
  return (
    <div
      className='d-flex justify-content-center align-content-center h-100 mt-5 pt-5 text-primary'
      style={{ letterSpacing: '3px' }}
    >
      <span
        style={{ letterSpace: '2rem' }}
        className=' fs-2 my-auto border border-start-0 border-top-0 border-bottom-0  border-primary px-3 mx-3 fw-bold'
      >
        404{' '}
      </span>{' '}
      <span className='my-auto'>This page could not be found.</span>
    </div>
  )
}

export default NotFound
