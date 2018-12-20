import {
  join,
  pipe,
  splitAt,
  toUpper,
} from 'ramda';

const capitalizeFirstLetter = pipe(
  splitAt(1),
  ([ head, ...props ]) => [toUpper(head), ...props],
  join(''),
);

export default capitalizeFirstLetter;
