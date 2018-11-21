import {
  identity,
  ifElse,
  is,
} from 'ramda';

const applyToString = fn => ifElse(
  is(String),
  fn,
  identity,
);

export default applyToString;
