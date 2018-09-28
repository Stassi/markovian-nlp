import { expect } from 'chai';
import evolveSeed from '../src/evolveSeed';

describe('#evolveSeed', () => {
  const deterministic = 1;
  const nondeterministic = null;

  it('should return a known value from a deterministic seed', () => {
    expect(evolveSeed(deterministic)).to.equal(-1494798787674112);
  });

  it('should return a new value from a nondeterministic seed', () => {
    expect(evolveSeed(nondeterministic)).to.be.a('number');
  });
});
