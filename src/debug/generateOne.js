import { pipe } from 'ramda';
import filterEndgrams from './filterEndgramsWhenRequired';
import startgram from './startgram';

// TODO: Rename
const debug = pipe(
  filterEndgrams,
  startgram,
  ({
    ...props
  }) => {
    // TODO: Loop via untilUnigramsLengthEqualsWordCount
    // TODO: ifElse (startgram || bigram)
    // TODO:   || nextGram(previousGram ? bigram : startgram)
    // TODO: Conditional format, then join
    const res = {
      ...props,
    };
    console.log(res);
    return res;
  },
);

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
