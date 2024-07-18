export const insertSearchQ = (name: string, value: any) =>
  !!value ? `${name}=${value}` : "";
