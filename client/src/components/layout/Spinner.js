import React, { Fragment } from "react";
import spinner from "./spinner.gif";

export default () => {
  return (
    <Fragment>
      <img
        className='pt-5'
        src={spinner}
        style={{ width: "200px", margin: "auto", display: "block" }}
        alt='Loading...'
      />
    </Fragment>
  );
};
