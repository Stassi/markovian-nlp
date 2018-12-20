import { isEmpty, propSatisfies } from 'ramda';

const propIsEmpty = propSatisfies(isEmpty, 'unigrams');

export default propIsEmpty;
