import { useEffect } from 'react'
import { FormContainer, Message } from '../../components'
import { useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { inputEmail } from '../../utils/dynamicForm'
import useAuthHook from '../../api/auth'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet'

const ForgotPassword = () => {
  useAuth()
  const { postForgotPassword } = useAuthHook()
  const navigate = useNavigate()
  const { auth } = useAuth()
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { isLoading, isError, error, isSuccess, mutateAsync } =
    postForgotPassword

  useEffect(() => {
    isSuccess && reset()
  }, [isSuccess])

  useEffect(() => {
    auth?.userInfo && navigate('/')
  }, [navigate])

  const submitHandler = (data) => {
    mutateAsync(data)
  }
  return (
    <FormContainer>
      <Helmet>
        <title>Forgot</title>
        <meta property='og:title' content='Forgot' key='title' />
      </Helmet>
      <h3 className='fw-light font-monospace text-center'>Forgot Password</h3>
      {isSuccess && (
        <Message variant='success'>
          An email has been sent with further instructions.
        </Message>
      )}
      {isError && <Message variant='danger'>{error}</Message>}

      <form onSubmit={handleSubmit(submitHandler)}>
        {inputEmail({
          register,
          errors,
          label: 'Email',
          name: 'email',
          placeholder: 'Email',
        })}

        <button
          type='submit'
          className='btn btn-primary form-control '
          disabled={isLoading}
        >
          {isLoading ? (
            <span className='spinner-border spinner-border-sm' />
          ) : (
            'Send'
          )}
        </button>
      </form>
    </FormContainer>
  )
}

export default ForgotPassword
