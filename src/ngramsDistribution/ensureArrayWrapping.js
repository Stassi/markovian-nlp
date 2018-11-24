import {
  is,
  of,
  unless,
} from 'ramda';

const isArray = is(Array);
const unlessArray = unless(isArray);
const ensureArrayWrapping = unlessArray(of);

export default ensureArrayWrapping;
