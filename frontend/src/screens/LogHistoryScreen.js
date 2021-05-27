import React, { useState } from 'react'
import Message from '../components/Message'
import Moment from 'react-moment'
import moment from 'moment'
import { getUsersLog } from '../api/users'
import { useQuery } from 'react-query'

import Loader from 'react-loader-spinner'

const UserLogHistoryScreen = () => {
  const { data, error, isLoading, isError } = useQuery(
    'users-log',
    async () => await getUsersLog(),
    { retry: 0, refetchInterval: 10000 }
  )

  const [search, setSearch] = useState('')

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

      {isLoading ? (
        <div className='text-center'>
          <Loader
            type='ThreeDots'
            color='#00BFFF'
            height={100}
            width={100}
            timeout={3000} //3 secs
          />
        </div>
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <>
          <div className='table-responsive'>
            <table className='table table-sm hover bordered striped caption-top '>
              <caption>{!isLoading && data.total} records were found</caption>
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
                {!isLoading &&
                  data.data.map(
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
        </>
      )}
    </>
  )
}

export default UserLogHistoryScreen
