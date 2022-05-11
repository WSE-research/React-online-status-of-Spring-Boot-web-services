import React from "react";
import "./index.css";
import { useApplicationStatus } from "./hooks/useApplicationStatus";
import PropTypes from "prop-types";

/**
 * @namespace SpringBootHealthCheck
 */

/**
 * @typedef {Object} SpringBootHealthCheckProps
 * @property {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @property {number} [checkInterval=5000] The time in milliseconds between requests checking the status of the service.
 * @property {string} [padding="0.5rem"] The padding of the container component. It should feature the amount and a unit.
 * @property {string} [margin="0.5rem"] The margin of the container component. It should feature the amount and a unit.
 */

/**
 * @name SpringBootHealthCheck
 * 
 * @description A small component which checks the status of a given Spring Boot service at the specified intervals.
 * 
 * @example
 * <SpringBootHealthCheck
 *  springBootAppUrl="http://localhost:8000"
 *  checkInterval={10000}
 *  padding="1rem"
 *  margin="0.2rem" />
 *
 * @param {SpringBootHealthCheckProps} props
 * @returns {React.Component}
 */
function SpringBootHealthCheck({
  springBootAppUrl = "http://localhost:8080",
  checkInterval = 5000,
  padding = "0.5rem",
  margin = "0.5rem",
}) {
  const { health, actuatorStatus } = useApplicationStatus(
    springBootAppUrl,
    checkInterval
  );

  return (
    <div className="spring-boot-status" style={{ margin }}>
      <div className={"actuator"} style={{ padding }}>
        Status of actuator:{" "}
        <span className={actuatorStatus}>
          {actuatorStatus == null
            ? "Loading actuator status.."
            : actuatorStatus}
        </span>
      </div>
      <div className={"health"} style={{ padding }}>
        Health of service:{" "}
        <span className={health?.status}>
          {health == null ? "Loading health.." : health?.text}
        </span>
      </div>
    </div>
  );
}

SpringBootHealthCheck.propTypes = {
  springBootAppUrl: PropTypes.string,
  checkInterval: PropTypes.number,
  padding: PropTypes.string,
  margin: PropTypes.string,
};

export default SpringBootHealthCheck;
