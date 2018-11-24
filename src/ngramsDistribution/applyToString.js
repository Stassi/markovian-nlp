import {
  identity,
  ifElse,
  is,
  map,
  pipe,
} from 'ramda';

// TODO: Replace with whenString (using R.when)
const applyToString = x => ifElse(
  is(String),
  x,
  identity,
);

// TODO: Replace with mapWhenString
const applyToStrings = pipe(
  applyToString,
  map,
);

export default applyToStrings;
