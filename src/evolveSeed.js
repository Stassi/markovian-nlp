import Chance from 'chance';

const evolveSeed = seed => Chance(seed).integer();

export default evolveSeed;
