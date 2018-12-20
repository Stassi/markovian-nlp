import { not, pipe } from 'ramda';
import propIsEmpty from './propIsEmpty';

const propsIsNotEmpty = pipe(
  propIsEmpty,
  not,
);

export default propsIsNotEmpty;
