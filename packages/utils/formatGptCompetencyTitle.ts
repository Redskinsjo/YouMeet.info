export const formatForDb = (title: string) => title?.split("-").join(" ");

export const formatForUrl = (title: string) => title?.split(" ").join("-");
