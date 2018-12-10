import { pipe } from 'ramda';
import filterEndgrams from './filterEndgramsWhenRequired';
import generateUnigram from './startgramOrBigram';
import untilUnigramsEqualWordCount from './untilUnigramsEqualWordCount';

// TODO: Consider extraction
const setDefaultUnigrams = ({
  unigrams = [],
  ...props
}) => ({
  ...props,
  unigrams,
});

// TODO: Rename
const debugTwo = pipe(
  setDefaultUnigrams,
  filterEndgrams,
  generateUnigram,
  ({
    ...props
  }) => {
    // TODO: Conditional format, then join
    const res = {
      ...props,
    };
    console.log(res);
    return res;
  },
);

// TODO: Rename
const debug = untilUnigramsEqualWordCount(debugTwo);

const generateOne = ({
  generated,
  ...props
}) => ({
  ...props,
  generated: [
    ...generated,
    debug(props),
  ],
});

export default generateOne;
