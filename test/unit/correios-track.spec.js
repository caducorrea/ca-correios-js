import { expect } from 'chai';
import { Track } from '../../src/correios';

describe('Track (unit)', () => {
  describe('when imported', () => {
    it('should return a function', () => {
      expect(Track).to.be.a('function');
    });
  });
});
