import { expect } from 'chai';
import random, {
  evolveSeed,
  evolveSeeds,
  weightedRandom,
} from '../src/random';

describe('random', () => {
  describe('default object', () => {
    it('should have methods as keys', () => {
      expect(random).to.have.all.keys(
        'evolveSeed',
        'evolveSeeds',
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

  describe('#evolveSeeds', () => {
    describe('unseeded', () => {
      it('should return multiple nondeterministic seeds', () => {
        const threeNondeterministicSeeds = { count: 3  };
        const [seedOne, seedTwo, seedThree] = evolveSeeds(threeNondeterministicSeeds);
        expect(seedOne).to.be.undefined;
        expect(seedTwo).to.be.undefined;
        expect(seedThree).to.be.undefined;
      });
    });

    describe('seeded', () => {
      it('should return deterministic seeds', () => {
        const twoDeterministicSeeds = { count: 2, seed: 1 };
        expect(evolveSeeds(twoDeterministicSeeds)).to.include.members([1, -1494798787674112]);
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
