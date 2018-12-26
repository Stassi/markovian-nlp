const setDefaults = ({
  count = 1,
  format = true,
  generated = [],
  iterationLimit = 999,
  iterations = [],
  words = 15,
  ...props
}) => ({
  ...props,
  count,
  format,
  generated,
  iterationLimit,
  iterations,
  words,
});

export default setDefaults;
