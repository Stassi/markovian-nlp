import { pipe } from 'ramda';
import generateStartgram from './startgram';

// TODO: Implement, rename
const debug = pipe(
  generateStartgram,
  ({
    startgram,
    unigrams = [],
    ...props
  }) => {
    // TODO: Implement filterEndgrams[whenEndgram] at start of unigram loop
    // TODO: Loop via untilUnigramsLengthEqualsWordCount
    // TODO: ifElse (startgram || bigram)
    // TODO:   || nextGram(previousGram ? bigram : startgram)
    // TODO: Conditional format, then join
    const res = {
      ...props,
      startgram,
      unigrams,
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
