"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireDefault(require("react"));

require("./index.css");

var _useApplicationStatus = require("./hooks/useApplicationStatus");

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

// @ts-check

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
 * @returns {JSX.Element}
 */
function SpringBootHealthCheck(_ref) {
  let {
    springBootAppUrl = "http://localhost:8080",
    checkInterval = 5000,
    padding = "0.5rem",
    margin = "0.5rem"
  } = _ref;
  const {
    health,
    actuatorStatus
  } = (0, _useApplicationStatus.useApplicationStatus)(springBootAppUrl, checkInterval);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "spring-boot-status",
    style: {
      margin
    }
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "actuator",
    style: {
      padding
    }
  }, "Status of actuator:", " ", /*#__PURE__*/_react.default.createElement("span", {
    className: actuatorStatus
  }, actuatorStatus == null ? "Loading actuator status.." : actuatorStatus)), /*#__PURE__*/_react.default.createElement("div", {
    className: "health",
    style: {
      padding
    }
  }, "Health of service:", " ", /*#__PURE__*/_react.default.createElement("span", {
    className: health === null || health === void 0 ? void 0 : health.status
  }, health == null ? "Loading health.." : health === null || health === void 0 ? void 0 : health.text)));
}

var _default = SpringBootHealthCheck;
exports.default = _default;