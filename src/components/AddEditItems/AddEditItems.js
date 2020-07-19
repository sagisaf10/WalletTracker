import React, { Component } from "react";
import ListItems from "../ListItems/ListItems";
import Total from "../Total/Total";
import "./AddEditItem.css";

class AddEditItem extends Component {
  constructor(props) {
    super(props);
    let d = JSON.parse(localStorage.getItem("data"));
    if (d) {
      this.state = {
        data: d,
        expense: "",
        date: "",
        price: "",
        total: ""
      };
    } else {
      this.state = {
        data: [],
        expense: "",
        date: "",
        price: "",
        total: ""
      };
    }

    this.add = this.add.bind(this);
    this.update = this.update.bind(this);
    this.delete = this.delete.bind(this);
    this.total = this.total.bind(this);
  }
  add(e) {
    e.preventDefault();
    let data = this.state.data;
    // console.log('data: ',data);
    let expense = this.state.expense;
    let price = this.state.price;
    let date = this.state.date;
    if (price && expense) {
      data.push({
        expense: expense,
        price: price,
        date: date,
        delete: false
      });
      //console.log("updated data: ", data);
      this.setState({ data: data, expense: "", price: "", date: "" });
      localStorage.setItem("data", JSON.stringify(data));
      this.total();
    }
  }
  update(event) {
    event.target.id === "expense"
      ? this.setState({ expense: event.target.value })
      : this.setState({ price: event.target.value });
    if (event.target.id === "date") {
      this.setState({ date: event.target.value });
    }
    //const check = this.state;
    // console.log('check:',check);
  }
  delete(index) {
    // console.log(index);
    let data = this.state.data;
    data.splice(index, 1);
    this.setState({ data });
    localStorage.setItem("data", JSON.stringify(data));
    this.total();
  }
  total() {
    let data = this.state.data;
    if (data) {
      let result = 0;
      data.forEach(element => {
        //console.log("total:", element);
        result += parseFloat(element.price);
      });
      //console.log("result", result);
      this.setState({ total: result });
    }
  }
  componentDidMount() {
    this.total();
  }
  render() {
    return (
      <div className="wrapper">
        <div className="userinput">
          <div>
            <h1>Wallet Tracker</h1>
          </div>
          <form>
            <input
              type="text"
              className="myInput"
              onChange={this.update}
              id="expense"
              placeholder="Expense:"
              value={this.state.expense}
            />
            <input
              type="date"
              className="myInput"
              onChange={this.update}
              id="date"
              placeholder="Date:"
              value={this.state.date}
            />
            <input
              type="number"
              className="myInput"
              onChange={this.update}
              id="price"
              placeholder="Price:"
              value={this.state.price}
            />
            <button type="submit" className="add" onClick={this.add}>
              +
            </button>
          </form>
        </div>
        <div className="ListItem">
          <ul>
            {this.state.data.map((data, index) => {
              // console.log('map: ',data);
              return (
                <ListItems
                  data={data}
                  index={index}
                  key={index}
                  delete={this.delete}
                />
              );
            })}
          </ul>
        </div>
        <Total total={this.state.total} />
      </div>
    );
  }
}

export default AddEditItem;
