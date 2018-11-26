export const save = ({ seed, ...props }) => ({
  ...props,
  seed,
  savedSeed: seed,
});

export const restore = ({ savedSeed, ...props }) => ({
  ...props,
  seed: savedSeed,
});
