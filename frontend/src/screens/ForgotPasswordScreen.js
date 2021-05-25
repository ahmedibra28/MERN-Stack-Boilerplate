import { useEffect } from 'react'
import Message from '../components/Message'
import FormContainer from '../components/FormContainer'
import { useForm } from 'react-hook-form'

import { forgotPassword } from '../api/users'
import { useMutation } from 'react-query'

const ForgotPasswordScreen = ({ history }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm()

  const { isLoading, isError, error, isSuccess, mutateAsync } = useMutation(
    'forgotpassword',
    forgotPassword,
    {
      retry: 0,
      onSuccess: () => {
        reset()
      },
    }
  )

  useEffect(() => {
    if (localStorage.getItem('userInfo')) {
      history.push('/')
    }
  }, [history])

  const submitHandler = (data) => {
    mutateAsync(data)
  }
  return (
    <FormContainer>
      <h3 className=''>Forgot Password</h3>
      {isSuccess && (
        <Message variant='success'>
          An email has been sent with further instructions.
        </Message>
      )}
      {isError && <Message variant='danger'>{error}</Message>}

      <form onSubmit={handleSubmit(submitHandler)}>
        <div className='mb-3'>
          <label htmlFor='email'>Email Address</label>
          <input
            {...register('email', {
              required: 'Email is required',
              pattern: {
                value: /\S+@\S+\.+\S+/,
                message: 'Entered value does not match email format',
              },
            })}
            type='email'
            placeholder='Enter email'
            className='form-control'
            autoFocus
          />
          {errors.email && (
            <span className='text-danger'>{errors.email.message}</span>
          )}
        </div>

        <button
          type='submit'
          className='btn btn-primary  '
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

export default ForgotPasswordScreen
