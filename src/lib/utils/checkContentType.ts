export const checkContentType = (arg: HeaderRow[]): HeaderRow[] => {
  const index = arg.findIndex(
    (item) => item.enabled && item.key.toLowerCase() === 'content-type'
  );

  if (index === -1) {
    return [
      ...arg,
      { key: 'Content-Type', value: 'application/json', enabled: true },
    ];
  }

  const current = arg[index];

  if ((current.value || '').toLowerCase() !== 'application/json') {
    const next = [...arg];
    next[index] = {
      ...current,
      value: 'application/json',
    };
    return next;
  }

  return arg;
};
