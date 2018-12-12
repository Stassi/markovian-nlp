import { pipe } from 'ramda';
import { evolveSeedProp } from '../random';

const applySeedProp = ({
  seed,
  unseededStartgram,
  ...props
}) => ({
  ...props,
  seed,
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
