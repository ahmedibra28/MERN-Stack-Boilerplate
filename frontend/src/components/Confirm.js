import 'react-confirm-alert/src/react-confirm-alert.css'

export const Confirm = (action) => {
  return {
    customUI: ({ onClose }) => {
      return (
        <div className='px-5 py-3 shadow-lg text-center'>
          <h1>Are you sure?</h1>
          <p>You want to delete this?</p>
          <div className='btn-group d-flex justify-content-between'>
            <button className='btn btn-outline-dark bg-sm' onClick={onClose}>
              No
            </button>
            <button
              className='btn btn-outline-danger bg-sm ml-1'
              onClick={() => {
                action()
                onClose()
              }}
            >
              <i className='fa fa-trash'></i> Yes, Delete it!
            </button>
          </div>
        </div>
      )
    },
  }
}
