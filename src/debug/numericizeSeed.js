import { is, unless } from 'ramda';
import { evolveSeedProp } from '../random';

const isNumber = is(Number);
const numericSeed = ({ seed }) => isNumber(seed);
const unlessNumericSeed = unless(numericSeed);
const numericizeSeed = unlessNumericSeed(evolveSeedProp);

export default numericizeSeed;
