import { useEffect } from 'react'

const HomeScreen = () => {
  useEffect(() => {}, [])

  return (
    <div className='text-center'>
      <h1 className='fs-6 fw-lighter'>Welcome To</h1>
      <p className='fw-lighter display-1 '>MERN Stack Boilerplate </p>
      <span className='spinner-grow mt-5' /> <br />
      <span>
        Built & Design by{' '}
        <a href='https://ahmaat.tk' target='blank'>
          {' '}
          https://ahmaat.tk
        </a>
      </span>
    </div>
  )
}

export default HomeScreen
