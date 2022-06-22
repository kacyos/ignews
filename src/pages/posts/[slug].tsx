import { GetServerSideProps } from "next";
import { getSession } from "next-auth/react";
import Head from "next/head";
import { RichText } from "prismic-dom";
import React from "react";
import { getPrismicClient } from "../../services/prismic";

interface PostProps {
  post: {
    slug: string;
    title: string;
    content: string;
    updatedAt: string;
  };
}

export default function Post({ post }: PostProps) {
  console.log(post);
  return (
    <>
      <Head>
        <title>{post?.title} | Ignews</title>
      </Head>
      <main>
        <article>
          <h1>{post?.title}</h1>
          <time>{post?.updatedAt}</time>
        </article>
        <div dangerouslySetInnerHTML={{ __html: post?.content }} />
      </main>
    </>
  );
}

export const getServeSideProps: GetServerSideProps = async ({
  req,
  params,
}) => {
  const session = await getSession({ req });
  const { slug } = params;

  const prismic = getPrismicClient(req);

  const response = await prismic.getByUID("publication", slug.toString());

  const post = {
    slug: response.uid,
    title: RichText.asText(response.data.Title),
    content: RichText.asHtml(response.data.Content),
    updatedAt: new Date(response.last_publication_date).toLocaleDateString(
      "pt-BR",
      {
        day: "2-digit",
        month: "long",
        year: "numeric",
      }
    ),
  };

  return {
    props: { post },
  };
};
