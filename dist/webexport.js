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
	var _react$2 = require$$0;
	function _slicedToArray$3(arr, i) {
	  return _arrayWithHoles$3(arr) || _iterableToArrayLimit$3(arr, i) || _unsupportedIterableToArray$3(arr, i) || _nonIterableRest$3();
	}
	function _nonIterableRest$3() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray$3(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray$3(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen);
	}
	function _arrayLikeToArray$3(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _iterableToArrayLimit$3(arr, i) {
	  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
	  if (null != _i) {
	    var _s,
	      _e,
	      _x,
	      _r,
	      _arr = [],
	      _n = !0,
	      _d = !1;
	    try {
	      if (_x = (_i = _i.call(arr)).next, 0 === i) {
	        if (Object(_i) !== _i) return;
	        _n = !1;
	      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
	    } catch (err) {
	      _d = !0, _e = err;
	    } finally {
	      try {
	        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	    return _arr;
	  }
	}
	function _arrayWithHoles$3(arr) {
	  if (Array.isArray(arr)) return arr;
	} // @ts-check
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
	useApplicationStatus$1.SERVICE_STATUS = SERVICE_STATUS;
	function useApplicationStatus(type, credentials) {
	  var springBootAppUrl = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : "http://localhost:8080";
	  var interval = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 5000;
	  var _useState = (0, _react$2.useState)(undefined),
	    _useState2 = _slicedToArray$3(_useState, 2),
	    actuatorStatus = _useState2[0],
	    setActuatorStatus = _useState2[1];
	  var _useState3 = (0, _react$2.useState)(undefined),
	    _useState4 = _slicedToArray$3(_useState3, 2),
	    health = _useState4[0],
	    setHealth = _useState4[1];
	  var _useState5 = (0, _react$2.useState)(true),
	    _useState6 = _slicedToArray$3(_useState5, 2),
	    checkNotifier = _useState6[0],
	    setCheckNotifier = _useState6[1];
	  // This is here to prevent issues with people accidentally
	  // using URLs with a trailing slash
	  if (springBootAppUrl.endsWith("/")) {
	    springBootAppUrl = springBootAppUrl.slice(0, -1);
	  }
	  (0, _react$2.useEffect)(function () {
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

	var getMostImportantStatus$1 = {};

	Object.defineProperty(getMostImportantStatus$1, "__esModule", {
	  value: true
	});
	getMostImportantStatus$1.getMostImportantStatus = void 0;
	function _slicedToArray$2(arr, i) {
	  return _arrayWithHoles$2(arr) || _iterableToArrayLimit$2(arr, i) || _unsupportedIterableToArray$2(arr, i) || _nonIterableRest$2();
	}
	function _nonIterableRest$2() {
	  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
	}
	function _unsupportedIterableToArray$2(o, minLen) {
	  if (!o) return;
	  if (typeof o === "string") return _arrayLikeToArray$2(o, minLen);
	  var n = Object.prototype.toString.call(o).slice(8, -1);
	  if (n === "Object" && o.constructor) n = o.constructor.name;
	  if (n === "Map" || n === "Set") return Array.from(o);
	  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen);
	}
	function _arrayLikeToArray$2(arr, len) {
	  if (len == null || len > arr.length) len = arr.length;
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _iterableToArrayLimit$2(arr, i) {
	  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
	  if (null != _i) {
	    var _s,
	      _e,
	      _x,
	      _r,
	      _arr = [],
	      _n = !0,
	      _d = !1;
	    try {
	      if (_x = (_i = _i.call(arr)).next, 0 === i) {
	        if (Object(_i) !== _i) return;
	        _n = !1;
	      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
	    } catch (err) {
	      _d = !0, _e = err;
	    } finally {
	      try {
	        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	    return _arr;
	  }
	}
	function _arrayWithHoles$2(arr) {
	  if (Array.isArray(arr)) return arr;
	}
	/**
	 * @type {{[key in import("../hooks/useApplicationStatus").ServiceStatus]: number}}
	 */
	var statusComparisonTable = {
	  ok: 0,
	  "no-cors": 1,
	  offline: 2,
	  problem: 3,
	  protected: 4
	};

	/**
	 * @template Key
	 * @template Value
	 *
	 * @param {{[key in Key]: Value}} table
	 * @returns {{[key in Value]: Key}}
	 */
	var inverseOfTable = function inverseOfTable(table) {
	  return Object.fromEntries(Object.entries(table).map(function (_ref) {
	    var _ref2 = _slicedToArray$2(_ref, 2),
	      key = _ref2[0],
	      value = _ref2[1];
	    return [value, key];
	  }));
	};
	var inverseOfStatusComparisonTable = inverseOfTable(statusComparisonTable);

	/**
	 *
	 * @param  {...import("../hooks/useApplicationStatus").ServiceStatus} statuses
	 * @returns
	 */
	var getMostImportantStatus = function getMostImportantStatus() {
	  for (var _len = arguments.length, statuses = new Array(_len), _key = 0; _key < _len; _key++) {
	    statuses[_key] = arguments[_key];
	  }
	  return inverseOfStatusComparisonTable[statuses.reduce(function (currentlyMostImportantStatus, nextStatus) {
	    return Math.max(currentlyMostImportantStatus, statusComparisonTable[nextStatus]);
	  }, -1)];
	};
	getMostImportantStatus$1.getMostImportantStatus = getMostImportantStatus;

	var useStorage$1 = {};

	Object.defineProperty(useStorage$1, "__esModule", {
	  value: true
	});
	useStorage$1.useStorage = useStorage$1.useSessionStorage = useStorage$1.useLocalStorage = void 0;
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
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _iterableToArrayLimit$1(arr, i) {
	  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
	  if (null != _i) {
	    var _s,
	      _e,
	      _x,
	      _r,
	      _arr = [],
	      _n = !0,
	      _d = !1;
	    try {
	      if (_x = (_i = _i.call(arr)).next, 0 === i) {
	        if (Object(_i) !== _i) return;
	        _n = !1;
	      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
	    } catch (err) {
	      _d = !0, _e = err;
	    } finally {
	      try {
	        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	    return _arr;
	  }
	}
	function _arrayWithHoles$1(arr) {
	  if (Array.isArray(arr)) return arr;
	}
	/**
	 * @template T
	 * @param {Storage} storage
	 * @param {string} key
	 * @param {T} defaultValue
	 * @returns {[T, (param: T) => void]}
	 *
	 */
	var useStorage = function useStorage(storage, key, defaultValue) {
	  var checkIntervalMs = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 10000;
	  var _useState = (0, _react$1.useState)(defaultValue),
	    _useState2 = _slicedToArray$1(_useState, 2),
	    stateValue = _useState2[0],
	    setStateValue = _useState2[1];
	  (0, _react$1.useEffect)(function () {
	    try {
	      var parsedStorageValue = JSON.parse(storage.getItem(key));
	      setStateValue(parsedStorageValue);
	    } catch (_error) {}
	    var intervalTimer = setInterval(function () {
	      try {
	        var _parsedStorageValue = JSON.parse(storage.getItem(key));
	        if (stateValue !== _parsedStorageValue) setStateValue(_parsedStorageValue);
	      } catch (_error) {}
	    }, checkIntervalMs);

	    // @ts-ignore
	    return function () {
	      return clearInterval(intervalTimer);
	    };
	  }, []);
	  var setStorageValue = function setStorageValue(value) {
	    if (storage.getItem(key) !== JSON.stringify(value)) storage.setItem(key, JSON.stringify(value));
	    if (stateValue !== value) setStateValue(value);
	  };
	  return [stateValue, setStorageValue];
	};
	useStorage$1.useStorage = useStorage;
	var useLocalStorage = function useLocalStorage(key, defaultValue) {
	  var checkIntervalMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
	  return useStorage(localStorage, key, defaultValue, checkIntervalMs);
	};
	useStorage$1.useLocalStorage = useLocalStorage;
	var useSessionStorage = function useSessionStorage(key, defaultValue) {
	  var checkIntervalMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
	  return useStorage(sessionStorage, key, defaultValue, checkIntervalMs);
	};
	useStorage$1.useSessionStorage = useSessionStorage;

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
	var _getMostImportantStatus = getMostImportantStatus$1;
	var _useStorage = useStorage$1;
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
	  for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];
	  return arr2;
	}
	function _iterableToArrayLimit(arr, i) {
	  var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"];
	  if (null != _i) {
	    var _s,
	      _e,
	      _x,
	      _r,
	      _arr = [],
	      _n = !0,
	      _d = !1;
	    try {
	      if (_x = (_i = _i.call(arr)).next, 0 === i) {
	        if (Object(_i) !== _i) return;
	        _n = !1;
	      } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0);
	    } catch (err) {
	      _d = !0, _e = err;
	    } finally {
	      try {
	        if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return;
	      } finally {
	        if (_d) throw _e;
	      }
	    }
	    return _arr;
	  }
	}
	function _arrayWithHoles(arr) {
	  if (Array.isArray(arr)) return arr;
	} // @ts-check
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
	 * @property {Deprecated} [shouldUseDefaultStyling="DEPRECATED"]
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
