import React, { Component } from "react";
import "react-loader-spinner/dist/loader/css/react-spinner-loader.css";
import Loader from "react-loader-spinner";

export default class App extends Component {
  state = {};

  render() {
    return (
      <div>
        <Loader type="Puff" color="#3f51b5" height={100} width={100} />
      </div>
    );
  }
}
