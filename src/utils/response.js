exports.sendResponse = (res, status, success, details, message) => {
  res.status(status).json({ success, details, message });
};
