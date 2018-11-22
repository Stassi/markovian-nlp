import {
  identity,
  ifElse,
  is,
} from 'ramda';

const applyToString = x => ifElse(
  is(String),
  x,
  identity,
);

export default applyToString;
