import {
  either,
  ifElse,
  join,
  pipe,
  splitAt,
  toUpper,
  whereEq,
} from 'ramda';
import unigramsPropIsEmpty from './propIsEmpty';

const formattingDisabled = whereEq({ format: false });
const eitherFormattingDisabledOrUnigramsPropIsEmpty = either(
  formattingDisabled,
  unigramsPropIsEmpty,
);

const nullifyUnigrams = ({ ...props }) => ({ ...props, unigrams: null });

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

const format = ifElse(
  eitherFormattingDisabledOrUnigramsPropIsEmpty,
  nullifyUnigrams,
  formatUnigrams,
);

export default format;
