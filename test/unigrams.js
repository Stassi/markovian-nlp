import { expect } from 'chai';
import unigrams, {
  all,
  end,
  start,
} from '../src/unigrams';

describe('unigrams', () => {
  const sentence = 'First word, then last.';

  describe('default function', () => {
    it('should have keys: [#all, #end, #start]', () => {
      expect(unigrams(sentence)).to.have.all.keys(
        'all',
        'end',
        'start',
      );
    });
  });

  describe('#all', () => {
    it('to return ordered list of strings', () => {
      expect(all(sentence)).to.have.ordered.members([
        'first',
        'last',
        'then',
        'word',
      ]);
    });
  });

  describe('#end', () => {
    it('to return end unigrams with count', () => {
      expect(end(sentence)).to.deep.include({
        normal: 'last',
        count: 1,
      });
    });
  });

  describe('#start', () => {
    it('to return start unigrams with count', () => {
      expect(start(sentence)).to.deep.include({
        normal: 'first',
        count: 1,
      });
    });
  });
});
