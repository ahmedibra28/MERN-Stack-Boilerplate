import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserLogHistory } from '../redux/users/usersThunk'
import Moment from 'react-moment'
import moment from 'moment'
import Pagination from '../components/Pagination'

const UserLogHistoryScreen = () => {
  const [page, setPage] = useState(1)
  const [limit, setLimit] = useState(30)
  const [search, setSearch] = useState('')

  const dispatch = useDispatch()

  const userLogHistory = useSelector((state) => state.userLogHistory)
  const {
    loadingLogHistory,
    errorLogHistory,
    logHistory,
    total,
    pages,
  } = userLogHistory

  useEffect(() => {
    search.trim()
      ? dispatch(getUserLogHistory({ page, limit: total }))
      : dispatch(getUserLogHistory({ page, limit }))
  }, [dispatch, page, limit, search, total])

  return (
    <>
      <h3 className=''>Users Log</h3>

      <input
        type='text'
        className='form-control text-info '
        placeholder='Search by Email or Name'
        name='search'
        value={search}
        onChange={(e) => setSearch(e.target.value.toLowerCase())}
        autoFocus
        required
      />

      {loadingLogHistory ? (
        <Loader />
      ) : errorLogHistory ? (
        <Message variant='danger'>{errorLogHistory}</Message>
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
          <div className='table-responsive'>
            <table className='table table-sm hover bordered striped caption-top '>
              <caption>{total} records were found</caption>
              <thead>
                <tr>
                  <th>LOG ID</th>
                  <th>NAME</th>
                  <th>EMAIL</th>
                  <th>LOGIN DATE</th>
                  <th>LOGIN TIME</th>
                </tr>
              </thead>
              <tbody>
                {logHistory &&
                  logHistory.map(
                    (log) =>
                      log.user &&
                      log.user.email.includes(search.trim()) && (
                        <tr key={log._id}>
                          <td>{log._id}</td>
                          <td>{log.user && log.user.name}</td>
                          <td>
                            <a href={`mailto:${log.user && log.user.email}`}>
                              {log.user && log.user.email}
                            </a>
                          </td>
                          <td>
                            <Moment format='YYYY-MM-DD'>
                              {moment(log.logDate)}
                            </Moment>
                          </td>
                          <td>
                            <Moment format='HH:mm:ss'>
                              {moment(log.logDate)}
                            </Moment>
                          </td>
                        </tr>
                      )
                  )}
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

export default UserLogHistoryScreen
