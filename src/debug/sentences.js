import {
  equals,
  length,
  pipe,
  until,
} from 'ramda';

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

// TODO: Rename, composition, complete implementation
const debug = until(
  ({ count, generated }) => equals(
    count,
    length(generated),
  ),
  ({ generated, ...props }) => ({
    ...props,
    generated: [
      ...generated,
      'DEBUG',
    ]
  })
);

// TODO: Init once per sentence (from count)
const iterationsInit = ({ ...props }) => ({ ...props, iterations: 0 });

const sentences = pipe(
  defaults,
  generatedInit,
  debug,
  iterationsInit,
  (x) => {
    // TODO: Implement
    return x;
  },
);

export default sentences;
