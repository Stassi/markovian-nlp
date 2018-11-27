import {
  equals,
  length,
  pipe,
  until,
} from 'ramda';
import generateOne from './generateOne';

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
    generateOne(props),
  ],
});

const appendUntilGeneratedLimit = untilCountEqualsGeneratedLength(appendGeneratedSentence);

const generateMany = pipe(
  generatedInit,
  appendUntilGeneratedLimit,
);

export default generateMany;
