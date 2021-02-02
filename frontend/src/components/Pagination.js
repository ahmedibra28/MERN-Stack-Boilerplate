import React from 'react'
import ReactPaginate from 'react-paginate'

const Pagination = ({
  totalItems,
  setCurrentPage,
  itemsPerPage,
  arrayLength,
}) => {
  return (
    <>
      {arrayLength > itemsPerPage && (
        <ReactPaginate
          previousLabel='P'
          previousClassName='page-item'
          previousLinkClassName='page-link'
          nextLabel='N'
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
      )}
    </>
  )
}

export default Pagination
