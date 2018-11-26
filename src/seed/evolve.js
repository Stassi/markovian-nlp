import { number as randomNumber } from '../random';

const evolve = ({ seed, ...props }) => ({
  ...props,
  seed: randomNumber(seed),
});

export default evolve;
