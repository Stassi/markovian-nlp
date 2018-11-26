const save = ({ seed, ...props }) => ({
  ...props,
  seed,
  savedSeed: seed,
});

export default save;
