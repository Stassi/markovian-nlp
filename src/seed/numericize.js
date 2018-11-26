import { is, unless } from 'ramda';
import evolve from './evolve';

const isNumber = is(Number);
const numericSeed = ({ seed }) => isNumber(seed);
const unlessNumericSeed = unless(numericSeed);
const numericize = unlessNumericSeed(evolve);

export default numericize;
