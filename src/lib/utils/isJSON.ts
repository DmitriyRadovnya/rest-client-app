export const isJSON = (arg: string) => {
  try {
    if (arg.trim() === '') return true;
    JSON.parse(arg);
    return true;
  } catch {
    return false;
  }
};
