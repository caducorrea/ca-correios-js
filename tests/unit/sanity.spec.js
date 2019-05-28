const chai = require('chai')
const expect = chai.expect

const Correios = require('../../src/correios')

describe('ca-correios-js unit tests', () => {
    it('should return an object', () => {
        expect(Correios).to.be.a('object')
    })

    it('should return a track function', () => {
        expect(Correios.track).to.be.a('function')
    })
})