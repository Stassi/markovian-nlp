import { sample } from 'implausible';
import { zipObj } from 'ramda';

const weighted = ({ values, weights }) => seed => sample({
  seed,
  collection: zipObj(values, weights),
});

export default weighted;
