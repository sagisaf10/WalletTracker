import React from "react";

class ListItems extends React.Component {
  render() {
    return (
      <li>
        <span className="expenses">{this.props.data.expense}</span>
        <span className="date">{this.props.data.date}</span>
        <span className="price">Rs.{this.props.data.price}</span>

        <button
          className="delete"
          onClick={e => {
            e.stopPropagation();
            this.props.delete(this.props.index);
          }}
        >
          x
        </button>
      </li>
    );
  }
}

export default ListItems;
