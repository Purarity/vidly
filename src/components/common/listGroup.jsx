import React from "react";
import { PropTypes } from "prop-types";

const ListGroup = ({
  groups,
  textProperty,
  valueProperty,
  onGroupSelect,
  selectedGroup
}) => {
  return (
    <React.Fragment>
      {groups.map(group => {
        let classes = "list-group-item";
        classes +=
          selectedGroup[valueProperty] === group[valueProperty]
            ? " active"
            : "";
        return (
          <li
            key={group[valueProperty] || group[textProperty]}
            className={classes}
            onClick={() => onGroupSelect(group)}
          >
            {group[textProperty]}
          </li>
        );
      })}
    </React.Fragment>
  );
};

ListGroup.propType = {
  groups: PropTypes.arrayOf(PropTypes.object).isRequired,
  onItemSelect: PropTypes.func.isRequired
};

ListGroup.defaultProps = {
  textProperty: "name",
  valueProperty: "_id"
};

export default ListGroup;
