// TODO: Implement
const debug = () => 'DEBUG';

const bigram = ({
  unigrams,
  ...props
}) => {
  const res = {
    ...props,
    unigrams: [
      ...unigrams,
      debug(),
    ],
  };
  return res;
};

export default bigram;
