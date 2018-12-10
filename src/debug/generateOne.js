import { pipe } from 'ramda';
import filterEndgrams from './filterEndgramsWhenRequired';
import generateUnigram from './startgramOrBigram';
import untilUnigramsEqualWordCount from './untilUnigramsEqualWordCount';

// TODO: Rename
const debugTwo = pipe(
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
