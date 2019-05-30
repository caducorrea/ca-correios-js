const ServiceError = ({ message, service }) => {
  this.name = 'Service Error';
  this.message = message;
  this.service = service;
};

ServiceError.prototype = Object.create(Error.prototype);
ServiceError.prototype.constructor = ServiceError;

export default ServiceError;
