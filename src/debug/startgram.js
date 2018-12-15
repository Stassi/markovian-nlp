import { pipe } from 'ramda';
import { evolveSeedProp } from '../random';

// TODO: Rename
const applySeedProp = ({
  seed,
  unseededStartgram,
  ...props
}) => ({
  ...props,
  seed,
  unseededStartgram,
  startgram: unseededStartgram(seed),
});

const toUnigramsHead = ({
  startgram,
  ...props,
}) => ({
  ...props,
  unigrams: [startgram]
});

const startgram = pipe(
  applySeedProp,
  evolveSeedProp,
  toUnigramsHead,
);

export default startgram;
