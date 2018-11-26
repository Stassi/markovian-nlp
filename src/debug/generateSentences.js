import {
  equals,
  length,
  pipe,
  until,
} from 'ramda';
import generateSentence from './generateSentence';

const generatedInit = ({ ...props }) => ({ ...props, generated: [] });

const countEqualsGeneratedLength = ({ count, generated }) => equals(
  count,
  length(generated),
);

const untilCountEqualsGeneratedLength = until(countEqualsGeneratedLength);

const appendGeneratedSentence = ({ generated, ...props }) => ({
  ...props,
  generated: [
    ...generated,
    generateSentence(props),
  ],
});

const appendUntilGeneratedLimit = untilCountEqualsGeneratedLength(appendGeneratedSentence);

const generateSentences = pipe(
  generatedInit,
  appendUntilGeneratedLimit,
);

export default generateSentences;
