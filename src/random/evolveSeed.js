import { prng } from 'implausible';

const evolveSeed = (seed) => prng({ seed });

export default evolveSeed;
