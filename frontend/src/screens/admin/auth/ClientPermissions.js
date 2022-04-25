import { useState, useEffect } from 'react'
import { Helmet } from 'react-helmet'
import { confirmAlert } from 'react-confirm-alert'
import { useForm } from 'react-hook-form'
import useClientPermissionsHook from '../../../api/clientPermissions'
import {
  Spinner,
  ViewClientPermissions,
  Pagination,
  FormClientPermissions,
  Message,
  Confirm,
} from '../../../components'

const ClientPermissions = () => {
  const [page, setPage] = useState(1)
  const [id, setId] = useState(null)
  const [edit, setEdit] = useState(false)
  const [q, setQ] = useState('')

  const {
    getClientPermissions,
    postClientPermission,
    updateClientPermission,
    deleteClientPermission,
  } = useClientPermissionsHook({
    page,
    q,
  })

  const {
    register,
    handleSubmit,
    watch,
    setValue,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {},
  })

  const { data, isLoading, isError, error, refetch } = getClientPermissions

  const {
    isLoading: isLoadingUpdate,
    isError: isErrorUpdate,
    error: errorUpdate,
    isSuccess: isSuccessUpdate,
    mutateAsync: mutateAsyncUpdate,
  } = updateClientPermission

  const {
    isLoading: isLoadingDelete,
    isError: isErrorDelete,
    error: errorDelete,
    isSuccess: isSuccessDelete,
    mutateAsync: mutateAsyncDelete,
  } = deleteClientPermission

  const {
    isLoading: isLoadingPost,
    isError: isErrorPost,
    error: errorPost,
    isSuccess: isSuccessPost,
    mutateAsync: mutateAsyncPost,
  } = postClientPermission

  const formCleanHandler = () => {
    setEdit(false)
    reset()
  }

  useEffect(() => {
    if (isSuccessPost || isSuccessUpdate) formCleanHandler()
  }, [isSuccessPost, isSuccessUpdate])

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

  const deleteHandler = (id) => {
    confirmAlert(Confirm(() => mutateAsyncDelete(id)))
  }

  const submitHandler = (data) => {
    edit
      ? mutateAsyncUpdate({
          _id: id,
          name: data.name,
          menu: data.menu,
          path: data.path,
          description: data.description,
        })
      : mutateAsyncPost(data)
  }

  const editHandler = (clientPermission) => {
    setId(clientPermission._id)
    setEdit(true)
    setValue('name', clientPermission.name)
    setValue('menu', clientPermission.menu)
    setValue('path', clientPermission.path)
    setValue('description', clientPermission.description)
  }

  return (
    <>
      <Helmet>
        <title>Client Permissions</title>
        <meta property='og:title' content='Client Permissions' key='title' />
      </Helmet>
      {isSuccessDelete && (
        <Message variant='success'>
          Client Permission has been deleted successfully.
        </Message>
      )}
      {isErrorDelete && <Message variant='danger'>{errorDelete}</Message>}
      {isSuccessUpdate && (
        <Message variant='success'>
          Client Permission has been updated successfully.
        </Message>
      )}
      {isErrorUpdate && <Message variant='danger'>{errorUpdate}</Message>}
      {isSuccessPost && (
        <Message variant='success'>
          Client Permission has been Created successfully.
        </Message>
      )}
      {isErrorPost && <Message variant='danger'>{errorPost}</Message>}

      <FormClientPermissions
        edit={edit}
        formCleanHandler={formCleanHandler}
        isLoading={isLoading}
        isError={isError}
        errors={errors}
        isLoadingUpdate={isLoadingUpdate}
        isLoadingPost={isLoadingPost}
        register={register}
        handleSubmit={handleSubmit}
        submitHandler={submitHandler}
        watch={watch}
        error={error}
      />

      <div className='ms-auto text-end'>
        <Pagination data={data} setPage={setPage} />
      </div>

      {isLoading ? (
        <Spinner />
      ) : isError ? (
        <Message variant='danger'>{error}</Message>
      ) : (
        <ViewClientPermissions
          data={data}
          editHandler={editHandler}
          deleteHandler={deleteHandler}
          isLoadingDelete={isLoadingDelete}
          setQ={setQ}
          q={q}
          searchHandler={searchHandler}
        />
      )}
    </>
  )
}

export default ClientPermissions
