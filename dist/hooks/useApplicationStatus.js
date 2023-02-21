"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SERVICE_STATUS = void 0;
exports.useApplicationStatus = useApplicationStatus;

var _react = require("react");

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

/**
 * @namespace useApplicationStatus
 */

/**
 * @typedef {("offline"|"no-cors"|"problem"|"ok"|"protected")} ServiceStatus
 */

/**
 * Enum for states of a Spring Boot service
 *
 * @readonly
 * @enum {ServiceStatus}
 */
var SERVICE_STATUS = Object.freeze({
  OFFLINE: "offline",
  NO_CORS: "no-cors",
  PROBLEM: "problem",
  OK: "ok",
  PROTECTED: "protected"
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

exports.SERVICE_STATUS = SERVICE_STATUS;

function useApplicationStatus(type, credentials) {
  var springBootAppUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "http://localhost:8080";
  var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;

  var _useState = (0, _react.useState)(undefined),
      _useState2 = _slicedToArray(_useState, 2),
      actuatorStatus = _useState2[0],
      setActuatorStatus = _useState2[1];

  var _useState3 = (0, _react.useState)(undefined),
      _useState4 = _slicedToArray(_useState3, 2),
      health = _useState4[0],
      setHealth = _useState4[1];

  var _useState5 = (0, _react.useState)(true),
      _useState6 = _slicedToArray(_useState5, 2),
      checkNotifier = _useState6[0],
      setCheckNotifier = _useState6[1]; // This is here to prevent issues with people accidentally
  // using URLs with a trailing slash


  if (springBootAppUrl.endsWith("/")) {
    springBootAppUrl = springBootAppUrl.slice(0, -1);
  }

  (0, _react.useEffect)(function () {
    switch (type) {
      case "actuator":
        {
          fetch("".concat(springBootAppUrl, "/actuator"), {
            headers: {
              Authorization: "Basic ".concat(window.btoa("".concat(credentials.username, ":").concat(credentials.password)))
            }
          }).then(function (actuatorResponse) {
            if (!(actuatorResponse !== null && actuatorResponse !== void 0 && actuatorResponse.ok)) {
              setActuatorStatus(SERVICE_STATUS.PROBLEM);
            } else {
              setActuatorStatus(SERVICE_STATUS.OK);
            }

            return actuatorResponse.json();
          }).then(function (actuatorData) {
            fetch(actuatorData._links.health.href, {
              headers: {
                Authorization: "Basic ".concat(window.btoa("".concat(credentials.username, ":").concat(credentials.password)))
              }
            }).then(function (healthResponse) {
              if (!(healthResponse !== null && healthResponse !== void 0 && healthResponse.ok)) {
                setHealth({
                  status: SERVICE_STATUS.PROBLEM,
                  text: "The service's health endpoint responded with a non-2XX response code: ".concat(healthResponse.status)
                });
                return;
              }

              return healthResponse.json();
            }).then(function (healthData) {
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
            }).catch(function (error) {
              // console.error(error);
              //? If the request goes through with the mode set
              //? to no-cors it's online but not configured correctly
              fetch(actuatorData._links.health.href, {
                mode: "no-cors",
                headers: {
                  Authorization: "Basic ".concat(window.btoa("".concat(credentials.username, ":").concat(credentials.password)))
                }
              }).then(function () {
                setHealth({
                  status: SERVICE_STATUS.NO_CORS,
                  text: "The service's health endpoint does not allow CORS."
                });
              }).catch(function () {
                setHealth({
                  status: SERVICE_STATUS.OFFLINE,
                  text: "The service's health endpoint is offline."
                });
              });
            });
          }).catch(function () {
            //? If the request goes through with the mode set
            //? to no-cors it's online but not configured correctly
            fetch("".concat(springBootAppUrl, "/actuator"), {
              mode: "no-cors",
              headers: {
                Authorization: "Basic ".concat(window.btoa("".concat(credentials.username, ":").concat(credentials.password)))
              }
            }).then(function () {
              setActuatorStatus(SERVICE_STATUS.NO_CORS);
              setHealth({
                status: SERVICE_STATUS.NO_CORS,
                text: "The actuator does not allow CORS."
              });
            }).catch(function () {
              setActuatorStatus(SERVICE_STATUS.OFFLINE);
              setHealth({
                status: SERVICE_STATUS.OFFLINE,
                text: "The actuator is offline."
              });
            });
          });
          break;
        }

      case "admin":
        {
          fetch("".concat(springBootAppUrl, "/admin/status"), {
            headers: {
              Authorization: "Basic ".concat(window.btoa("".concat(credentials.username, ":").concat(credentials.password)))
            }
          }).then(function (response) {
            if (!(response !== null && response !== void 0 && response.ok)) {
              if (response.status === 401) {
                setActuatorStatus(SERVICE_STATUS.PROTECTED);
                setHealth({
                  status: SERVICE_STATUS.PROTECTED,
                  text: "The ressource is password protected and the provided credentials were incorrect."
                });
                return;
              } else {
                setActuatorStatus(SERVICE_STATUS.PROBLEM);
                setHealth({
                  status: SERVICE_STATUS.PROBLEM,
                  text: "The service responded with the non-ok status code ".concat(response.status)
                });
              }
            } else {
              setActuatorStatus(SERVICE_STATUS.OK);
              setHealth({
                status: SERVICE_STATUS.OK,
                text: "The service responded with the ok status code ".concat(response.status)
              });
            }

            return response.json();
          }).catch(function () {
            //? If the request goes through with the mode set
            //? to no-cors it's online but not configured correctly
            fetch("".concat(springBootAppUrl, "/admin/status"), {
              mode: "no-cors",
              headers: {
                Authorization: "Basic ".concat(window.btoa("".concat(credentials.username, ":").concat(credentials.password)))
              }
            }).then(function () {
              setActuatorStatus(SERVICE_STATUS.NO_CORS);
              setHealth({
                status: SERVICE_STATUS.NO_CORS,
                text: "The actuator does not allow CORS."
              });
            }).catch(function () {
              setActuatorStatus(SERVICE_STATUS.OFFLINE);
              setHealth({
                status: SERVICE_STATUS.OFFLINE,
                text: "The actuator is offline."
              });
            });
          });
          break;
        }

      case "basic":
        {
          fetch(springBootAppUrl).then(function (response) {
            if (!(response !== null && response !== void 0 && response.ok)) {
              setActuatorStatus(SERVICE_STATUS.PROBLEM);
              setHealth({
                status: SERVICE_STATUS.PROBLEM,
                text: "The service responded with the non-ok status code ".concat(response.status)
              });
            } else {
              setActuatorStatus(SERVICE_STATUS.OK);
              setHealth({
                status: SERVICE_STATUS.OK,
                text: "The service responded with the ok status code ".concat(response.status)
              });
            }
          }).catch(function () {
            //? If the request goes through with the mode set
            //? to no-cors it's online but not configured correctly
            fetch(springBootAppUrl, {
              mode: "no-cors"
            }).then(function () {
              setActuatorStatus(SERVICE_STATUS.NO_CORS);
              setHealth({
                status: SERVICE_STATUS.NO_CORS,
                text: "The service does not allow CORS."
              });
            }).catch(function () {
              setActuatorStatus(SERVICE_STATUS.OFFLINE);
              setHealth({
                status: SERVICE_STATUS.OFFLINE,
                text: "The service is offline."
              });
            });
          });
          break;
        }

      default:
        {
          setActuatorStatus(SERVICE_STATUS.PROBLEM);
          setHealth({
            status: SERVICE_STATUS.PROBLEM,
            text: "This component is misconfigured. An invalid `type` property has been passed to it."
          });
        }
    }

    setTimeout(function () {
      return setCheckNotifier(!checkNotifier);
    }, interval);
  }, [springBootAppUrl, checkNotifier]);
  return {
    health: health,
    actuatorStatus: actuatorStatus
  };
}