import React from 'react'

const FormContainer = ({ children }) => {
  return (
    <div className='container'>
      <div className='row  d-flex justify-content-center align-items-center vh100'>
        <div className='col-12 col-md-6'>{children}</div>
      </div>
    </div>
  )
}

export default FormContainer
