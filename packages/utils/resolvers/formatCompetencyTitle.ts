const removeBars = (title: string) =>
  title
    ?.split("/")
    .map((l) => l.trim())
    .join(" ");

export const formatForDb = (title: string) =>
  removeBars(title)?.split("-").join(" ");

export const formatForUrl = (title: string) =>
  removeBars(title)?.split(" ").join("+");

export const inFormatForUrl = (str: string) => str.replaceAll(" ", "-");

export const inFormatForDb = (str: string) => str.replaceAll("_", " ");
