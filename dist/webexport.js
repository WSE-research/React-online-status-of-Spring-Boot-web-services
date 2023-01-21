this["@qanary/spring-boot-health-check"] = (function (require$$0) {
	'use strict';

	function getDefaultExportFromCjs (x) {
		return x && x.__esModule && Object.prototype.hasOwnProperty.call(x, 'default') ? x['default'] : x;
	}

	var dist = {};

	var SpringBootHealthCheck$1 = {};

	var useApplicationStatus$1 = {};

	Object.defineProperty(useApplicationStatus$1, "__esModule", {
	  value: true
	});
	useApplicationStatus$1.SERVICE_STATUS = void 0;
	useApplicationStatus$1.useApplicationStatus = useApplicationStatus;

	var _react$1 = require$$0;

	function _slicedToArray$1(arr, i) {
	  return _arrayWithHoles$1(arr) || _iterableToArrayLimit$1(arr, i) || _unsupportedIterableToArray$1(arr, i) || _nonIterableRest$1();
	}

	function _nonIterableRest$1() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _unsupportedIterableToArray$1(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray$1(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen);
	}

	function _arrayLikeToArray$1(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _iterableToArrayLimit$1(arr, i) {
	  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

	  if (_i == null) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;

	  var _s, _e;

	  try {
	    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _arrayWithHoles$1(arr) {
	  if (Array.isArray(arr)) return arr;
	}
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

	useApplicationStatus$1.SERVICE_STATUS = SERVICE_STATUS;

	function useApplicationStatus(type, credentials) {
	  var springBootAppUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "http://localhost:8080";
	  var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;

	  var _useState = (0, _react$1.useState)(undefined),
	      _useState2 = _slicedToArray$1(_useState, 2),
	      actuatorStatus = _useState2[0],
	      setActuatorStatus = _useState2[1];

	  var _useState3 = (0, _react$1.useState)(undefined),
	      _useState4 = _slicedToArray$1(_useState3, 2),
	      health = _useState4[0],
	      setHealth = _useState4[1];

	  var _useState5 = (0, _react$1.useState)(true),
	      _useState6 = _slicedToArray$1(_useState5, 2),
	      checkNotifier = _useState6[0],
	      setCheckNotifier = _useState6[1]; // This is here to prevent issues with people accidentally
	  // using URLs with a trailing slash


	  if (springBootAppUrl.endsWith("/")) {
	    springBootAppUrl = springBootAppUrl.slice(0, -1);
	  }

	  (0, _react$1.useEffect)(function () {
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
	              }
	            } else {
	              setActuatorStatus(SERVICE_STATUS.OK);
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
	                status: SERVICE_STATUS.PROBLEM,
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

	function _typeof(obj) {
	  "@babel/helpers - typeof";

	  return _typeof = "function" == typeof Symbol && "symbol" == typeof Symbol.iterator ? function (obj) {
	    return typeof obj;
	  } : function (obj) {
	    return obj && "function" == typeof Symbol && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
	  }, _typeof(obj);
	}

	Object.defineProperty(SpringBootHealthCheck$1, "__esModule", {
	  value: true
	});
	SpringBootHealthCheck$1.default = void 0;

	var _react = _interopRequireWildcard(require$$0);



	var _useApplicationStatus2 = useApplicationStatus$1;

	function _getRequireWildcardCache(nodeInterop) {
	  if (typeof WeakMap !== "function") return null;
	  var cacheBabelInterop = new WeakMap();
	  var cacheNodeInterop = new WeakMap();
	  return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) {
	    return nodeInterop ? cacheNodeInterop : cacheBabelInterop;
	  })(nodeInterop);
	}

	function _interopRequireWildcard(obj, nodeInterop) {
	  if (!nodeInterop && obj && obj.__esModule) {
	    return obj;
	  }

	  if (obj === null || _typeof(obj) !== "object" && typeof obj !== "function") {
	    return {
	      default: obj
	    };
	  }

	  var cache = _getRequireWildcardCache(nodeInterop);

	  if (cache && cache.has(obj)) {
	    return cache.get(obj);
	  }

	  var newObj = {};
	  var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;

	  for (var key in obj) {
	    if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) {
	      var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;

	      if (desc && (desc.get || desc.set)) {
	        Object.defineProperty(newObj, key, desc);
	      } else {
	        newObj[key] = obj[key];
	      }
	    }
	  }

	  newObj.default = obj;

	  if (cache) {
	    cache.set(obj, newObj);
	  }

	  return newObj;
	}

	function _slicedToArray(arr, i) {
	  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest();
	}

	function _nonIterableRest() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}

	function _unsupportedIterableToArray(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
	}

	function _arrayLikeToArray(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;

	  for (var i = 0, arr2 = new Array(len); i < len; i++) {
	    arr2[i] = arr[i];
	  }

	  return arr2;
	}

	function _iterableToArrayLimit(arr, i) {
	  var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"];

	  if (_i == null) return;
	  var _arr = [];
	  var _n = true;
	  var _d = false;

	  var _s, _e;

	  try {
	    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
	      _arr.push(_s.value);

	      if (i && _arr.length === i) break;
	    }
	  } catch (err) {
	    _d = true;
	    _e = err;
	  } finally {
	    try {
	      if (!_n && _i["return"] != null) _i["return"]();
	    } finally {
	      if (_d) throw _e;
	    }
	  }

	  return _arr;
	}

	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	}
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


	function SpringBootHealthCheck(_ref) {
	  var _ref$springBootAppUrl = _ref.springBootAppUrl,
	      springBootAppUrl = _ref$springBootAppUrl === void 0 ? "http://localhost:8080" : _ref$springBootAppUrl,
	      _ref$checkInterval = _ref.checkInterval,
	      checkInterval = _ref$checkInterval === void 0 ? 5000 : _ref$checkInterval,
	      _ref$className = _ref.className,
	      className = _ref$className === void 0 ? "" : _ref$className,
	      _ref$shouldUseDefault = _ref.shouldUseDefaultStyling,
	      shouldUseDefaultStyling = _ref$shouldUseDefault === void 0 ? true : _ref$shouldUseDefault,
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

	  var _useApplicationStatus = (0, _useApplicationStatus2.useApplicationStatus)(type, {
	    username: username,
	    password: password
	  }, springBootAppUrl, checkInterval),
	      health = _useApplicationStatus.health,
	      actuatorStatus = _useApplicationStatus.actuatorStatus;

	  return /*#__PURE__*/_react.default.createElement("div", {
	    className: "spring-boot-status ".concat(className).concat(shouldUseDefaultStyling ? " default" : "")
	  }, /*#__PURE__*/_react.default.createElement("div", {
	    className: "actuator"
	  }, "Status of actuator:", " ", /*#__PURE__*/_react.default.createElement("span", {
	    className: actuatorStatus
	  }, actuatorStatus == null ? "Loading actuator status.." : actuatorStatus)), /*#__PURE__*/_react.default.createElement("div", {
	    className: "health"
	  }, "Health of service:", " ", /*#__PURE__*/_react.default.createElement("span", {
	    className: health === null || health === void 0 ? void 0 : health.status
	  }, health == null ? "Loading health.." : health === null || health === void 0 ? void 0 : health.text)), type === "admin" ? /*#__PURE__*/_react.default.createElement("div", {
	    className: "credentials-prompt"
	  }, /*#__PURE__*/_react.default.createElement("div", null, "Enter credentials for basic auth if necessary"), "Username:", " ", /*#__PURE__*/_react.default.createElement("input", {
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
	  })) : null);
	}

	var _default = SpringBootHealthCheck;
	SpringBootHealthCheck$1.default = _default;

	(function (exports) {

		Object.defineProperty(exports, "__esModule", {
		  value: true
		});
		Object.defineProperty(exports, "SERVICE_STATUS", {
		  enumerable: true,
		  get: function get() {
		    return _useApplicationStatus.SERVICE_STATUS;
		  }
		});
		Object.defineProperty(exports, "SpringBootHealthCheck", {
		  enumerable: true,
		  get: function get() {
		    return _SpringBootHealthCheck.default;
		  }
		});
		Object.defineProperty(exports, "useApplicationStatus", {
		  enumerable: true,
		  get: function get() {
		    return _useApplicationStatus.useApplicationStatus;
		  }
		});

		var _SpringBootHealthCheck = _interopRequireDefault(SpringBootHealthCheck$1);

		var _useApplicationStatus = useApplicationStatus$1;

		function _interopRequireDefault(obj) {
		  return obj && obj.__esModule ? obj : {
		    default: obj
		  };
		}
	} (dist));

	var index = /*@__PURE__*/getDefaultExportFromCjs(dist);

	return index;

})(React);
//# sourceMappingURL=webexport.js.map
