import { uri } from "@youmeet/functions/imports";
import { getOffersParams, getUsersParams } from "@youmeet/functions/request";
import { BetaUser, Offer } from "@youmeet/gql/generated";

export default async function sitemap(): Promise<any> {
  const offers = (await getOffersParams<Offer[]>()) as Offer[];
  const users = (await getUsersParams<BetaUser[]>({
    data: {
      user: true,
      isVideo: true,
    },
  })) as BetaUser[];

  return [
    {
      url: `${uri}`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 1,
    },
    {
      url: `${uri}/se-connecter`,
      lastModified: new Date(),
      changeFrequency: "monthly",
      priority: 0.5,
    },
    {
      url: `${uri}/offres`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${uri}/blog`,
      lastModified: new Date(),
      changeFrequency: "daily",
      priority: 1,
    },
    {
      url: `${uri}/le-produit/mise-en-relation`,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 0.8,
    },
  ].concat(
    offers.map((offer) => ({
      url: `${uri}/offres/${offer.slug}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    })) as any,
    users.map((user) => ({
      url: `${uri}/on/${user.uniqueName}`,
      lastModified: new Date(),
      changeFrequency: "always",
      priority: 1,
    })) as any
  );
}
