export const updateLocalThemes = (
  value: { [key: string]: string },
  i?: number,
) => {
  const local = localStorage.getItem("themes");

  if (local && i !== undefined) {
    let parsed = [...JSON.parse(local)];
    // update
    parsed = parsed.map((p, index) => (index === i ? { ...p, ...value } : p));

    const stringified = JSON.stringify(parsed);

    localStorage.setItem("themes", stringified);

    return parsed;
  }
  return local;
};
