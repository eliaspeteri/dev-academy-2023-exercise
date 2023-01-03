/* eslint-disable no-console */
export const info = (...params: unknown[]): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.log(...params);
  }
};

export const table = (...params: unknown[]): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.table(...params);
  }
};

export const error = (...params: unknown[]): void => {
  if (process.env.NODE_ENV !== 'test') {
    console.log('Error: ', ...params);
  }
};

export default { info, error, table };
