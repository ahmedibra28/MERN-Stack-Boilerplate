import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import useUserProfilesHook from '../../../api/profiles'
import {
  Spinner,
  ViewUserProfiles,
  Pagination,
  Message,
} from '../../../components'

const UserProfiles = () => {
  const [page, setPage] = useState(1)
  const [q, setQ] = useState('')

  const { getUserProfiles } = useUserProfilesHook({
    page,
    q,
  })

  const { data, isLoading, isError, error, refetch } = getUserProfiles

  useEffect(() => {
    refetch()
  }, [page])

  useEffect(() => {
    if (!q) refetch()
  }, [q])

  const searchHandler = (e) => {
    e.preventDefault()
    refetch()
    setPage(1)
  }

  return (
    <>
      <Helmet>
        <title>User Profiles</title>
        <meta property='og:title' content='User Profiles' key='title' />
      </Helmet>

      <div className='ms-auto text-end'>
        <Pagination data={data} setPage={setPage} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ViewUserProfiles
          data={data}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
        />
      )}
    </>
  )
}

export default UserProfiles
