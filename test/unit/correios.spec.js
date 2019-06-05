import { expect } from 'chai';
import { Cep } from '../../src/correios';

describe('Cep (unit)', () => {
  describe('when imported', () => {
    it('should return a function', () => {
      expect(Cep).to.be.a('function');
    });
  });
});
