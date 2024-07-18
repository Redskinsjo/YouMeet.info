import { Avatar } from "@youmeet/gql/generated";
import { dev } from "@/app/_functions/imports";
import { isAvatar } from "@youmeet/types/TypeGuards";

export default (file: Avatar | undefined | null): string | undefined => {
  if (isAvatar(file)) {
    if (file.subtitledUrl) return file.subtitledUrl;
    else if (dev) return file.url as string;
    else return file.secure_url as string;
  }
  return undefined;
};
