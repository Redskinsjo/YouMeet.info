"use client";
import { useState } from "react";
import PublicProfileSlider from "./PublicProfileSlider";
import { BetaCandidate, BetaUser } from "@youmeet/gql/generated";
import ProfileImage from "../ProfileImage";

export default function ProfileAvatar({ profil }: { profil?: BetaUser }) {
  const [shouldSlider, setShouldSlider] = useState<boolean>(false);

  return shouldSlider ? (
    <PublicProfileSlider
      candidate={profil?.candidate}
      setShouldSlider={setShouldSlider}
    />
  ) : (
    <ProfileImage
      accountCandidate={profil?.candidate as BetaCandidate | undefined}
      profil={profil}
      setShouldSlider={setShouldSlider}
    />
  );
}
