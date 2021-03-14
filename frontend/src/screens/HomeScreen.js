import { useEffect } from 'react'

const HomeScreen = () => {
  useEffect(() => {}, [])

  return (
    <div className='text-center'>
      <h1 className='fs-6 custom-text-yellow fw-lighter'>Welcome To</h1>
      <p className='custom-text-yellow fw-lighter display-1 '>
        MERN Stack Boilerplate{' '}
      </p>
      <span className='spinner-grow custom-text-yellow mt-5' /> <br />
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
