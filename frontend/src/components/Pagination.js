import { Link } from 'react-router-dom'

const Pagination = ({ pages, page }) => {
  return (
    pages > 1 && (
      <nav aria-label='Page navigation example'>
        <ul className='pagination'>
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
        </ul>
      </nav>
    )
  )
}
export default Pagination
