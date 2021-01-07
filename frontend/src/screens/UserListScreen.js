import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  listUsers,
  deleteUser,
  updateUser,
  register,
} from '../actions/userActions'
import ReactPaginate from 'react-paginate'

import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'

const UserListScreen = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [isAdmin, setIsAdmin] = useState(false)
  const [message, setMessage] = useState('')
  const [edit, setEdit] = useState(false)

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { loading, error, users } = userList

  const userDelete = useSelector((state) => state.userDelete)
  const { success: successDelete, error: errorDelete } = userDelete

  const userRegister = useSelector((state) => state.userRegister)
  const {
    loading: loadingCreateRegister,
    error: errorCreateRegister,
    success: successCreateRegister,
  } = userRegister

  const userUpdate = useSelector((state) => state.userUpdate)
  const {
    loading: loadingUpdate,
    error: errorUpdate,
    success: successUpdate,
  } = userUpdate

  const formCleanHandler = () => {
    setName('')
    setEmail('')
    setPassword('')
    setConfirmPassword('')
    setEdit(false)
  }

  useEffect(() => {
    dispatch(listUsers())
    if (successUpdate || successCreateRegister) {
      formCleanHandler()
    }
  }, [dispatch, successDelete, successUpdate, successCreateRegister])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteUser(id))))
  }

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      edit
        ? dispatch(updateUser({ _id: id, name, email, password, isAdmin }))
        : dispatch(register(name, email, password))
    }
  }

  const editHandler = (user) => {
    setName(user.name)
    setEmail(user.email)
    setIsAdmin(user.isAdmin)
    setPassword('')
    setId(user._id)
    setEdit(true)
  }

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 5
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = users && users.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = users && Math.ceil(users.length / itemsPerPage)

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
                onClick={formCleanHandler}
              ></button>
            </div>
            <div className='modal-body'>
              {message && <Message variant='danger'>{message}</Message>}
              {successUpdate && (
                <Message variant='success'>
                  User has been updated successfully.
                </Message>
              )}
              {errorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
              {loadingUpdate && <Loader />}
              {successCreateRegister && (
                <Message variant='success'>
                  User has been Created successfully.
                </Message>
              )}
              {errorCreateRegister && (
                <Message variant='danger'>{errorCreateRegister}</Message>
              )}
              {loadingCreateRegister && <Loader />}

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
                      onClick={formCleanHandler}
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

      <div className='d-flex justify-content-between'>
        <h1>Users</h1>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#editUserModal'
        >
          {' '}
          <i className='fas fa-plus'></i> REGISTER NEW USER
        </button>
      </div>

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
                {currentItems.map((user) => (
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
                    <td className='btn-group'>
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
          <div className='d-flex justify-content-center'>
            <ReactPaginate
              previousLabel='previous'
              previousClassName='page-item'
              previousLinkClassName='page-link'
              nextLabel='next'
              nextClassName='page-item'
              nextLinkClassName='page-link'
              pageClassName='page-item'
              pageLinkClassName='page-link'
              activeClassName='page-item active'
              activeLinkClassName={'page-link'}
              breakLabel={'...'}
              breakClassName={'page-item'}
              breakLinkClassName={'page-link'}
              pageCount={totalItems && totalItems}
              marginPagesDisplayed={2}
              pageRangeDisplayed={2}
              onPageChange={(e) => setCurrentPage(e.selected + 1)}
              containerClassName={'page pagination'}
            />
          </div>
        </>
      )}
    </>
  )
}

export default UserListScreen
