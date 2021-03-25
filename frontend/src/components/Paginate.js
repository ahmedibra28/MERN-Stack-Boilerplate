import React from 'react'

const Paginate = ({ setPage, page, pages }) => {
  let middlePagination

  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, idx) => (
      <li
        key={idx + 1}
        onClick={() => setPage(idx + 1)}
        className={`page-item ${page === idx + 1 && 'disabled'} `}
      >
        <span className='page-link'>{idx + 1}</span>
      </li>
    ))
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5

    middlePagination = (
      <>
        {[...Array(5)].map((_, idx) => (
          <li
            key={startValue + idx + 1}
            onClick={() => setPage(startValue + idx + 1)}
            className={`page-item ${
              page === startValue + idx + 1 && 'disabled'
            } `}
          >
            <span className='page-link'> {startValue + idx + 1}</span>
          </li>
        ))}

        <li className='page-item'>
          <span className='page-link'>...</span>
        </li>

        <li className='page-item' onClick={() => setPage(pages)}>
          <span className='page-link'>{pages}</span>
        </li>
      </>
    )

    if (page > 5) {
      if (pages - page >= 5) {
        middlePagination = (
          <>
            <li className='page-item' onClick={() => setPage(1)}>
              <span className='page-link'>1</span>
            </li>

            <li className='page-item'>
              <span className='page-link'>...</span>
            </li>

            <li className='page-item' onClick={() => setPage(startValue)}>
              <span className='page-link'>{startValue}</span>
            </li>

            {[...Array(5)].map((_, idx) => (
              <li
                className={`page-item ${
                  page === startValue + idx + 1 && 'disabled'
                } `}
                key={startValue + idx + 1}
                onClick={() => setPage(startValue + idx + 1)}
              >
                <span className='page-link'> {startValue + idx + 1}</span>
              </li>
            ))}

            <li className='page-item'>
              <span className='page-link'>...</span>
            </li>
            <li className='page-item' onClick={() => setPage(pages)}>
              <span className='page-link'>{pages}</span>
            </li>
          </>
        )
      } else {
        let amountLeft = pages - page + 5
        middlePagination = (
          <>
            <li className='page-item' onClick={() => setPage(1)}>
              <span className='page-link'>1</span>
            </li>

            <li className='page-item'>
              <span className='page-link'>...</span>
            </li>

            <li className='page-item' onClick={() => setPage(startValue)}>
              <span className='page-link'>{startValue}</span>
            </li>

            {[...Array(amountLeft)].map((_, idx) => (
              <li
                className='page-item'
                key={startValue + idx + 1}
                disabled={page === startValue + idx + 1}
                style={
                  pages < startValue + idx + 1 ? { display: 'none' } : null
                }
                onClick={() => setPage(startValue + idx + 1)}
              >
                <span className='page-link'> {startValue + idx + 1}</span>
              </li>
            ))}
          </>
        )
      }
    }
  }

  return (
    pages > 1 && (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          <li
            className={`page-item ${page === 1 && 'disabled'} `}
            onClick={() => setPage((page) => page - 1)}
          >
            <span className='page-link' aria-label='Previous'>
              <span aria-hidden='true'>&laquo;</span>
            </span>
          </li>
          {middlePagination}

          <li
            className={`page-item ${page === pages && 'disabled'} `}
            onClick={() => setPage((page) => page + 1)}
          >
            <span className='page-link' aria-label='Next'>
              <span aria-hidden='true'>&raquo;</span>
            </span>
          </li>
        </ul>
      </nav>
    )
  )
}

export default Paginate
