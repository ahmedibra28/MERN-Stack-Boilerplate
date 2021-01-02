import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import Message from '../components/Message'
import Loader from '../components/Loader'
import { getLogHistory } from '../actions/userActions'
import ReactPaginate from 'react-paginate'
import Moment from 'react-moment'
import moment from 'moment'

const UserLogHistoryScreen = () => {
  const dispatch = useDispatch()

  const userLogHistory = useSelector((state) => state.userLogHistory)
  const { loading, error, logHistory } = userLogHistory

  useEffect(() => {
    dispatch(getLogHistory())
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
      <h1>Users Login History</h1>

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
                      <td>{log.user.name}</td>
                      <td>
                        <a href={`mailto:${log.user.email}`}>
                          {log.user.email}
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
          {logHistory && logHistory.length > itemsPerPage && (
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
          )}
        </>
      )}
    </>
  )
}

export default UserLogHistoryScreen
