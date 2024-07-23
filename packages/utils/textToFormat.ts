export const isSuspensionPoint = (
  text: string,
  i: number
): false | { end: number } => {
  let end = i;
  const followedBy =
    text[i + 1] === "." || (text[i + 1] === "." && text[i + 2] === ".");
  const wrappedBy =
    text[i - 1] === "." ||
    text[i + 1] === "." ||
    (text[i - 1] === "." && text[i + 1] === ".");
  const precededBy =
    text[i - 1] === "." || (text[i - 1] === "." && text[i - 2] === ".");

  const condition = text[i] === "." && (followedBy || wrappedBy || precededBy);

  if (condition) {
    if (followedBy) {
      if (text[i + 2] === ".") end = i + 2;
      else end = i + 1;
    } else end = i;
  }

  return condition ? { end } : false;
};

export const isFakePoint = (text: string, i: number) => {
  const letter = text[i + 1];
  if (!letter) return false;
  const notFollowedBy =
    letter.charCodeAt(0) !== 10 && letter.charCodeAt(0) !== 32;

  const condition = text[i] === "." && notFollowedBy;

  return condition;
};

export const isFakeDash = (text: string, i: number) => {
  const wrappedBy = text[i + 1] !== " " && text[i - 1] !== " ";

  const condition = text[i] === "-" && wrappedBy;

  return condition;
};
