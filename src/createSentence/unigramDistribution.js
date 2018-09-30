import { prop } from 'ramda';

// TODO: Consider pluralization
const unigramDistribution = distribution => unigram => prop(unigram, distribution);

export default unigramDistribution;
