import React from "react";
import TableHeader from "./tableHeader";
import TableBody from "./tableBody";

const Table = ({ allColumns, sortColumn, onSort, items }) => {
  return (
    <table className="table">
      <TableHeader
        allColumns={allColumns}
        sortColumn={sortColumn}
        onSort={onSort}
      />
      <TableBody items={items} allColumns={allColumns} />
    </table>
  );
};

export default Table;
