import { pipe } from 'ramda';

const defaults = ({
  count = 1,
  format = true,
  words = 15,
  ...props
}) => ({
  ...props,
  count,
  format,
  words,
});

const iterationsInit = ({ ...props }) => ({
  ...props,
  iterations: 0,
  maxIterations: 999999999,
});

const sentences = pipe(
  defaults,
  iterationsInit,
  (x) => {
    // TODO: Implement
    return x;
  },
);

export default sentences;
