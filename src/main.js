const test = () => ({ test: true });

export default function main() {
  return {
    ...test(),
  };
}
