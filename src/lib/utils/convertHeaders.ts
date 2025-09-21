export const convertHeaders = (rows: HeaderRow[]) => {
  const h = new Headers();
  for (const r of rows) {
    if (!r.enabled) continue;
    const name = r.key.trim();
    if (!name) continue;
    h.append(name, r.value ?? '');
  }
  return h;
};
