import { Link } from 'react-router-dom'

const Pagination = ({ pages, page, lastPage }) => {
  return (
    pages > 1 && (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
          <li className='page-item'>
            <Link
              to={`/admin/users/page/${1}`}
              className='page-link'
              aria-label='Previous'
            >
              <span aria-hidden='true'>&laquo;</span>
            </Link>
          </li>

          {[...Array(pages).keys()].map((x) => (
            <li
              className={`page-item ${x + 1 === page && 'active'}`}
              key={x + 1}
            >
              <Link className={`page-link  `} to={`/admin/users/page/${x + 1}`}>
                {x + 1}
              </Link>
            </li>
          ))}

          <li className='page-item'>
            <Link
              to={`/admin/users/page/${lastPage}`}
              className='page-link'
              aria-label='Next'
            >
              <span aria-hidden='true'>&raquo;</span>
            </Link>
          </li>
        </ul>
      </nav>
    )
  )
}
export default Pagination
