const restore = ({ savedSeed, ...props }) => ({
  ...props,
  seed: savedSeed,
});

export default restore;
