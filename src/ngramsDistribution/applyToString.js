import {
  identity,
  ifElse,
  is,
  map,
  pipe,
} from 'ramda';

// TODO: Replace with whenString (using R.when)
export const applyToString = x => ifElse(
  is(String),
  x,
  identity,
);

// TODO: Replace with mapWhenString
export const applyToStrings = pipe(
  applyToString,
  map,
);
