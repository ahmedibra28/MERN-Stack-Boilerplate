import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import {
  FaCheckCircle,
  FaEdit,
  FaPlus,
  FaTimesCircle,
  FaTrash,
} from 'react-icons/fa'

import {
  resetDeleteUser,
  resetListUsers,
  resetUpdateUser,
} from '../redux/users/usersSlice'
import {
  deleteUser,
  listUsers,
  updateUser,
  registerUser,
} from '../redux/users/usersThunk'

import { UnlockAccess } from '../components/UnlockAccess'

import { confirmAlert } from 'react-confirm-alert'
import { Confirm } from '../components/Confirm'
import Pagination from '../components/Pagination'

const UserListScreen = () => {
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [adminRole, setAdminRole] = useState(false)
  const [userRole, setUserRole] = useState(false)
  const [message, setMessage] = useState('')
  const [edit, setEdit] = useState(false)

  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)

  const dispatch = useDispatch()

  const userList = useSelector((state) => state.userList)
  const { users, loadingListUsers, errorListUsers, total, pages } = userList

  const userUpdate = useSelector((state) => state.userUpdate)
  const { loadingUpdateUser, errorUpdateUser, successUpdateUser } = userUpdate

  const userDelete = useSelector((state) => state.userDelete)
  const { successDeleteUser, errorDeleteUser } = userDelete

  const userRegister = useSelector((state) => state.userRegister)
  const {
    loadingRegisterUser,
    errorRegisterUser,
    successRegisterUser,
  } = userRegister

  const formCleanHandler = () => {
    setName('')
    setEmail('')
    setPassword('')
    setAdminRole(false)
    setUserRole(false)
    setConfirmPassword('')
    setEdit(false)
  }

  useEffect(() => {
    if (
      errorDeleteUser ||
      errorRegisterUser ||
      errorListUsers ||
      errorUpdateUser ||
      successDeleteUser ||
      successRegisterUser ||
      successUpdateUser
    ) {
      setTimeout(() => {
        dispatch(resetDeleteUser())
        dispatch(resetListUsers())
        dispatch(resetUpdateUser())
      }, 5000)
    }
  }, [
    errorDeleteUser,
    errorRegisterUser,
    errorListUsers,
    errorUpdateUser,
    successDeleteUser,
    successRegisterUser,
    successUpdateUser,
    dispatch,
  ])

  useEffect(() => {
    dispatch(listUsers({ page, limit }))
    if (successUpdateUser || successRegisterUser) {
      formCleanHandler()
    }
  }, [
    dispatch,
    successDeleteUser,
    successUpdateUser,
    successRegisterUser,
    page,
    limit,
  ])

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => dispatch(deleteUser(id))))
  }

  const roles = { admin: adminRole, user: userRole }

  const submitHandler = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      setMessage('Password do not match')
    } else {
      edit
        ? dispatch(updateUser({ _id: id, name, email, password, roles }))
        : dispatch(registerUser({ name, email, password, roles }))
    }
  }

  const editHandler = (user) => {
    setName(user.name)
    setEmail(user.email)
    setPassword('')
    setId(user._id)
    setEdit(true)

    user &&
      user.roles.map(
        (role) =>
          (role === 'Admin' && setAdminRole(true)) ||
          (role === 'User' && setUserRole(true))
      )
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
              <h3 className='modal-title ' id='editUserModalLabel'>
                {edit ? 'Edit User' : 'Add User'}
              </h3>
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
              {successUpdateUser && (
                <Message variant='success'>
                  User has been updated successfully.
                </Message>
              )}
              {errorUpdateUser && (
                <Message variant='danger'>{errorUpdateUser}</Message>
              )}
              {successRegisterUser && (
                <Message variant='success'>
                  User has been Created successfully.
                </Message>
              )}
              {errorRegisterUser && (
                <Message variant='danger'>{errorRegisterUser}</Message>
              )}

              {loadingListUsers ? (
                <Loader />
              ) : errorListUsers ? (
                <Message variant='danger'>{errorListUsers}</Message>
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

                  <div className='row'>
                    <div className='col'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value='Admin'
                          id='admin'
                          name='admin'
                          checked={adminRole}
                          onChange={(e) => setAdminRole(e.target.checked)}
                        />
                        <label className='form-check-label' htmlFor='admin'>
                          Admin
                        </label>
                      </div>
                    </div>
                    <div className='col'>
                      <div className='form-check'>
                        <input
                          className='form-check-input'
                          type='checkbox'
                          value='User'
                          id='user'
                          name='user'
                          checked={userRole}
                          onChange={(e) => setUserRole(e.target.checked)}
                        />
                        <label className='form-check-label' htmlFor='user'>
                          User
                        </label>
                      </div>
                    </div>
                  </div>

                  <div className='modal-footer'>
                    <button
                      type='button'
                      className='btn btn-secondary btn-sm'
                      data-bs-dismiss='modal'
                      onClick={formCleanHandler}
                    >
                      Close
                    </button>
                    <button
                      type='submit'
                      className='btn btn-light btn-sm'
                      disabled={
                        loadingRegisterUser || (loadingUpdateUser && true)
                      }
                    >
                      {loadingRegisterUser || loadingUpdateUser ? (
                        <span className='spinner-border spinner-border-sm' />
                      ) : (
                        'Submit'
                      )}
                    </button>
                  </div>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>

      <div className='d-flex justify-content-between align-items-center'>
        <h3 className=''>Users</h3>
        <button
          className='btn btn-light btn-sm'
          data-bs-toggle='modal'
          data-bs-target='#editUserModal'
        >
          <FaPlus /> REGISTER NEW USER
        </button>
      </div>

      {successDeleteUser && (
        <Message variant='success'>User has been deleted successfully.</Message>
      )}
      {errorDeleteUser && <Message variant='danger'>{errorDeleteUser}</Message>}
      {loadingListUsers ? (
        <Loader />
      ) : errorListUsers ? (
        <Message variant='danger'>{errorListUsers}</Message>
      ) : (
        <>
          <div className='d-flex justify-content-center mt-2'>
            <Pagination
              setPage={setPage}
              page={page}
              pages={pages}
              limit={limit}
              setLimit={setLimit}
              total={total}
            />
          </div>
          <div className='table-responsive '>
            <table className='table table-sm hover bordered striped caption-top '>
              <caption>{total} records were found</caption>
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
                {users &&
                  users.map((user) => (
                    <tr key={user._id}>
                      <td>{user._id}</td>
                      <td>{user.name}</td>
                      <td>
                        <a href={`mailto:${user.email}`}>{user.email}</a>
                      </td>
                      <td>
                        {UnlockAccess(user && user.roles) ? (
                          <FaCheckCircle className='text-success' />
                        ) : (
                          <FaTimesCircle className='text-danger' />
                        )}
                      </td>
                      <td className='btn-group'>
                        <button
                          className='btn btn-light btn-sm'
                          onClick={() => editHandler(user)}
                          data-bs-toggle='modal'
                          data-bs-target='#editUserModal'
                        >
                          <FaEdit /> Edit
                        </button>

                        <button
                          className='btn btn-danger btn-sm'
                          onClick={() => deleteHandler(user._id)}
                        >
                          <FaTrash /> Delete
                        </button>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>
          <div className='d-flex justify-content-center'>
            <Pagination
              setPage={setPage}
              page={page}
              pages={pages}
              limit={limit}
              setLimit={setLimit}
              total={total}
            />
          </div>
        </>
      )}
    </>
  )
}

export default UserListScreen
