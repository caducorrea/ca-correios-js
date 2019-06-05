import chai from 'chai';
import chaiAsPromised from 'chai-as-promised';
import { Cep } from '../../src/correios';

chai.use(chaiAsPromised);

const { expect } = chai;

describe('Cep (unit)', () => {
  describe('when imported', () => {
    it('should return a function', () => {
      expect(Cep).to.be.a('function');
    });
  });

  describe('when invoked', () => {
    it('should return a Promise', () => {
      const cepPromise = Cep('0501000');
      expect(cepPromise.then).to.be.a('function');
      expect(cepPromise.catch).to.be.a('function');
    });
  });

  describe('when invoked with a valid "0511000" string', () => {
    it('should fulfill with correct address', () => expect(Cep('05010000')).to.eventually.deep.equal({
      cep: '05010000',
      state: 'SP',
      city: 'São Paulo',
      neighborhood: 'Perdizes',
      street: 'Rua Caiubi',
    }));
  });
});
