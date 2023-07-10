// Copy pasted from @mui/internal-waterfall

interface RetryOptions {
  retries?: number;
}

const retry = async (
  tryFunction: (params: {
    tries: number;
    bail: (err: any) => void;
  }) => Promise<any>,
  options: RetryOptions = {},
) => {
  const { retries = 3 } = options;

  let tries = 0;
  let output = null;
  let exitErr = null;

  const bail = (err) => {
    exitErr = err;
  };

  while (tries < retries) {
    tries += 1;
    try {
      output = await tryFunction({ tries, bail });
      break;
    } catch (err) {
      if (tries >= retries) {
        throw err;
      }
    }
  }

  if (exitErr) {
    throw exitErr;
  }

  return output;
};

export default retry;
