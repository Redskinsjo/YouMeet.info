import { MouseEventHandler } from "react";

export interface CustomIconProps {
  onClick?: MouseEventHandler<SVGElement>;
  name: CustomIconName;
  newStyles?: { [key: string]: string | number };
  onlyIcon?: true;
  disabled?: boolean;
  newClasses?: string;
}

export enum CustomIconName {
  email = "email",
  dislike = "dislike",
  like = "like",
  search = "search",
  stats = "stats",
  interview = "interview",
  share = "share",
  file = "file",
}
