import { useEffect } from 'react'

const HomeScreen = () => {
  useEffect(() => {}, [])

  return (
    <div className='text-center'>
      <h1 className='fs-6 text-info fw-lighter'>Welcome To</h1>
      <p className='text-info fw-lighter display-1 '>MERN Stack Boilerplate</p>
      <span className='spinner-border text-info mt-5'>Welcome</span>
    </div>
  )
}

export default HomeScreen
