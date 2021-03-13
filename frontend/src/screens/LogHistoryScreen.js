import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getUserLogHistory } from '../redux/users/logHistorySlice'
import ReactPaginate from 'react-paginate'
import Moment from 'react-moment'
import moment from 'moment'
import Pagination from '../components/Pagination'

const UserLogHistoryScreen = () => {
  const dispatch = useDispatch()

  const userLogHistory = useSelector((state) => state.userLogHistory)
  const { loading, error, logHistory } = userLogHistory

  useEffect(() => {
    dispatch(getUserLogHistory())
  }, [dispatch])

  const [currentPage, setCurrentPage] = useState(1)

  const itemsPerPage = 10
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems =
    logHistory && logHistory.slice(indexOfFirstItem, indexOfLastItem)
  const totalItems = logHistory && Math.ceil(logHistory.length / itemsPerPage)

  return (
    <>
      <h3>Users Log</h3>
      <input
        type='text'
        className='form-control text-info '
        placeholder='Search by Email or Name'
        autoFocus
      />

      {loading ? (
        <Loader />
      ) : error ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='table-responsive'>
            <table className='table table-sm hover bordered striped caption-top text-light'>
              <caption>
                {logHistory && logHistory.length} records were found
              </caption>
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
                {currentItems &&
                  currentItems.map((log) => (
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
                        <Moment format='HH:mm:ss'>{moment(log.logDate)}</Moment>
                      </td>
                    </tr>
                  ))}
              </tbody>
            </table>
          </div>

          <div className='d-flex justify-content-center'>
            <Pagination
              setCurrentPage={setCurrentPage}
              totalItems={totalItems}
              arrayLength={logHistory && logHistory.length}
              itemsPerPage={itemsPerPage}
            />
          </div>
        </>
      )}
    </>
  )
}

export default UserLogHistoryScreen
