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
var _useStorage = require("./hooks/useStorage");
function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }
function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; } // @ts-check
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
    type = _ref$type === void 0 ? "actuator" : _ref$type,
    shouldUseDefaultStyling = _ref.shouldUseDefaultStyling;
  (0, _react.useEffect)(function () {
    var packageStyle = ["font-family: Consolas, Monaco, 'Lucida Console', monospace", "color: #f31414", "font-size: 18px", "line-height: 18px", "display: block"].join(";");
    var codeStyle = ["font-family: Consolas, Monaco, 'Lucida Console', monospace", "line-height: 18px", "font-size: 18px"].join(";");
    var regularStyle = ["line-height: 18px", "font-size: 18px"].join(";");
    if (shouldUseDefaultStyling !== undefined) {
      console.warn("%c@qanary/spring-boot-health-check:%cshouldUseDefaultStyling%c is deprecated. Use %cstylePreset%c instead. See the documentation for more information.", packageStyle, codeStyle, regularStyle, codeStyle, regularStyle);
    }
  }, []);
  var _useLocalStorage = (0, _useStorage.useLocalStorage)("password", ""),
    _useLocalStorage2 = _slicedToArray(_useLocalStorage, 2),
    username = _useLocalStorage2[0],
    setUsername = _useLocalStorage2[1];
  var _useLocalStorage3 = (0, _useStorage.useLocalStorage)("username", ""),
    _useLocalStorage4 = _slicedToArray(_useLocalStorage3, 2),
    password = _useLocalStorage4[0],
    setPassword = _useLocalStorage4[1];
  var _useState = (0, _react.useState)("systemFalse"),
    _useState2 = _slicedToArray(_useState, 2),
    forceShowCredentialsInput = _useState2[0],
    setForceShowCredentialsInput = _useState2[1];
  var _useApplicationStatus = (0, _useApplicationStatus2.useApplicationStatus)(type, {
      username: username,
      password: password
    }, springBootAppUrl, checkInterval),
    health = _useApplicationStatus.health,
    actuatorStatus = _useApplicationStatus.actuatorStatus;
  (0, _react.useEffect)(function () {
    if ((health === null || health === void 0 ? void 0 : health.status) === "protected") {
      setForceShowCredentialsInput("systemTrue");
    } else if (forceShowCredentialsInput === "systemTrue") {
      setForceShowCredentialsInput("systemFalse");
    }
  }, [health]);
  var presetClassName = stylePreset === "none" ? "" : stylePreset;
  var overallStatus = (0, _getMostImportantStatus.getMostImportantStatus)((_health$status = health === null || health === void 0 ? void 0 : health.status) !== null && _health$status !== void 0 ? _health$status : "offline", actuatorStatus);
  // forceShow trumps first condition
  /*
    * systemTrue => system wants the prompt to be displayed
    * systemFalse => system doesn't want the prompt to be displayed
    * userTrue => user wants the prompt to be displayed
    * userFalse => user doesn't want the prompt to be displayed
     User decisions should trump system decisions, unless the authentication fails
  */
  var shouldRenderCredentialsInput = Boolean(Number((health === null || health === void 0 ? void 0 : health.status) === "protected") & Number(forceShowCredentialsInput === "systemTrue" || forceShowCredentialsInput === "userTrue") || forceShowCredentialsInput === "systemTrue" || forceShowCredentialsInput === "userTrue");
  return /*#__PURE__*/_react.default.createElement("div", {
    className: "spring-boot-status ".concat(className, " ").concat(presetClassName, " ").concat(overallStatus),
    title: "Status of ".concat(name, " (").concat(springBootAppUrl, "): ").concat(health === null || health === void 0 ? void 0 : health.status, "\nHealth of service: The ").concat(name, " (").concat(springBootAppUrl, ") is ").concat(actuatorStatus, ".")
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
  }, shouldRenderCredentialsInput ? /*#__PURE__*/_react.default.createElement(_react.default.Fragment, null, /*#__PURE__*/_react.default.createElement("div", null, "Enter credentials for basic auth if necessary"), /*#__PURE__*/_react.default.createElement("div", null, "WARNING: Your credentials will be stored in the local storage. Always clear it on public or shared computers after use."), "Username:", " ", /*#__PURE__*/_react.default.createElement("input", {
    value: username,
    className: "username-input",
    onChange: function onChange(changeEvent) {
      return setUsername(changeEvent.target.value);
    },
    placeholder: "Username"
  }), "Password:", " ", /*#__PURE__*/_react.default.createElement("input", {
    value: password,
    type: "password",
    className: "password-input",
    onChange: function onChange(changeEvent) {
      return setPassword(changeEvent.target.value);
    },
    placeholder: "Password"
  })) : null, /*#__PURE__*/_react.default.createElement("button", {
    className: "credentials-toggle"
    //? null for user choice, false for automatic change, true for both
    ,
    onClick: function onClick() {
      return setForceShowCredentialsInput(function (oldValue) {
        switch (oldValue) {
          case "userTrue":
          case "systemTrue":
            return "userFalse";
          case "userFalse":
          case "systemFalse":
            return "userTrue";
        }
      });
    }
  }, "Toggle credentials")) : null);
}
var _default = SpringBootHealthCheck;
exports.default = _default;