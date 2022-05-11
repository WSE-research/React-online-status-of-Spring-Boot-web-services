import React, { useEffect, useState } from "react";

/**
 * @namespace useApplicationStatus
 */

/**
 * @typedef {("offline"|"no-cors"|"problem"|"ok")} ServiceStatus
 */

/**
 * Enum for states of a Spring Boot service
 *
 * @readonly
 * @enum {ServiceStatus}
 */
export const SERVICE_STATUS = Object.freeze({
  OFFLINE: "offline",
  NO_CORS: "no-cors",
  PROBLEM: "problem",
  OK: "ok",
});

/**
 * @typedef {Object} HealthStatus
 * @property {ServiceStatus} status The state of the service's health endpoint
 * @property {string} text The precise status or explanation of failure
 */
/**
 * @typedef {Object} ApplicationStatus
 * @property {ServiceStatus} actuatorStatus The state of the Spring Boot actuator endpoint
 * @property {HealthStatus} health The status of the service's health endpoint
 */

/**
 *
 * @param {string} [springBootAppUrl="http://localhost:8080"] The URL of the Spring Boot service, including port and without *any* routes.
 * @param {number} [interval=5000] The time in milliseconds between requests checking the status of the service.
 * @returns {ApplicationStatus}
 */
export function useApplicationStatus(
  springBootAppUrl = "http://localhost:8080",
  interval = 5000
) {
  const [actuatorStatus, setActuatorStatus] = useState(undefined);
  const [health, setHealth] = useState(undefined);
  const [checkNotifier, setCheckNotifier] = useState(true);
  // This is here to prevent issues with people accidentally
  // using URLs with a trailing slash
  if (springBootAppUrl.endsWith("/")) {
    springBootAppUrl = springBootAppUrl.slice(0, -1);
  }

  useEffect(() => {
    fetch(`${springBootAppUrl}/actuator`)
      .then((actuatorResponse) => {
        if (!actuatorResponse?.ok) {
          setActuatorStatus(SERVICE_STATUS.PROBLEM);
        }

        setActuatorStatus(SERVICE_STATUS.OK);
        return actuatorResponse.json();
      })
      .then((actuatorData) => {
        fetch(actuatorData._links.health.href)
          .then((healthResponse) => {
            if (!healthResponse?.ok) {
              setHealth({
                status: SERVICE_STATUS.PROBLEM,
                text: `The service's health endpoint responded with a non-2XX response code: ${healthResponse.status}`,
              });
              return;
            }

            return healthResponse.json();
          })
          .then((healthData) => {
            if (healthData.status !== "UP") {
              setHealth({
                status: SERVICE_STATUS.PROBLEM,
                text: healthData.status,
              });
              return;
            }

            setHealth({
              status: SERVICE_STATUS.OK,
              text: healthData.status,
            });
          })
          .catch((error) => {
            console.error(error);
            //? If the request goes through with the mode set
            //? to no-cors it's online but not configured correctly
            fetch(actuatorData._links.health.href, { mode: "no-cors" })
              .then(() => {
                setHealth({
                  status: SERVICE_STATUS.NO_CORS,
                  text: "The service's health endpoint does not allow CORS.",
                });
              })
              .catch(() => {
                setHealth({
                  status: SERVICE_STATUS.OFFLINE,
                  text: "The service's health endpoint is offline.",
                });
              });
          });
      })
      .catch((error) => {
        console.error(error);
        //? If the request goes through with the mode set
        //? to no-cors it's online but not configured correctly
        fetch(`${springBootAppUrl}/actuator`, { mode: "no-cors" })
          .then(() => {
            setActuatorStatus(SERVICE_STATUS.NO_CORS);
            setHealth({
              status: SERVICE_STATUS.NO_CORS,
              text: "The actuator does not allow CORS.",
            });
          })
          .catch(() => {
            setActuatorStatus(SERVICE_STATUS.OFFLINE);
            setHealth({
              status: SERVICE_STATUS.OFFLINE,
              text: "The actuator is offline.",
            });
          });
      });

    setTimeout(() => setCheckNotifier(!checkNotifier), interval);
  }, [springBootAppUrl, checkNotifier]);

  return { health, actuatorStatus };
}
