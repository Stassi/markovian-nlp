import { last } from 'ramda';

const toLastUnigram = ({
  unigrams,
  ...props
}) => ({
  ...props,
  unigrams,
  lastUnigram: last(unigrams),
});

export default toLastUnigram;
