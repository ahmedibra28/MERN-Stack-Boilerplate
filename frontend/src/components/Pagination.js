import React from 'react'

const Pagination = ({ setPage, page, pages, limit, setLimit, total }) => {
  const middlePagination = (
    <>
      {page !== 1 && (
        <>
          <li className='page-item'>
            <span onClick={() => setPage(1)} className='page-link'>
              1
            </span>
          </li>

          {page + 1 > 4 && (
            <li className='page-item'>
              <span className='page-link'>...</span>
            </li>
          )}
        </>
      )}

      {page > 2 && (
        <li className='page-item '>
          <span onClick={() => setPage(page - 1)} className='page-link'>
            {page === 1 ? page : page - 1}
          </span>
        </li>
      )}

      <li className='page-item active'>
        <span className='page-link'>{page}</span>
      </li>
      {page !== pages && (
        <li
          onClick={() => setPage(page === pages ? page : page + 1)}
          className='page-item'
        >
          <span className='page-link'>{page === pages ? page : page + 1}</span>
        </li>
      )}

      {page !== pages && page + 1 !== pages && (
        <>
          {page + 2 !== pages && (
            <li className='page-item'>
              <span className='page-link'>...</span>
            </li>
          )}

          <li className='page-item'>
            <span onClick={() => setPage(pages)} className='page-link'>
              {pages}
            </span>
          </li>
        </>
      )}
    </>
  )

  return (
    pages > 1 && (
      <div aria-label='Page navigation example'>
        <ul className='pagination'>
          <li className={`page-item ${page === 1 && 'disabled'}`}>
            <span
              onClick={() => setPage(page - 1)}
              className='page-link'
              aria-label='Previous'
            >
              <span aria-hidden='true'>&laquo;</span>
            </span>
          </li>
          {middlePagination}
          <li className={`page-item ${page === pages && 'disabled'}`}>
            <span
              onClick={() => setPage(page + 1)}
              className='page-link'
              aria-label='Next'
            >
              <span aria-hidden='true'>&raquo;</span>
            </span>
          </li>
          <li className='page-item'>
            <select
              onChange={(e) => setLimit(e.target.value)}
              value={limit}
              name='limit'
              className='page-link outline-none shadow-none'
              style={{ padding: '0.42rem 0px' }}
            >
              {total > 10 && page <= total / 5 && (
                <option value='10'>10</option>
              )}
              {total > 30 && page <= total / 30 && (
                <option value='30'>30</option>
              )}
              {total > 50 && page <= total / 50 && (
                <option value='50'>50</option>
              )}
              {total > 100 && page <= total / 80 && (
                <option value='100'>100</option>
              )}
              {total > 200 && page <= total / 150 && (
                <option value='200'>200</option>
              )}
            </select>
          </li>
        </ul>
      </div>
    )
  )
}

export default Pagination
