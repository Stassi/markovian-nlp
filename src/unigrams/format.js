import {
  join,
  or,
  pipe,
  splitAt,
  toUpper,
  unless,
  whereEq,
} from 'ramda';
import unigramsPropIsEmpty from './propIsEmpty';

const capitalizeFirstLetter = pipe(
  splitAt(1),
  ([ head, ...props ]) => [toUpper(head), ...props],
  join(''),
);

const capitalizeUnigramsHead = ({
  unigrams: [
    firstUnigram,
    ...remainingUnigrams
  ],
  ...props
}) => ({
  ...props,
  unigrams: [
    capitalizeFirstLetter(firstUnigram),
    ...remainingUnigrams,
  ],
});

const joinBySpace = join(' ');
const joinUnigramsBySpace = ({
  unigrams,
  ...props
}) => ({
  ...props,
  unigrams: joinBySpace(unigrams),
});

const punctuateUnigrams = ({
  unigrams,
  ...props,
}) => ({
  ...props,
  unigrams: `${unigrams}.`,
});

const formatUnigrams = pipe(
  capitalizeUnigramsHead,
  joinUnigramsBySpace,
  punctuateUnigrams,
);

const formattingDisabled = whereEq({ format: false });
const formattingDisabledOrUnigramsPropIsEmpty = or(
  formattingDisabled,
  unigramsPropIsEmpty,
);
const unlessFormattingDisabledOrUnigramsPropIsEmpty = unless(formattingDisabledOrUnigramsPropIsEmpty);
const format = unlessFormattingDisabledOrUnigramsPropIsEmpty(formatUnigrams);

export default format;
