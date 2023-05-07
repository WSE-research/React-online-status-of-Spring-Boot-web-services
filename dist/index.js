"use strict";

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
var _SpringBootHealthCheck = _interopRequireDefault(require("./SpringBootHealthCheck"));
var _useApplicationStatus = require("./hooks/useApplicationStatus");
function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }