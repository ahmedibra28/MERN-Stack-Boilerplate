import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <div className='row text-center alert-msg'>
      <div className='col-lg-5 col-md-6 col-sm-10 col-12 mx-auto'>
        <span key={alert.id} className={`mt-2 alert alert-${alert.alertType}`}>
          {alert.msg}
        </span>
      </div>
    </div>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
