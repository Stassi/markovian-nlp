import { prop } from 'ramda';

const findUnigram = distribution => unigram => prop(unigram, distribution);

export default findUnigram;
