import { applySpec } from 'ramda';
import unigramsAndBigrams from './unigramsAndBigrams';

export const {
  endgrams: end,
  startgrams: start,
  unigrams: all,
} = unigramsAndBigrams;

const unigrams = applySpec({
  all,
  end,
  start,
});

export default unigrams;
