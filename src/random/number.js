import Chance from 'chance';

const number = seed => Chance(seed).integer();

export default number;
