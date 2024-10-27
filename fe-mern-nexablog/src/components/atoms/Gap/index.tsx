type GapProps = {
  width?: number;
  height?: number;
};

const Gap = ({ width, height }: GapProps) => {
  return <div style={{ width, height }} />;
};

export default Gap;
