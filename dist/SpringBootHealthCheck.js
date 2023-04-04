"use strict";

function _typeof(obj) { "@babel/helpers - typeof"; return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) { return typeof obj; } : function (obj) { return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }, _typeof(obj); }

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

var _react = _interopRequireWildcard(require("react"));

require("./index.css");

var _useApplicationStatus2 = require("./hooks/useApplicationStatus");

var _getMostImportantStatus = require("./utils/getMostImportantStatus");

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }

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
function SpringBootHealthCheck(_ref) {
  var _health$status;

  var name = _ref.name,
      _ref$springBootAppUrl = _ref.springBootAppUrl,
      springBootAppUrl = _ref$springBootAppUrl === void 0 ? "http://localhost:8080" : _ref$springBootAppUrl,
      _ref$checkInterval = _ref.checkInterval,
      checkInterval = _ref$checkInterval === void 0 ? 5000 : _ref$checkInterval,
      _ref$className = _ref.className,
      className = _ref$className === void 0 ? "" : _ref$className,
      _ref$stylePreset = _ref.stylePreset,
      stylePreset = _ref$stylePreset === void 0 ? "default" : _ref$stylePreset,
      _ref$type = _ref.type,
      type = _ref$type === void 0 ? "actuator" : _ref$type;

  var _useState = (0, _react.useState)(""),
      _useState2 = _slicedToArray(_useState, 2),
      username = _useState2[0],
      setUsername = _useState2[1];

  var _useState3 = (0, _react.useState)(""),
      _useState4 = _slicedToArray(_useState3, 2),
      password = _useState4[0],
      setPassword = _useState4[1];

  var _useState5 = (0, _react.useState)(null),
      _useState6 = _slicedToArray(_useState5, 2),
      forceShowCredentialsInput = _useState6[0],
      setForceShowCredentialsInput = _useState6[1];

  var _useApplicationStatus = (0, _useApplicationStatus2.useApplicationStatus)(type, {
    username: username,
    password: password
  }, springBootAppUrl, checkInterval),
      health = _useApplicationStatus.health,
      actuatorStatus = _useApplicationStatus.actuatorStatus;

  (0, _react.useEffect)(function () {
    if ((health === null || health === void 0 ? void 0 : health.status) === "protected") {
      setForceShowCredentialsInput(null);
    }
  }, [health]);
  var presetClassName = stylePreset === "none" ? "" : stylePreset;
  var overallStatus = (0, _getMostImportantStatus.getMostImportantStatus)((_health$status = health === null || health === void 0 ? void 0 : health.status) !== null && _health$status !== void 0 ? _health$status : "offline", actuatorStatus); // forceShow trumps first condition

  var shouldRenderCredentialsInput = Boolean(Number((health === null || health === void 0 ? void 0 : health.status) === "protected") & (forceShowCredentialsInput !== null && forceShowCredentialsInput !== void 0 ? forceShowCredentialsInput : 1) || forceShowCredentialsInput);
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "spring-boot-status ".concat(className, " ").concat(presetClassName, " ").concat(overallStatus),
    title: "Status of ".concat(name !== null && name !== void 0 ? name : springBootAppUrl, ": ").concat(health === null || health === void 0 ? void 0 : health.status, "\nHealth of service: The ").concat(name !== null && name !== void 0 ? name : springBootAppUrl, " is ").concat(actuatorStatus, ".")
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: "actuator"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "statusMessagePrefix"
  }, "Status of "), /*#__PURE__*/_react.default.createElement("span", {
    className: "statusServiceName"
  }, name !== null && name !== void 0 ? name : springBootAppUrl), ":", " ", /*#__PURE__*/_react.default.createElement("span", {
    className: "".concat(actuatorStatus, " status")
  }, actuatorStatus == null ? "Loading actuator status.." : actuatorStatus)), /*#__PURE__*/_react.default.createElement("div", {
    className: "health"
  }, /*#__PURE__*/_react.default.createElement("span", {
    className: "statusMessagePrefix"
  }, "Health of "), /*#__PURE__*/_react.default.createElement("span", {
    className: "statusServiceName"
  }, name !== null && name !== void 0 ? name : springBootAppUrl), ":", " ", /*#__PURE__*/_react.default.createElement("span", {
    className: health === null || health === void 0 ? void 0 : health.status
  }, health == null ? "Loading health.." : health === null || health === void 0 ? void 0 : health.text)), type === "admin" ? /*#__PURE__*/_react.default.createElement("div", {
    className: "credentials-prompt"
  }, shouldRenderCredentialsInput ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, "Enter credentials for basic auth if necessary"), "Username:", " ", /*#__PURE__*/_react.default.createElement("input", {
    value: username,
    className: "username-input",
    onChange: function onChange(changeEvent) {
      return setUsername(changeEvent.target.value);
    },
    placeholder: "Username"
  }), "Password:", " ", /*#__PURE__*/_react.default.createElement("input", {
    value: password,
    className: "password-input",
    onChange: function onChange(changeEvent) {
      return setPassword(changeEvent.target.value);
    },
    placeholder: "Password"
  })) : null, /*#__PURE__*/_react.default.createElement("button", {
    className: "credentials-toggle",
    onClick: function onClick() {
      return setForceShowCredentialsInput(function (v) {
        return !v;
      });
    }
  }, "Toggle credentials")) : null);
}

var _default = SpringBootHealthCheck;
exports.default = _default;