import React, { useEffect } from "react";
import "./App.css";
import List from "./List";
import { useState } from "react";


const dummyItem = [
  {
    "text": "Anshuman Singh",
    "city": "Raipur"
  },
  {
    "text": "Don Quixote",
    "city": "Madrid"
  },
  {
    "text": "Joan of Arc",
    "city": "Paris"
  },
  {
    "text": "Rosa Park",
    "city": "Alabama"
  }
];

function App() {

  const [items,setItems] =useState([]);
  useEffect(() => {
  setItems(dummyItem);
  }, []);

  return (
    <div className="App">
        <List items={items}/>
    </div>
  );
}

export default App;
