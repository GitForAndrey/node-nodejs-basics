const parseEnv = () => {
  let env = process.env;
  let selectRss = Object.entries(env)
    .filter(([key]) => key.startsWith("RSS_"))
    .map(([key, value], index) => {
      return `${key}=${value}`;
    });
  let result = selectRss.join("; ");

  console.log(result);
};

parseEnv();
