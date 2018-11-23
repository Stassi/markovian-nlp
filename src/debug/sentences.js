import { pipe } from 'ramda';

const defaults = ({
  count = 1,
  format = true,
  iterationLimit = 999999999,
  words = 15,
  ...props
}) => ({
  ...props,
  count,
  format,
  iterationLimit,
  words,
});

const generatedInit = ({ ...props }) => ({ ...props, generated: [] });

// TODO: Init once per sentence (from count)
const iterationsInit = ({ ...props }) => ({ ...props, iterations: 0 });

const sentences = pipe(
  defaults,
  generatedInit,
  iterationsInit,
  (x) => {
    // TODO: Implement
    return x;
  },
);

export default sentences;
