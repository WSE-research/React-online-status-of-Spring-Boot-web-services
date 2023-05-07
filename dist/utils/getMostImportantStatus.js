"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMostImportantStatus = void 0;
function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }
function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }
function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }
function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i]; return arr2; }
function _iterableToArrayLimit(arr, i) { var _i = null == arr ? null : "undefined" != typeof Symbol && arr[Symbol.iterator] || arr["@@iterator"]; if (null != _i) { var _s, _e, _x, _r, _arr = [], _n = !0, _d = !1; try { if (_x = (_i = _i.call(arr)).next, 0 === i) { if (Object(_i) !== _i) return; _n = !1; } else for (; !(_n = (_s = _x.call(_i)).done) && (_arr.push(_s.value), _arr.length !== i); _n = !0); } catch (err) { _d = !0, _e = err; } finally { try { if (!_n && null != _i.return && (_r = _i.return(), Object(_r) !== _r)) return; } finally { if (_d) throw _e; } } return _arr; } }
function _arrayWithHoles(arr) { if (Array.isArray(arr)) return arr; }
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
    var _ref2 = _slicedToArray(_ref, 2),
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
exports.getMostImportantStatus = getMostImportantStatus;