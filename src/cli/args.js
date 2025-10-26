const parseArgs = () => {
  let arg = process.argv;
  const getArg = arg.reduce((acc, current, index) => {
    if (current.startsWith("--")) {
      const val = current.substring(2);
      const next = arg[index + 1];
      if (next) {
        const formattedPair = `${val} is ${next}`;
        return acc + (acc.length ? ", " : "") + formattedPair;
      }
    }
    return acc;
  }, "");

  console.log(getArg);
};

parseArgs();
