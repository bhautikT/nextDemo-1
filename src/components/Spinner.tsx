// src/components/Spinner.js
import React from "react";
import PropTypes from "prop-types";

const Spinner = () => {
  return (
    <div className={`flex justify-center items-center`}>
      <div
        className={`size-5 border-4 ml-4 border-gray_100 border-t-transparent border-solid rounded-full animate-spin border-t-orange-400`}
      ></div>
    </div>
  );
};

Spinner.propTypes = {
  size: PropTypes.oneOf(["sm", "md", "lg", "xl"]),
  color: PropTypes.string,
};

Spinner.defaultProps = {
  size: "md",
  color: "blue",
};

export default Spinner;
