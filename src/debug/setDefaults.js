const setDefaults = ({
  count = 1,
  format = true,
  iterationLimit = 999999999,
  words = 15,
  ...props
}) => ({
  ...props,
  count,
  format,
  iterationLimit,
  words,
});

export default setDefaults;
