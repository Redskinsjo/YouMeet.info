import { Avatar } from "@youmeet/gql/generated";
import { dev } from "@youmeet/functions/imports";
import { isAvatar } from "@youmeet/types/TypeGuards";

function setFileUrl(
  file: Avatar | undefined | null,
  video?: true | undefined,
  str?: string
): string | undefined {
  let url;
  if (str) return str;
  if (file && isAvatar(file)) {
    // if (file.subtitledUrl) return file.subtitledUrl;
    // else if (dev) url = file.url as string;
    if (dev) url = file.url as string;
    else url = file.secure_url as string;

    const regex = /(?<=video\/upload\/).+(?=\/youmeet-official)/;
    const match = url.match(regex);
    if (match && video) {
      url = url.replace(match[0], "q_auto,vc_auto");
      const split = url.split(".");
      const lastEl = split[split.length - 1];
      const index = url.lastIndexOf(lastEl);
      url = url.slice(0, index) + "webm";
    }
    return url;
  }
  return undefined;
}

export default setFileUrl;
