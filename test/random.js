import { expect } from 'chai';
import evolveSeed from '../src/random/evolveSeed';
import {
  evolveSeedProp,
  evolveSeeds,
  weighted,
} from '../src/random';

describe('random', () => {
  const one = 1;
  const evolvedOne = 0.1776348083296759;

  describe('#evolveSeed', () => {
    describe('seeded', () => {
      it('should return a deterministic number', () => {
        expect(evolveSeed(one)).to.equal(evolvedOne);
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
        const twoDeterministicSeeds = { count: 2, seed: one };
        expect(evolveSeeds(twoDeterministicSeeds)).to.include.members([one, evolvedOne]);
      });
    });
  });

  describe('#evolveSeedProp', () => {
    describe('seeded', () => {
      it('should return a deterministic number', () => {
        expect(evolveSeedProp({ seed: one })).to.include({ seed: evolvedOne });
      });
    });

    describe('unseeded', () => {
      it('should return a nondeterministic number', () => {
        const { seed } = evolveSeedProp({ seed: null });
        expect(seed).to.be.a('number');
      });
    });
  });

  describe('#weighted', () => {
    const values = ['alpha', 'beta'];
    const fiftyFifty = weighted({
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
