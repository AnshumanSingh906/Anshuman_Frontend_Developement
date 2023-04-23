## Explain what the simple List component does?

This is a React functional component that renders a list of items passed in as a prop items. It uses the useState hook to keep track of the selected index of the list item.

The useEffect hook is used to reset the selected index to null whenever the items prop changes. This is important to ensure that the selected index remains valid and consistent with the new set of items.

The return statement contains an unordered list (ul) with a listStyleType of none. It maps over the items array to create a SingleListItem component for each item, passing in the text, onClickHandler, isSelected props, and a unique key prop for React to identify each component.

The onClickHandler function is called when a SingleListItem is clicked, and it sets the selected index to the index of the clicked item.

The propTypes and defaultProps objects are used to define the expected types of the items prop and to provide a default value of null if no items are passed in.

Finally, the List component is wrapped with the memo function to optimize rendering performance by memoizing the component and only re-rendering it if its props have changed.

## What problems/warnings are there with code?

## Error 1: 
```py
`export default SingleListItem;` is missing for `SingleListItem` component 
```
## Error 2: 
```py
//INCORRECT
WrappedListComponent.propTypes = {
  items: PropTypes.array(
    PropTypes.shapeof({
      text: PropTypes.string.isRequired,
    })
  ),
};
```
**PropTypes.array should be changed to PropTypes.arrayOf**

**PropTypes.shapeOf should be changed to PropTypes.shape**
 ```py
 //CORRECT
 WrappedListComponent.propTypes = {
  items: PropTypes.arrayOf(
    PropTypes.shape({
      text: PropTypes.string.isRequired,
    })
  ),
};
```
## Error 3:
```py
// INCORRECT
const [setSelectedIndex, selectedIndex] = useState();
```
```py
useState is used incorrectly  FIRST PARAMETER IS STATE TO STORE VALUE , AND SECOND PARAMETER IS FUNCTION TO CHANGE STATE VALUE
```
```py
//CORRECT
const [selectedIndex, setSelectedIndex] = useState(null);
```

## ERROR 4
```py
//INCORRECT
<li
      style={{ backgroundColor: isSelected ? 'green' : 'red'}}
      onClick={onClickHandler(index)}
    >
```
 the onClick prop of the li element is being called immediately when the component is rendered, rather than being passed a function reference that will be called when the element is clicked.

To fix this, pass a function reference as the onClick prop, like this:
```py
//CORRECT
<li
      style={{backgroundColor: isSelected ? "green" : "red" }}
      onClick={()=>{onClickHandler(index)}}
    >
```
## ERROR 5
```py
//INCORRECT
<SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
        />
```
The issue with this code is that the isSelected prop of the SingleListItem component is set to a constant variable index,

Instead, it should be set isSelected to a boolean value 
```py
//CORRECT
<SingleListItem
          onClickHandler={() => setSelectedIndex(index)}
          text={item.text}
          key={index}
          isSelected={selectedIndex === index}
        />
```

## ERROR 5
```py
AS WE ARE APPLYING MAP ON THE ITEMS ARRAY IT SHOULD NOT BE NULL.
```

## ERROR 6
```py
//INCORRECT
<SingleListItem
          onClickHandler={() => handleClick(index)}
          text={item.text}
          index={index}
          isSelected={selectedIndex}
        />
```
As we are using map each items shoul have unique prop 
```py
//CORRECT
<SingleListItem
          onClickHandler={() => setSelectedIndex(index)}
          text={item.text}
          key={index}
          isSelected={selectedIndex === index}
        />
 ```
# (Q.3) Please fix, optimize, and/or modify the component as much as you think is necessary.

List.jsx
```python

//SingleListItem.jsx
// Single List Item
import React, { memo } from "react";
import './li.css'
import PropTypes from "prop-types";
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





//List.jsx

import React, { memo, useState, useEffect } from "react";
import PropTypes from "prop-types";
import SingleListItem from "./SingleListItem";
import "./li.css";

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

```


