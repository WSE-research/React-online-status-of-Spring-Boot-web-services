// @ts-check
import React, { useState } from "react";
import "./index.css";
import { useApplicationStatus } from "./hooks/useApplicationStatus";

/**
 * @namespace SpringBootHealthCheck
 */

/**
 * @typedef {Object} SpringBootHealthCheckProps
 * @property {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @property {number} [checkInterval=5000] The time in milliseconds between requests checking the status of the service.
 * @property {string} [className=""] Additional class names that should be added to the health check component
 * @property {boolean} [shouldUseDefaultStyling=true] Should the default styling of the component be used?
 * @property {"actuator"|"admin"|"basic"} [type="actuator"] The type of health endpoint
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
 *  shouldUseDefaultStyling={false}
 *  className="custom-styling" />
 *
 * @param {SpringBootHealthCheckProps} props
 * @returns {JSX.Element}
 */
function SpringBootHealthCheck({
  springBootAppUrl = "http://localhost:8080",
  checkInterval = 5000,
  className = "",
  shouldUseDefaultStyling = true,
  type = "actuator",
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { health, actuatorStatus } = useApplicationStatus(
    type,
    {
      username,
      password,
    },
    springBootAppUrl,
    checkInterval
  );

  return (
    <div
      className={`spring-boot-status ${className}${
        shouldUseDefaultStyling ? " default" : ""
      }`}
    >
      <div className={"actuator"}>
        Status of actuator:{" "}
        <span className={actuatorStatus}>
          {actuatorStatus == null
            ? "Loading actuator status.."
            : actuatorStatus}
        </span>
      </div>
      <div className={"health"}>
        Health of service:{" "}
        <span className={health?.status}>
          {health == null ? "Loading health.." : health?.text}
        </span>
      </div>
      {type === "admin" ? (
        <div className={"credentials-prompt"}>
          <div>Enter credentials for basic auth if necessary</div>
          Username:{" "}
          <input
            value={username}
            className="username-input"
            onChange={(changeEvent) => setUsername(changeEvent.target.value)}
            placeholder="Username"
          />
          Password:{" "}
          <input
            value={password}
            className="password-input"
            onChange={(changeEvent) => setPassword(changeEvent.target.value)}
            placeholder="Password"
          />
        </div>
      ) : null}
    </div>
  );
}

export default SpringBootHealthCheck;
