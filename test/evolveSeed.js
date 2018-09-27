import { expect } from 'chai';
import evolveSeed from '../src/evolveSeed';

describe('#evolveSeed', () => {
  const deterministic = { seed: 1 };
  const nondeterministic = { seed: null };

  it('should return a known value from a deterministic seed', () => {
    expect(evolveSeed(deterministic)).to.include({ seed: -1494798787674112 });
  });

  it('should return a new value from a nondeterministic seed', () => {
    const { seed } = evolveSeed(nondeterministic);
    expect(seed).to.be.a('number');
  });
});
