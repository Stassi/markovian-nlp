import { ifElse } from 'ramda';
import { generateOne as generateBigram } from '../bigrams';
import { generateOne as generateStartgram } from '../startgrams';
import unigramsPropIsEmpty from './propIsEmpty';

// TODO: Reduce duplication among bigrams & startgrams (i.e. evolveSeedProp)
const generateOne = ifElse(
  unigramsPropIsEmpty,
  generateStartgram,
  generateBigram,
);

export default generateOne;
