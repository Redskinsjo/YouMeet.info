export const formatForDb = (title: string) => title?.split("-").join(" ");

export const formatForUrl = (title: string) => title?.split(" ").join("+");

export const inFormatForUrl = (str: string) => str.replaceAll(" ", "-");

export const inFormatForDb = (str: string) => str.replaceAll("_", " ");
