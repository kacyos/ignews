import * as prismic from "@prismicio/client";

const endPoint = prismic.getRepositoryEndpoint("ignews-c");

export const getPrismicClient = prismic.createClient(endPoint, {
  accessToken: process.env.PRISMIC_ACCESS_TOKEN,
});
