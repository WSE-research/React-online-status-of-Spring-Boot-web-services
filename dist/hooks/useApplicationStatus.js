"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVICE_STATUS = void 0;
exports.useApplicationStatus = useApplicationStatus;

require("core-js/modules/web.dom-collections.iterator.js");

require("core-js/modules/es.string.ends-with.js");

require("core-js/modules/es.promise.js");

var _react = require("react");

// @ts-check

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
const SERVICE_STATUS = Object.freeze({
  OFFLINE: "offline",
  NO_CORS: "no-cors",
  PROBLEM: "problem",
  OK: "ok"
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

exports.SERVICE_STATUS = SERVICE_STATUS;

function useApplicationStatus() {
  let springBootAppUrl = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : "http://localhost:8080";
  let interval = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5000;
  const [actuatorStatus, setActuatorStatus] = (0, _react.useState)(undefined);
  const [health, setHealth] = (0, _react.useState)(undefined);
  const [checkNotifier, setCheckNotifier] = (0, _react.useState)(true); // This is here to prevent issues with people accidentally
  // using URLs with a trailing slash

  if (springBootAppUrl.endsWith("/")) {
    springBootAppUrl = springBootAppUrl.slice(0, -1);
  }

  (0, _react.useEffect)(() => {
    fetch("".concat(springBootAppUrl, "/actuator")).then(actuatorResponse => {
      if (!(actuatorResponse !== null && actuatorResponse !== void 0 && actuatorResponse.ok)) {
        setActuatorStatus(SERVICE_STATUS.PROBLEM);
      }

      setActuatorStatus(SERVICE_STATUS.OK);
      return actuatorResponse.json();
    }).then(actuatorData => {
      fetch(actuatorData._links.health.href).then(healthResponse => {
        if (!(healthResponse !== null && healthResponse !== void 0 && healthResponse.ok)) {
          setHealth({
            status: SERVICE_STATUS.PROBLEM,
            text: "The service's health endpoint responded with a non-2XX response code: ".concat(healthResponse.status)
          });
          return;
        }

        return healthResponse.json();
      }).then(healthData => {
        if (healthData.status !== "UP") {
          setHealth({
            status: SERVICE_STATUS.PROBLEM,
            text: healthData.status
          });
          return;
        }

        setHealth({
          status: SERVICE_STATUS.OK,
          text: healthData.status
        });
      }).catch(error => {
        console.error(error); //? If the request goes through with the mode set
        //? to no-cors it's online but not configured correctly

        fetch(actuatorData._links.health.href, {
          mode: "no-cors"
        }).then(() => {
          setHealth({
            status: SERVICE_STATUS.NO_CORS,
            text: "The service's health endpoint does not allow CORS."
          });
        }).catch(() => {
          setHealth({
            status: SERVICE_STATUS.OFFLINE,
            text: "The service's health endpoint is offline."
          });
        });
      });
    }).catch(error => {
      console.error(error); //? If the request goes through with the mode set
      //? to no-cors it's online but not configured correctly

      fetch("".concat(springBootAppUrl, "/actuator"), {
        mode: "no-cors"
      }).then(() => {
        setActuatorStatus(SERVICE_STATUS.NO_CORS);
        setHealth({
          status: SERVICE_STATUS.NO_CORS,
          text: "The actuator does not allow CORS."
        });
      }).catch(() => {
        setActuatorStatus(SERVICE_STATUS.OFFLINE);
        setHealth({
          status: SERVICE_STATUS.OFFLINE,
          text: "The actuator is offline."
        });
      });
    });
    setTimeout(() => setCheckNotifier(!checkNotifier), interval);
  }, [springBootAppUrl, checkNotifier]);
  return {
    health,
    actuatorStatus
  };
}