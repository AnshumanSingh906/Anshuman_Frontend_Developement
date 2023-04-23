import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SingleListItem from "./SingleListItem";
import './li.css'

const WrappedListComponent = ({ items }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  useEffect(() => {
    setSelectedIndex(null);
  }, [items]);

  return (
    <ul style={{ listStyleType: "none" }}>
        {items.map((item, index) => (
          <SingleListItem
            onClickHandler={() => setSelectedIndex(index)}
            text={item.text}
            key={index}
            isSelected={selectedIndex === index}
          />
        ))}
    </ul>
  );
};

WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};

WrappedListComponent.defaultProps = {
  items: null,
};

const List = memo(WrappedListComponent);

export default List;
