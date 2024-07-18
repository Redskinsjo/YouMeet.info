// À changer si on veut changer le séparateur
const separator = "_";
////////////////////////////////////////////:

export const getPublicIdFirstPart = (userId: string, videosLength: number) => {
  return `${userId}${separator}${videosLength + 1}`;
};
export const getPublicIdFull = (
  id: string,
  type: "cv" | "avatar" | "video",
) => {
  if (type === "cv") return `${id}${separator}cv`;
  if (type === "avatar") return `${id}${separator}image`;
  return `${id}${separator}video`;
};
export const getUserIdFromPublicId = (publicId: string) =>
  publicId.split(`${separator}`)[0];
