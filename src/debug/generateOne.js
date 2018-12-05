import findStartgram from './findStartgram';

// TODO: Implement, rename
const debug = ({
  corpus,
  seed,
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
    corpus,
    seed,
    unigrams,
    // TODO: Piped partial application
    debug: findStartgram(corpus)(seed),
  };
  console.log(res);
  return res;
};

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
