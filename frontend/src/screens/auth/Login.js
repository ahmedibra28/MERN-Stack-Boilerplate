import { useEffect } from 'react'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import { FormContainer, Message } from '../../components'
import { useForm } from 'react-hook-form'
import useAuthHook from '../../api/auth'
import useUserRolesHook from '../../api/userRoles'
import { inputEmail, inputPassword } from '../../utils/dynamicForm'
import useAuth from '../../hooks/useAuth'
import { Helmet } from 'react-helmet'

const Login = () => {
  let [searchParams] = useSearchParams()
  const pathName = searchParams.get('next') || '/'
  const navigate = useNavigate()

  const { auth } = useAuth()
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm()

  const { setAuth } = useAuth()

  const { postLogin } = useAuthHook()
  const { postUserRoleById } = useUserRolesHook({
    page: 1,
    q: '',
    limit: 10000000,
  })

  const { isLoading, isError, error, mutateAsync, isSuccess, data } = postLogin
  const {
    mutateAsync: userRoleMutateAsync,
    data: userRole,
    error: errorUserRole,
    isError: isErrorUserRole,
  } = postUserRoleById

  useEffect(() => {
    if (isSuccess) {
      userRoleMutateAsync(data._id)
      if (userRole) {
        localStorage.setItem('userRole', JSON.stringify(userRole))
        localStorage.setItem('userInfo', JSON.stringify(data))

        setAuth({
          userInfo: data,
          userRole: userRole,
        })
        navigate(pathName)
      }
    }
  }, [isSuccess, userRole])

  useEffect(() => {
    auth?.userInfo && navigate('/')
  }, [navigate])

  const submitHandler = async (data) => {
    mutateAsync(data)
  }

  return (
    <>
      <FormContainer>
        <Helmet>
          <title>Login</title>
          <meta property='og:title' content='Login' key='title' />
        </Helmet>
        <h3 className='fw-light font-monospace text-center'>Sign In</h3>
        {isError && <Message variant='danger'>{error}</Message>}
        {isErrorUserRole && <Message variant='danger'>{errorUserRole}</Message>}

        <form onSubmit={handleSubmit(submitHandler)}>
          {inputEmail({
            register,
            errors,
            label: 'Email',
            name: 'email',
            placeholder: 'Email',
          })}
          {inputPassword({
            register,
            errors,
            label: 'Password',
            name: 'password',
            placeholder: 'Password',
          })}
          <button
            type='submit'
            className='btn btn-primary form-control '
            disabled={isLoading}
          >
            {isLoading ? (
              <span className='spinner-border spinner-border-sm' />
            ) : (
              'Sign In'
            )}
          </button>
        </form>
        <div className='row pt-3'>
          <div className='col'>
            <Link to='/auth/forgot-password' className='ps-1'>
              Forgot Password?
            </Link>
          </div>
        </div>
      </FormContainer>
    </>
  )
}

export default Login
