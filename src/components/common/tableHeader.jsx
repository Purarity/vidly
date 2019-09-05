import React, { Component } from "react";

class TableHeader extends Component {
  sortIconClassNames = (sortColumn, currentColumn) => {
    let sortClassName = "fas fa-caret-";
    if (sortColumn.column === currentColumn.path) {
      sortClassName += sortColumn.order === "asc" ? "down" : "up";
    }
    return sortClassName;
  };

  raiseSort = column => {
    const { sortColumn, onSort } = this.props;
    if (sortColumn.column === column) {
      sortColumn.order = sortColumn.order === "asc" ? "desc" : "asc";
    } else {
      sortColumn.column = column;
      sortColumn.order = "asc";
    }
    onSort(sortColumn);
  };

  render() {
    const { allColumns, sortColumn } = this.props;
    return (
      <thead>
        <tr>
          {allColumns.map(column => {
            return column.path ? (
              <th key={column.path} onClick={() => this.raiseSort(column.path)}>
                {column.label}
                <i className={this.sortIconClassNames(sortColumn, column)} />
              </th>
            ) : (
              <th key={column.key} />
            );
          })}
        </tr>
      </thead>
    );
  }
}

export default TableHeader;
