import { map, pipe } from 'ramda';
import { evolveSeeds } from './random';
import createSentence from './createSentence';
import ngramsDistribution from './ngramsDistribution';

const sentences = pipe(
  ({
    distribution,
    document,
    ...props
  }) => ({
    ...props,
    distribution: distribution || ngramsDistribution(document),
  }),
  ({ distribution, ...props }) => ({
    ...props,
    sentence: seed => createSentence({ seed, distribution }),
  }),
  ({
     seed,
     count = 1,
     ...props
   }) => ({
    ...props,
    seeds: evolveSeeds({ count, seed }),
  }),
  ({ seeds, sentence }) => map(sentence, seeds),
);

export default sentences;
