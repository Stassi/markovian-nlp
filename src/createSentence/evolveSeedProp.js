import { evolveSeed } from '../random';

const evolveSeedProp = ({ seed, ...props }) =>
  ({ ...props, seed: evolveSeed(seed) });

export default evolveSeedProp;
