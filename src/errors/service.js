function ServiceError(error, source) {
  return {
    message: error.message,
    source,
  };
}

export default ServiceError;
