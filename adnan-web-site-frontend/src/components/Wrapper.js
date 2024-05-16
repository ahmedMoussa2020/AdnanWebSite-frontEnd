
import React from "react";
// This code defines a component Wrapper that wraps its children components inside a div elemnt
const Wrapper = (props) => {
  return <div className="app bg-gray-100 py-5">{props.children}</div>;
};

export default Wrapper;