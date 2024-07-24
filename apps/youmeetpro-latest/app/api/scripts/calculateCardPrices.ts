import BetaCandidate from "@youmeet/models/betaCandidates";
import BetaDetails from "@youmeet/models/betaDetails";
import BetaUser from "@youmeet/models/betaUsers";
import Reference from "@youmeet/models/references";
import Video from "@youmeet/models/videos";
import process from "process";
import { DocumentType } from "@typegoose/typegoose";
import { BetaUserSchema } from "@youmeet/models/betaUsers";
import { VideoSchema } from "@youmeet/models/videos";

const getPrincipalVideoForScript = (videos: DocumentType<VideoSchema>[]) => {
  if (videos && videos.length > 0) {
    const principal = videos
      .filter((v) => v)
      .find((video) => (video as DocumentType<VideoSchema>).principal);
    if (principal) return principal;
    return videos[0];
  } else return undefined;
};

const NOT_AFFECTED = 0;

enum IMPORTANCES {
  VERY_LOW = 1,
  LOW = 2,
  MEDIUM = 3,
  HIGH = 5,
  VERY_HIGH = 30,
}

type Fields =
  | "age"
  | "avatars"
  | "references"
  | "description"
  | "phone"
  | "email"
  | "languages"
  | "linkedin"
  | "video";

const isHidden = (field: Fields, user: DocumentType<BetaUserSchema>) =>
  user.hiddenFields?.includes(field);

const getRefsPrice = async (user?: DocumentType<BetaUserSchema>) => {
  if (user) {
    const references = await Reference.find({ userId: user._id });

    if (references) {
      return IMPORTANCES.MEDIUM;
      // let total = 0;
      // for (let i = 0; i < references.length; i++) {
      //   total += IMPORTANCES.LOW;
      //   if (!references[i]?.valid) total += IMPORTANCES.LOW;
      // }
      // return total;
    }
  }
  return NOT_AFFECTED;
};

export const setPrice = async (
  field: Fields,
  user?: DocumentType<BetaUserSchema>
) => {
  if (!user) return NOT_AFFECTED;
  switch (field) {
    // age: VERY_LOW
    case "age": {
      if (!isHidden("age", user) && user.age) {
        return IMPORTANCES.VERY_LOW;
      }
      return NOT_AFFECTED;
    }
    // description: LOW
    case "description": {
      if (!isHidden("description", user) && user?.description) {
        return IMPORTANCES.VERY_LOW;
      }
      return NOT_AFFECTED;
    }
    // avatars: MEDIUM
    case "avatars": {
      const candidate = await BetaCandidate.findOne({ userId: user._id });
      if (candidate?.avatars && candidate?.avatars?.length > 0) {
        return IMPORTANCES.LOW;
      }
      return NOT_AFFECTED;
    }
    // references: LOW, double if NOT VALID reference
    case "references": {
      return await getRefsPrice(user);
    }
    // phone: HIGH
    case "phone": {
      const details = await BetaDetails.findOne({ userId: user._id });
      if (
        !isHidden("phone", user) &&
        details?.phone &&
        details.phone.code &&
        details.phone.number
      ) {
        return IMPORTANCES.LOW;
      }
      return NOT_AFFECTED;
    }
    // email: MEDIUM
    case "email": {
      if (!isHidden("email", user) && user?.email) {
        return IMPORTANCES.LOW;
      }
      return NOT_AFFECTED;
    }
    // languages: VERY_LOW
    case "languages": {
      if (
        !isHidden("languages", user) &&
        user?.languages &&
        user.languages.length > 0
      ) {
        return IMPORTANCES.VERY_LOW;
      }
      return NOT_AFFECTED;
    }
    // linkedin: LOW
    case "linkedin": {
      if (!isHidden("linkedin", user) && user?.linkedinProfileId) {
        return IMPORTANCES.LOW;
      }
      return NOT_AFFECTED;
    }
    // video: VERY_HIGH
    case "video": {
      let video;
      const videos = await Video.find({ userId: user._id });
      if (videos) {
        video = getPrincipalVideoForScript(videos);
        const videoFile = video?.file;
        if (videoFile && videoFile.secure_url) {
          return IMPORTANCES.VERY_HIGH;
        }
      }
      return NOT_AFFECTED;
    }
    default: {
      return NOT_AFFECTED;
    }
  }
};

const calculatePrice = async (user: DocumentType<BetaUserSchema>) => {
  let price = 0;

  price += await setPrice("video", user);
  if (price === 30) return price;
  else {
    price += await setPrice("age", user);
    price += await setPrice("avatars", user);
    price += await setPrice("references", user);
    price += await setPrice("description", user);
    price += await setPrice("phone", user);
    price += await setPrice("email", user);
    price += await setPrice("languages", user);
    price += await setPrice("linkedin", user);
  }

  price = Number(price.toFixed(2));

  return price;
};

(async () => {
  const users = await BetaUser.find({ user: true });

  for (let i = 0; i < users.length; i++) {
    const user = users[i];
    const price = await calculatePrice(user);
    console.log(price, "pour: ", user.fullname);
    await BetaUser.findByIdAndUpdate(user._id, { cardPrice: price });
  }

  process.exit();
})();
