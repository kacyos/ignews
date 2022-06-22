import * as prismic from "@prismicio/client";
import { enableAutoPreviews } from "@prismicio/next";

export const endPoint = prismic.getRepositoryEndpoint("ignews-c");
export const repositoryName = prismic.getRepositoryName(endPoint);

export function getPrismicClient(req?: unknown) {
  const client = prismic.createClient(endPoint, {
    accessToken: process.env.PRISMIC_ACCESS_TOKEN,
  });

  enableAutoPreviews({
    client,
    req,
  });

  return client;
}
