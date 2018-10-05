import { expect } from 'chai';
import { sentences } from '../src';

describe('#sentences', () => {
  const document = 'That there is constant succession and flux of ideas in our minds I have observed in the former part of this essay and everyone may take notice of it in himself. This I suppose may deserve some part of our care in the conduct of our understandings ; and I think it may be of great advantage if ate can by use get that power over our minds as to be able to direct that train of ideas, that so, since there Mill new ones perpetually come into our thoughts by a constant succession, we may be able by choice so to direct them, that none may come into view but such as are pertinent to our present enquiry, and in such order as may be most useful to the discovery we are upon ; or at least, if some foreign and unsought ideas will offer themselves, that yet we might be able to reject them and keep them from taking off our minds from its present pursuit and hinder them from running away with our thoughts quite from the subject in hand. This is not, I suspect, so easy to be done as perhaps may be imagined ; and yet, for ought I know, this may be, if not the chief, yet one of the great differences that carry some men in their reasoning so far beyond others, where they seem to be naturally of equal parts. A proper and effectual remedy for this wandering of thoughts I would be glad to find. He that shall propose such a one would do great service to the studious and contemplative part of mankind and perhaps help unthinking men to become thinking. I must acknowledge that hitherto I have discovered no other way to keep our thoughts close to their business but the endeavoring as much as we can and by frequent attention and application getting the habit of attention and application. He that will observe children will find that, even when they endeavor their uttermost, they cannot keep their minds from straggling. The way to cure it, I am satisfied, is not angry chiding or beating for that presently fills their heads with all the ideas that fear, dread, or confusion can offer to them. To bring back gently their wandering thoughts by leading them into the path and going before them in the train they should pursue, without any rebuke or so much as taking notice (where it can be avoided) of their roving, I suppose would sooner reconcile and inure them to attention than all those rougher methods which more distract their thought and, hindering the application they would promote, introduce a contrary habit.';
  const sentenceOne = 'i would promote introduce a constant succession and hindering the path and application getting the train they cannot keep their roving i would sooner reconcile and contemplative part of the way to direct them';

  describe('curried binary interface', () => {
    const oneSentence = sentences(document);

    describe('unseeded', () => {
      it('should return a nondeterministic string', () => {
        expect(oneSentence()).to.be.a('string');
      });
    });

    describe('seeded', () => {
      it('should return deterministic sentences', () => {
        expect(oneSentence(1)).to.equal(sentenceOne);
        expect(oneSentence(2)).to.equal('i have discovered no other way to find that train they seem to be glad to be done as may be avoided of our thoughts close to our thoughts by a proper and inure them');
        expect(oneSentence(4)).to.equal('he that yet for ought i know this essay and inure them into the discovery we might be naturally of great differences that will find');
      });
    });
  });

  describe('unary interface', () => {
    const seed = 1;
    const oneNondeterministic = { document };
    const oneDeterministic = { ...oneNondeterministic, seed };
    const threeDeterministic = { ...oneDeterministic, count: 3 };

    it('returns a nondeterministic sentence', () => {
      const [sentence] = sentences(oneNondeterministic);
      expect(sentence).to.be.a('string');
    });

    it('returns a deterministic sentence', () => {
      expect(sentences(oneDeterministic)).to.include.members([sentenceOne]);
    });

    it('returns multiple deterministic sentences', () => {
      expect(sentences(threeDeterministic)).to.include.members([
        sentenceOne,
        'he that train they seem to be glad to be done as may be avoided of our thoughts close to our thoughts by a proper and inure them',
        'this wandering of attention and yet for ought i know this wandering thoughts i would promote introduce a contrary habit',
      ]);
    });
  });
});
