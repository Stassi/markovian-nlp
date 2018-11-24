import {
  is,
  map,
  pipe,
  when,
} from 'ramda';
import toDistribution from './toDistribution';

const isString = is(String);
const whenString = when(isString);
const mapWhenString = pipe(whenString, map);
const stringsToDistributions = mapWhenString(toDistribution);

export default stringsToDistributions;
