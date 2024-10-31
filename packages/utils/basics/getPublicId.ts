// À changer si on veut changer le séparateur
const separator = "-";
////////////////////////////////////////////:

export const getPublicIdFirstPart = (userId: string, videosLength: number) => {
  return `${userId}${separator}${videosLength + 1}`;
};
export const getPublicIdFull = (
  id: string,
  type: "cv" | "avatar" | "video" | "logo" | "audio"
) => {
  if (type === "cv") return `${id}${separator}cv`;
  if (type === "avatar" || type === "logo") return `${id}${separator}image`;
  if (type === "video") return `${id}${separator}video`;
  else return `${id}${separator}audio`;
};
export const getUserIdFromPublicId = (publicId: string) =>
  publicId.split(`${separator}`)[0];
