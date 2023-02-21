"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getMostImportantStatus = void 0;

function _slicedToArray(arr, i) { return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray(arr, i) || _nonIterableRest(); }

function _nonIterableRest() { throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function _iterableToArrayLimit(arr, i) { var _i = arr == null ? null : typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]; if (_i == null) return; var _arr = []; var _n = true; var _d = false; var _s, _e; try { for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i["return"] != null) _i["return"](); } finally { if (_d) throw _e; } } return _arr; }

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