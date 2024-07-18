export const formatReturnTo = (returnTo: string) => {
  let result = returnTo ? decodeURIComponent(returnTo) : "";

  if (result.includes("%")) result = decodeURIComponent(result);
  if (result.includes("%")) result = decodeURIComponent(result);

  if (result[0] === "/") result = result.slice(1);
  return result;
};
