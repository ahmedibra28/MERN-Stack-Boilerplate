import { useEffect } from 'react'

const HomeScreen = () => {
  useEffect(() => {}, [])

  return (
    <div className='text-center'>
      <h1 className='fs-6 text-light fw-lighter'>Welcome To</h1>
      <p className='text-light fw-lighter display-1 '>
        MERN Stack Boilerplate{' '}
      </p>
      <span className='spinner-border text-light mt-5'>Welcome</span>
    </div>
  )
}

export default HomeScreen
