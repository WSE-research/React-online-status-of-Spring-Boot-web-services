// @ts-check
import React, { useEffect, useState } from "react";
import "./index.css";
import { useApplicationStatus } from "./hooks/useApplicationStatus";
import { getMostImportantStatus } from "./utils/getMostImportantStatus";

/**
 * @namespace SpringBootHealthCheck
 */

/**
 * @typedef {Object} SpringBootHealthCheckProps
 * @property {string} [name="service"] The human-readable name that can be used to distinguish multiple components
 * @property {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @property {number} [checkInterval=5000] The time in milliseconds between requests checking the status of the service.
 * @property {string} [className=""] Additional class names that should be added to the health check component
 * @property {"default"|"simple"|"minimal"|"none"} [stylePreset="default"] The type of styling preset to use
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
 *  name="my service"
 *  stylePreset="minimal"
 *  className="custom-styling" />
 *
 * @param {SpringBootHealthCheckProps} props
 * @returns {JSX.Element}
 */
function SpringBootHealthCheck({
  name,
  springBootAppUrl = "http://localhost:8080",
  checkInterval = 5000,
  className = "",
  stylePreset = "default",
  type = "actuator",
}) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [forceShowCredentialsInput, setForceShowCredentialsInput] =
    useState(null);
  const { health, actuatorStatus } = useApplicationStatus(
    type,
    {
      username,
      password,
    },
    springBootAppUrl,
    checkInterval
  );

  useEffect(() => {
    if (health?.status !== "protected") {
      setForceShowCredentialsInput(false);
    } else {
      setForceShowCredentialsInput(true);
    }
  }, [health]);

  const presetClassName = stylePreset === "none" ? "" : stylePreset;
  const overallStatus = getMostImportantStatus(
    health?.status ?? "offline",
    actuatorStatus
  );
  // forceShow trumps first condition
  const shouldRenderCredentialsInput = Boolean(
    Number(health?.status === "protected") & (forceShowCredentialsInput ?? 1) ||
      forceShowCredentialsInput
  );

  return (
    <div
      className={`spring-boot-status ${className} ${presetClassName} ${overallStatus}`}
      title={`Status of ${name ?? springBootAppUrl}: ${
        health?.status
      }\nHealth of service: The ${
        name ?? springBootAppUrl
      } is ${actuatorStatus}.`}
    >
      <div className={"actuator"}>
        <span className="statusMessagePrefix">Status of </span>
        <span className="statusServiceName">
          {name ?? springBootAppUrl}
        </span>:{" "}
        <span className={`${actuatorStatus} status`}>
          {actuatorStatus == null
            ? "Loading actuator status.."
            : actuatorStatus}
        </span>
      </div>
      <div className={"health"}>
        <span className="statusMessagePrefix">Health of </span>
        <span className="statusServiceName">
          {name ?? springBootAppUrl}
        </span>:{" "}
        <span className={health?.status}>
          {health == null ? "Loading health.." : health?.text}
        </span>
      </div>
      {type === "admin" ? (
        <div className={"credentials-prompt"}>
          {shouldRenderCredentialsInput ? (
            <>
              <div>Enter credentials for basic auth if necessary</div>
              Username:{" "}
              <input
                value={username}
                className="username-input"
                onChange={(changeEvent) =>
                  setUsername(changeEvent.target.value)
                }
                placeholder="Username"
              />
              Password:{" "}
              <input
                value={password}
                className="password-input"
                onChange={(changeEvent) =>
                  setPassword(changeEvent.target.value)
                }
                placeholder="Password"
              />
            </>
          ) : null}
          <button
            className="credentials-toggle"
            onClick={() => setForceShowCredentialsInput((v) => !v)}
          >
            Toggle credentials
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default SpringBootHealthCheck;
