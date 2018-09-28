import { expect } from 'chai';
import unseededStartgram from '../../src/markovSentences/unseededStartgram';

describe('#unseededStartgram', () => {
  const startgram = unseededStartgram({
    one: { _start: 1 },
    three: { _start: 1 },
  });

  it('should return a deterministic string from distribution when seeded', () => {
    expect(startgram(1)).to.equal('one');
    expect(startgram(3)).to.equal('three');
  });

  it('should return a nondeterministic string from distribution when NOT seeded', () => {
    expect(startgram()).to.be.a('string');
  });
});
