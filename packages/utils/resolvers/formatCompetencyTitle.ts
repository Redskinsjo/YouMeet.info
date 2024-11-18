const removeBars = (title: string) =>
  title
    ?.split("/")
    .map((l) => l.trim())
    .join(" ");

export const formatForDb = (title: string) =>
  removeBars(title).replaceAll("_", " ").replaceAll("+", " ");

export const formatForUrl = (title: string) =>
  removeBars(title)?.split(" ").join("+");

export const separateFromExtension = (str: string) => str.replaceAll(" ", "-");
