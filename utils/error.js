const getError = (err) => {
  err.response && err.response.data && err.respones.data.message
    ? err.respone.data.message
    : err.message;
};

export { getError };
