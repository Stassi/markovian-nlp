import {
  add,
  mergeDeepWith,
  reduce,
} from 'ramda';

const additiveMerge = reduce(
  mergeDeepWith(add),
  {},
);

export default additiveMerge;
