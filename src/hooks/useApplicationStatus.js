// @ts-check
import { useEffect, useState } from "react";

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
  PROTECTED: "protected",
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
 * @param {"actuator"|"admin"|"basic"} [type="actuator"] The type of health endpoint which should be monitored
 * @param {{username:string;password:string;}} [credentials] The Basic Auth Credentials
 * @returns {ApplicationStatus}
 */
export function useApplicationStatus(
  type,
  credentials,
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
    switch (type) {
      case "actuator": {
        fetch(`${springBootAppUrl}/actuator`, {
          headers: {
            Authorization: `Basic ${window.btoa(
              `${credentials.username}:${credentials.password}`
            )}`,
          },
        })
          .then((actuatorResponse) => {
            if (!actuatorResponse?.ok) {
              setActuatorStatus(SERVICE_STATUS.PROBLEM);
            } else {
              setActuatorStatus(SERVICE_STATUS.OK);
            }

            return actuatorResponse.json();
          })
          .then((actuatorData) => {
            fetch(actuatorData._links.health.href, {
              headers: {
                Authorization: `Basic ${window.btoa(
                  `${credentials.username}:${credentials.password}`
                )}`,
              },
            })
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
                // console.error(error);
                //? If the request goes through with the mode set
                //? to no-cors it's online but not configured correctly
                fetch(actuatorData._links.health.href, {
                  mode: "no-cors",
                  headers: {
                    Authorization: `Basic ${window.btoa(
                      `${credentials.username}:${credentials.password}`
                    )}`,
                  },
                })
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
          .catch(() => {
            //? If the request goes through with the mode set
            //? to no-cors it's online but not configured correctly
            fetch(`${springBootAppUrl}/actuator`, {
              mode: "no-cors",
              headers: {
                Authorization: `Basic ${window.btoa(
                  `${credentials.username}:${credentials.password}`
                )}`,
              },
            })
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
        break;
      }
      case "admin": {
        fetch(`${springBootAppUrl}/admin/status`, {
          headers: {
            Authorization: `Basic ${window.btoa(
              `${credentials.username}:${credentials.password}`
            )}`,
          },
        })
          .then((response) => {
            if (!response?.ok) {
              if (response.status === 401) {
                setActuatorStatus(SERVICE_STATUS.PROTECTED);
                setHealth({
                  status: SERVICE_STATUS.PROTECTED,
                  text: "The ressource is password protected and the provided credentials were incorrect.",
                });
                return;
              } else {
                setActuatorStatus(SERVICE_STATUS.PROBLEM);
              }
            } else {
              setActuatorStatus(SERVICE_STATUS.OK);
            }

            return response.json();
          })
          .catch(() => {
            //? If the request goes through with the mode set
            //? to no-cors it's online but not configured correctly
            fetch(`${springBootAppUrl}/admin/status`, {
              mode: "no-cors",
              headers: {
                Authorization: `Basic ${window.btoa(
                  `${credentials.username}:${credentials.password}`
                )}`,
              },
            })
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
        break;
      }
      case "basic": {
        fetch(springBootAppUrl)
          .then((response) => {
            if (!response?.ok) {
              setActuatorStatus(SERVICE_STATUS.PROBLEM);
              setHealth({
                status: SERVICE_STATUS.PROBLEM,
                text: `The service responded with the non-ok status code ${response.status}`,
              });
            } else {
              setActuatorStatus(SERVICE_STATUS.OK);
              setHealth({
                status: SERVICE_STATUS.PROBLEM,
                text: `The service responded with the ok status code ${response.status}`,
              });
            }
          })
          .catch(() => {
            //? If the request goes through with the mode set
            //? to no-cors it's online but not configured correctly
            fetch(springBootAppUrl, {
              mode: "no-cors",
            })
              .then(() => {
                setActuatorStatus(SERVICE_STATUS.NO_CORS);
                setHealth({
                  status: SERVICE_STATUS.NO_CORS,
                  text: "The service does not allow CORS.",
                });
              })
              .catch(() => {
                setActuatorStatus(SERVICE_STATUS.OFFLINE);
                setHealth({
                  status: SERVICE_STATUS.OFFLINE,
                  text: "The service is offline.",
                });
              });
          });
        break;
      }
      default: {
        setActuatorStatus(SERVICE_STATUS.PROBLEM);
        setHealth({
          status: SERVICE_STATUS.PROBLEM,
          text: "This component is misconfigured. An invalid `type` property has been passed to it.",
        });
      }
    }

    setTimeout(() => setCheckNotifier(!checkNotifier), interval);
  }, [springBootAppUrl, checkNotifier]);

  return { health, actuatorStatus };
}
