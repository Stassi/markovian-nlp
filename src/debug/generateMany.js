import {
  equals,
  length,
  until,
} from 'ramda';
import generateOne from './generateOne';

const countEqualsGeneratedLength = ({ count, generated }) => equals(
  count,
  length(generated),
);

const untilCountEqualsGeneratedLength = until(countEqualsGeneratedLength);
const generateMany = untilCountEqualsGeneratedLength(generateOne);

export default generateMany;
