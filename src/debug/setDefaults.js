// TODO: Remove non-default parameters (i.e.: { generated })
const setDefaults = ({
  count = 1,
  format = true,
  generated = [],
  iterations = [],
  iterationLimit = 999999999,
  words = 15,
  ...props
}) => ({
  ...props,
  count,
  format,
  generated,
  iterations,
  iterationLimit,
  words,
});

export default setDefaults;
