import React from "react";

const Like = ({ liked, onClick }) => {
  let classes = "fa-heart fa";
  classes += liked ? "s" : "r";
  return <i className={classes} onClick={onClick} />;
};

export default Like;
