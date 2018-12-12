import {
  equals,
  length,
  until,
} from 'ramda';

// TODO: Reduce duplication with endgramRequired
const unigramsEqualWordCount = ({
  words,
  // TODO: Remove default param, set upstream
  unigrams = [],
}) => equals(
  words,
  length(unigrams),
);
const untilUnigramsEqualWordCount = until(unigramsEqualWordCount);

export default untilUnigramsEqualWordCount;
