import evolveSeed from './evolveSeed';

const evolveSeedProp = ({ seed, ...props }) =>
  ({ ...props, seed: evolveSeed(seed) });

export default evolveSeedProp;
