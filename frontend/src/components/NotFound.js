const NotFound = () => {
  return (
    <div>
      <div className='text-danger text-center mt-5 '>
        <span
          className='spinner-border'
          style={{ width: '200px', height: '200px' }}
        ></span>
      </div>

      <h1 className='x-large text-danger text-center  display-1'>
        Page Not Found
      </h1>
      <p className='text-center text-muted'>Sorry, this page does not exist</p>
    </div>
  )
}

export default NotFound
