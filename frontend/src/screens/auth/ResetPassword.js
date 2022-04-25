import { useEffect } from 'react'
import { FormContainer, Message } from '../../components'
import { useForm } from 'react-hook-form'
import { useNavigate, useParams } from 'react-router-dom'
import { inputPassword } from '../../utils/dynamicForm'
import useAuthHook from '../../api/auth'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet'

const ResetPassword = () => {
  const { postResetPassword } = useAuthHook()
  const param = useParams()
  const navigate = useNavigate()
  const { auth } = useAuth()

  const { resetToken } = param

  const {
    register,
    handleSubmit,
    watch,
    reset: resetForm,
    formState: { errors },
  } = useForm({
    defaultValues: {
      admin: false,
      user: false,
    },
  })

  const { isLoading, isError, error, isSuccess, mutateAsync } =
    postResetPassword

  useEffect(() => {
    if (isSuccess) {
      resetForm()
      navigate('/auth/login')
    }
  }, [isSuccess])

  useEffect(() => {
    auth?.userInfo && navigate('/')
  }, [navigate])

  const submitHandler = (data) => {
    const password = data.password
    mutateAsync({ password, resetToken })
  }

  return (
    <FormContainer>
      <Helmet>
        <title>Reset</title>
        <meta property='og:title' content='Reset' key='title' />
      </Helmet>
      <h3 className=''>Reset Password</h3>
      {isSuccess && (
        <Message variant='success'>Password Updated Successfully</Message>
      )}

      {isError && <Message variant='danger'>{error}</Message>}

      <form onSubmit={handleSubmit(submitHandler)}>
        {inputPassword({
          register,
          errors,
          label: 'Password',
          name: 'password',
          minLength: true,
          isRequired: true,
          placeholder: 'Password',
        })}

        {inputPassword({
          register,
          errors,
          watch,
          name: 'confirmPassword',
          label: 'Confirm Password',
          validate: true,
          minLength: true,
          placeholder: 'Confirm Password',
        })}

        <button
          type='submit'
          className='btn btn-primary form-control'
          disabled={isLoading}
        >
          {isLoading ? (
            <span className='spinner-border spinner-border-sm' />
          ) : (
            'Change'
          )}
        </button>
      </form>
    </FormContainer>
  )
}

export default ResetPassword
