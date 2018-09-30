import { expect } from 'chai';
import random, {
  evolveSeed,
  weightedRandom,
} from '../src/random';

describe('random', () => {
  describe('default object', () => {
    it('should have keys: [#evolveSeed, #weightedRandom]', () => {
      expect(random).to.have.all.keys(
        'evolveSeed',
        'evolveSeedProp',
        'weightedRandom',
      );
    });
  });

  describe('#evolveSeed', () => {
    describe('seeded', () => {
      it('should return a deterministic number', () => {
        expect(evolveSeed(1)).to.equal(-1494798787674112);
      });
    });

    describe('unseeded', () => {
      it('should return a nondeterministic number', () => {
        expect(evolveSeed()).to.be.a('number');
      });
    });
  });

  describe('#evolveSeedProp', () => {
    // TODO: Implement
    it('should have tests');
  });

  describe('#weightedRandom', () => {
    const values = ['alpha', 'beta'];
    const fiftyFifty = weightedRandom({
      values,
      weights: [50, 50],
    });

    describe('seeded', () => {
      it('should return a deterministic value', () => {
        expect(fiftyFifty(1)).to.equal(values[0]);
        expect(fiftyFifty(3)).to.equal(values[1]);
      });
    });

    describe('unseeded', () => {
      it('should return a nondeterministic value', () => {
        expect(fiftyFifty()).to.be.oneOf(values);
      });
    });
  });
});
