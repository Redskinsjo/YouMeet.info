export const linkedinIdRegex = new RegExp(
  /(?<=linkedin\.com\/in\/)[^\/]{1,}/,
  "gm",
);

export const linkedinPageRegex = new RegExp(
  /(?<=linkedin\.com\/company\/)[^\/]{1,}/,
  "gm",
);

export const getLinkedinUrlFromId = (id: string) => {
  if (linkedinIdRegex.test(id)) return id;
  else return `https://www.linkedin.com/in/${id}`;
};
export const getLinkedinUrlFromPage = (page: string) => {
  if (linkedinPageRegex.test(page)) return page;
  else return `https://www.linkedin.com/company/${page}`;
};

export const getLinkedinIdFromUrl = (url: string) => {
  const regex = linkedinIdRegex;
  if (regex.test(url)) {
    const id = url.match(regex);
    if (id) return id[0];
  } else {
    return url;
  }
  return "";
};

export const getLinkedinPageFromUrl = (url: string) => {
  const regex = linkedinPageRegex;
  if (regex.test(url)) {
    const id = url.match(regex);
    if (id) return id[0];
  } else {
    return url;
  }
  return "";
};
