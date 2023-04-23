import React, { memo } from "react";
import './li.css'
import PropTypes from "prop-types";
// Single List Item
const WrappedSingleListItem = ({ index, isSelected, onClickHandler, text }) => {
  return (
    
    <li
      style={{backgroundColor: isSelected ? "green" : "red" }}
      onClick={()=>{onClickHandler(index)}}
    >
      {text}
    </li>
  );
};

WrappedSingleListItem.propTypes = {
  index: PropTypes.number,
  isSelected: PropTypes.bool,
  onClickHandler: PropTypes.func.isRequired,
  text: PropTypes.string.isRequired,
};

const SingleListItem = memo(WrappedSingleListItem);

export default SingleListItem;
