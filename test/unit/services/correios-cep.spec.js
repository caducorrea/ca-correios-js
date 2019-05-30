/* eslint-disable no-undef */
import { expect } from 'chai';
import CEP from '../../../src/services/correios-cep';

describe('Services - Correios', () => {
  it('should return a Promise', () => {
    const cep = CEP('05010000');
    expect(cep.then).to.be.a('function');
    expect(cep.catch).to.be.a('function');
  });
});
