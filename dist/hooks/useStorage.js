"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.useStorage = exports.useSessionStorage = exports.useLocalStorage = void 0;
var _react = require("react");
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
  var _useState = (0, _react.useState)(defaultValue),
    _useState2 = _slicedToArray(_useState, 2),
    stateValue = _useState2[0],
    setStateValue = _useState2[1];
  (0, _react.useEffect)(function () {
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
exports.useStorage = useStorage;
var useLocalStorage = function useLocalStorage(key, defaultValue) {
  var checkIntervalMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
  return useStorage(localStorage, key, defaultValue, checkIntervalMs);
};
exports.useLocalStorage = useLocalStorage;
var useSessionStorage = function useSessionStorage(key, defaultValue) {
  var checkIntervalMs = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 10000;
  return useStorage(sessionStorage, key, defaultValue, checkIntervalMs);
};
exports.useSessionStorage = useSessionStorage;