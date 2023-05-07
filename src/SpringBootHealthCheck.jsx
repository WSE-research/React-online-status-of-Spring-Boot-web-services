// @ts-check
import React, { useEffect, useState } from "react";
import "./index.css";
import { useApplicationStatus } from "./hooks/useApplicationStatus";
import { getMostImportantStatus } from "./utils/getMostImportantStatus";
import { useLocalStorage } from "./hooks/useStorage";

/**
 * @namespace SpringBootHealthCheck
 * @typedef {"DEPRECATED"} Deprecated
 */
/**
 * @typedef {Object} SpringBootHealthCheckProps
 * @property {string} [name="service"] The human-readable name that can be used to distinguish multiple components
 * @property {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @property {number} [checkInterval=5000] The time in milliseconds between requests checking the status of the service.
 * @property {string} [className=""] Additional class names that should be added to the health check component
 * @property {"default"|"simple"|"minimal"|"none"} [stylePreset="default"] The type of styling preset to use
 * @property {Deprecated} shouldUseDefaultStyling
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
  shouldUseDefaultStyling,
}) {
  useEffect(() => {
    const packageStyle = [
      "font-family: Consolas, Monaco, 'Lucida Console', monospace",
      "color: #f31414",
      "font-size: 18px",
      "line-height: 18px",
      "display: block",
    ].join(";");
    const codeStyle = [
      "font-family: Consolas, Monaco, 'Lucida Console', monospace",
      "line-height: 18px",
      "font-size: 18px",
    ].join(";");
    const regularStyle = ["line-height: 18px", "font-size: 18px"].join(";");
    if (shouldUseDefaultStyling !== undefined) {
      console.warn(
        "%c@qanary/spring-boot-health-check:%cshouldUseDefaultStyling%c is deprecated. Use %cstylePreset%c instead. See the documentation for more information.",
        packageStyle,
        codeStyle,
        regularStyle,
        codeStyle,
        regularStyle
      );
    }
  }, []);

  const [username, setUsername] = useLocalStorage("password", "");
  const [password, setPassword] = useLocalStorage("username", "");
  const [forceShowCredentialsInput, setForceShowCredentialsInput] =
    useState("systemFalse");
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
    if (health?.status === "protected") {
      setForceShowCredentialsInput("systemTrue");
    } else if (forceShowCredentialsInput === "systemTrue") {
      setForceShowCredentialsInput("systemFalse");
    }
  }, [health]);

  const presetClassName = stylePreset === "none" ? "" : stylePreset;
  const overallStatus = getMostImportantStatus(
    health?.status ?? "offline",
    actuatorStatus
  );
  // forceShow trumps first condition
  /*
    * systemTrue => system wants the prompt to be displayed
    * systemFalse => system doesn't want the prompt to be displayed
    * userTrue => user wants the prompt to be displayed
    * userFalse => user doesn't want the prompt to be displayed

    User decisions should trump system decisions, unless the authentication fails
  */
  const shouldRenderCredentialsInput = Boolean(
    Number(health?.status === "protected") &
      Number(
        forceShowCredentialsInput === "systemTrue" ||
          forceShowCredentialsInput === "userTrue"
      ) ||
      forceShowCredentialsInput === "systemTrue" ||
      forceShowCredentialsInput === "userTrue"
  );

  return (
    <div
      className={`spring-boot-status ${className} ${presetClassName} ${overallStatus}`}
      title={`Status of ${name} (${springBootAppUrl}): ${health?.status}\nHealth of service: The ${name} (${springBootAppUrl}) is ${actuatorStatus}.`}
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
              <div>
                WARNING: Your credentials will be stored in the local storage.
                Always clear it on public or shared computers after use.
              </div>
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
                type="password"
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
            //? null for user choice, false for automatic change, true for both
            onClick={() =>
              setForceShowCredentialsInput((oldValue) => {
                switch (oldValue) {
                  case "userTrue":
                  case "systemTrue":
                    return "userFalse";
                  case "userFalse":
                  case "systemFalse":
                    return "userTrue";
                }
              })
            }
          >
            Toggle credentials
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default SpringBootHealthCheck;
