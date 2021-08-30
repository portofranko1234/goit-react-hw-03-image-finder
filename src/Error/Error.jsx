import React from "react";
import PropTypes from "prop-types";
import Styles from "./Error.module.css";

const Error = ({ children }) => {
  return (
    <div className={Styles.error}>
      <span className={Styles.error__text}>{children}</span>
    </div>
  );
};
Error.propTypes = {
  children: PropTypes.node.isRequired,
};
export default Error;
