import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { listUsers, deleteUser, updateUser } from '../actions/userActions'
import Pagination from '../components/Pagination'

const UserListScreen = ({ match }) => {
  const pageNumber = match.params.pageNumber || 1

  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [message, setMessage] = useState('')

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users, page, pages, lastPage } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete, error: errorDelete } = userDelete

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  useEffect(() => {
    dispatch(listUsers(pageNumber))
    if (successUpdate) {
      setName('')
      setEmail('')
      setPassword('')
      setConfirmPassword('')
    }
  }, [dispatch, successDelete, successUpdate, pageNumber])

  const deleteHandler = (id) => {
    if (window.confirm('Are you use?')) {
      dispatch(deleteUser(id))
    }
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      dispatch(updateUser({ _id: id, name, email, password, isAdmin }))
    }
  }

  const editHandler = (user) => {
    setName(user.name)
    setEmail(user.email)
    setIsAdmin(user.isAdmin)
    setPassword('')
    setId(user._id)
  }

  return (
    <>
      <div
        className='modal fade'
        id='editUserModal'
        data-bs-backdrop='static'
        data-bs-keyboard='false'
        tabIndex='-1'
        aria-labelledby='editUserModalLabel'
        aria-hidden='true'
      >
        <div className='modal-dialog'>
          <div className='modal-content modal-background'>
            <div className='modal-header'>
              <h5 className='modal-title' id='editUserModalLabel'>
                Edit User
              </h5>
              <button
                type='button'
                className='btn-close'
                data-bs-dismiss='modal'
                aria-label='Close'
              ></button>
            </div>
            <div className='modal-body'>
              {message && <Message variant='danger'>{message}</Message>}
              {successUpdate && (
                <Message variant='success'>
                  User has been updated successfully.
                </Message>
              )}
              {loadingUpdate && <Loader />}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              {loading ? (
                <Loader />
              ) : error ? (
                <Message variant='danger'>{error}</Message>
              ) : (
                <form onSubmit={submitHandler}>
                  <div className='form-group'>
                    <label htmlFor='name'>Name</label>
                    <input
                      type='text'
                      placeholder='Enter name'
                      className='form-control'
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='email'>Email Address</label>
                    <input
                      type='email'
                      placeholder='Enter email'
                      className='form-control'
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='password'>Password</label>
                    <input
                      type='password'
                      placeholder='Enter password'
                      className='form-control'
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                    />
                  </div>
                  <div className='form-group'>
                    <label htmlFor='confirmPassword'>Confirm Password</label>
                    <input
                      type='password'
                      placeholder='Confirm password'
                      className='form-control'
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>

                  <div className='form-group'>
                    <input
                      type='checkbox'
                      id='isAdmin'
                      label='Is Admin'
                      checked={isAdmin}
                      onChange={(e) => setIsAdmin(e.target.checked)}
                    />{' '}
                    <label htmlFor='isAdmin' id='isAdmin'>
                      Admin?
                    </label>
                  </div>

                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary'
                      data-bs-dismiss='modal'
                    >
                      Close
                    </button>
                    <button type='submit' className='btn btn-primary'>
                      Update
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <h1>Users</h1>
      {successDelete && (
        <Message variant='success'>User has been deleted successfully.</Message>
      )}
      {errorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='table-responsive'>
            <table className='table table-sm hover bordered striped'>
              <thead>
                <tr>
                  <th>ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>ADMIN</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {users.map((user) => (
                  <tr key={user._id}>
                    <td>{user._id}</td>
                    <td>{user.name}</td>
                    <td>
                      <a href={`mailto:${user.email}`}>{user.email}</a>
                    </td>
                    <td>
                      {user.isAdmin ? (
                        <i
                          className='fas fa-check'
                          style={{ color: 'green' }}
                        ></i>
                      ) : (
                        <i
                          className='fas fa-times'
                          style={{ color: 'red' }}
                        ></i>
                      )}
                    </td>
                    <td>
                      <button
                        className='btn btn-light btn-sm'
                        onClick={(e) => editHandler(user)}
                        data-bs-toggle='modal'
                        data-bs-target='#editUserModal'
                      >
                        <i className='fas fa-edit'></i>
                      </button>

                      <button
                        className='btn btn-danger btn-sm'
                        onClick={() => deleteHandler(user._id)}
                      >
                        <i className='fas fa-trash'></i>
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
          <Pagination pages={pages} page={page} lastPage={lastPage} />
        </>
      )}
    </>
  )
}

export default UserListScreen
