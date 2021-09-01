import React, { Component } from "react";
import propTypes from "prop-types";

class Button extends Component {
  static propTypes = { fn: propTypes.func };

  render() {
    return (
      <button className="Button" type="button" onClick={() => this.props.fn()}>
        Load more
      </button>
    );
  }
}

export default Button;
