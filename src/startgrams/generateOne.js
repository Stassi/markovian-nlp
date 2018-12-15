import { pipe } from 'ramda';
import { evolveSeedProp } from '../random';

const toStartgram = ({
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

const generateOne = pipe(
  toStartgram,
  evolveSeedProp,
  toUnigramsHead,
);

export default generateOne;