import React from "react";
import { Link } from "react-router-dom";
import Like from "./common/like";
import Table from "./common/table";

const MoviesTable = ({ items, sortColumn, onLike, onDelete, onSort }) => {
  const allColumns = [
    {
      path: "title",
      label: "Title",
      handleObjectProperty: movie => (
        <Link to={`/movies/${movie._id}`}>{movie.title}</Link>
      )
    },
    { path: "genre.name", label: "Genre" },
    { path: "numberInStock", label: "Stock" },
    { path: "dailyRentalRate", label: "Rate" },
    {
      key: "like",
      handleObjectProperty: item => (
        <Like onClick={() => onLike(item)} liked={item.liked} />
      )
    },

    {
      key: "delete",
      handleObjectProperty: item => (
        <button
          type="button"
          className="btn btn-danger"
          onClick={() => onDelete(item)}
        >
          Delete
        </button>
      )
    }
  ];

  return (
    <Table
      allColumns={allColumns}
      sortColumn={sortColumn}
      onSort={onSort}
      items={items}
    />
  );
};

export default MoviesTable;
