export const resolveUrl = (arg: string) => {
  const hasProtocol = (arg: string) => /^https?:\/\//i.test(arg);

  if (hasProtocol(arg)) {
    try {
      return new URL(arg).toString();
    } catch {
      return null;
    }
  }
  return null;
};
