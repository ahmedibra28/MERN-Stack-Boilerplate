import React, { Fragment } from "react";

export default () => {
  return (
    <Fragment>
      <div className='text-center text-light'>
        <span
          className='spinner-border mt-5'
          style={{ width: "200px", height: "200px" }}
        ></span>
      </div>
    </Fragment>
  );
};
