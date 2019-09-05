import React, { Component } from "react";
import _ from "lodash";
import { PropTypes } from "prop-types";

class Pagination extends Component {
  render() {
    const { itemsCount, pageSize, currentPage, onPageChange } = this.props;
    const pages = _.range(1, _.ceil(itemsCount / pageSize) + 1);
    if (pages.length === 1) {
      return null;
    }
    return (
      <ul className="pagination">
        {pages.map(pageNumber => {
          let classes = "page-item";
          classes += pageNumber === currentPage ? " active" : "";
          return (
            <li key={pageNumber} className={classes}>
              <span
                className="page-link"
                onClick={() => onPageChange(pageNumber)}
              >
                {pageNumber}
              </span>
            </li>
          );
        })}
      </ul>
    );
  }
}

Pagination.propType = {
  itemsCount: PropTypes.number.isRequired,
  onPageChange: PropTypes.func.isRequired
};

Pagination.defaultProps = {
  pageSize: 2,
  currentPage: 1
};

export default Pagination;
