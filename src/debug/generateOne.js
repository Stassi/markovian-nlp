// TODO: Implement, rename
const debug = () => 'DEBUG DEBUG DEBUG';

const generateOne = ({
  generated,
  ...props
}) => ({
  ...props,
  generated: [
    ...generated,
    debug(),
  ],
});

export default generateOne;
