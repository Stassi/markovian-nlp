import { expect } from 'chai';
import { ngramsDistribution, sentences } from '../src';

describe('main object', () => {
  describe('ngramsDistribution', () => {
    it('should be a function', () => {
      expect(ngramsDistribution).to.be.a('function');
    });
  });

  describe('sentences', () => {
    it('should be a function', () => {
      expect(sentences).to.be.a('function');
    });
  });
});
