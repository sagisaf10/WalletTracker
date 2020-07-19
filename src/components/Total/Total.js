import React from "react";
import "./Total.css";

const total = props => {
  return <div className="total">Total Expense: Rs. {props.total}</div>;
};

export default total;
