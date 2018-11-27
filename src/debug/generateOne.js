import { pick, pipe } from 'ramda';

const relevantKeys = pick([
  'corpus',
  'iterationLimit',
  'seed',
  'words',
]);

const initializeProps = ({ ...props }) => ({
  ...props,
  iterations: 0,
  sentence: [],
});

const generateOne = pipe(
  relevantKeys,
  initializeProps,
  ({ ...props }) => {
    // TODO: Implement
    console.log(props);
    return 'DEBUG';
  },
);

export default generateOne;
