import React from 'react';
import _ from 'lodash';
import PropTypes from 'prop-types';
import {

  Pagination,
  PaginationItem,
  PaginationLink,

} from "reactstrap";



const Paginations = props => {
  const { itemsCount, pageSize, currentPage, onPageChange } = props;

  const pageCount = Math.ceil(itemsCount / pageSize);
  if (pageCount === 1) return null;
  const pages = _.range(1, pageCount + 1);
  return (
    <nav aria-label="...">
      <Pagination style={{ marginLeft: '900px' }}
        className=" justify-content-end"
        listClassName="justify-content-end mb-2">
        <PaginationItem >
          <PaginationLink>
            {pages.map(page => (<li className={page === currentPage ? "page-item active" : "page-item "}>
              <a className="page-link" onClick={() => onPageChange(page)}>{page}</a></li>))}
          </PaginationLink>
        </PaginationItem>
      </Pagination>
    </nav>
  )
}


Pagination.propTypes = {
  itemsCount: PropTypes.number.isRequired,
  pageSize: PropTypes.number.isRequired,
  currentPage: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

export default Paginations;