import { prop } from 'ramda';

const unigramDistribution = distribution => unigram => prop(unigram, distribution);

export default unigramDistribution;
