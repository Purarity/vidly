import _ from "lodash";

function paginate(items, currentPage, pageSize) {
  const indexOfStartItem = (currentPage - 1) * pageSize;
  return _(items)
    .slice(indexOfStartItem, indexOfStartItem + pageSize)
    .value();
}

export default paginate;
