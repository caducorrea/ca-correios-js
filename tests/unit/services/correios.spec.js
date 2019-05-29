const chai = require('chai');

const { expect } = chai.expect;

const CorreiosAPI = require('../../../src/services/correios');

describe('Services - Correios', () => {
  it('should return a Promise', () => {
    const Correios = CorreiosAPI.fetchRastro('AA123456789BR');
    expect(Correios.then).to.be.a('function');
    expect(Correios.catch).to.be.a('function');
  });
});
