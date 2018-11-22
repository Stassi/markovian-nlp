import {
  identity,
  ifElse,
  is,
  map,
  pipe,
} from 'ramda';

export const applyToString = x => ifElse(
  is(String),
  x,
  identity,
);

export const applyToStrings = pipe(
  applyToString,
  map,
);
