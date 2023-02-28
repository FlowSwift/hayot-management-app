"use strict";
// Error handler middleware for async controller
const asyncHandler = fn => (req, res, next) => {
    return Promise
        .resolve(fn(req, res, next))
        .catch(next);
  };

module.exports = {
    asyncHandler
}