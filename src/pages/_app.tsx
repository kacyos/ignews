import { SessionProvider as NextAuthSessionProvider } from "next-auth/react";
import { PrismicProvider } from "@prismicio/react";
import { repositoryName } from "../services/prismic";
import Link from "next/link";
import { PrismicPreview } from "@prismicio/next";
import { AppProps } from "next/app";
import { Header } from "../components/Header";

import "../styles/global.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <NextAuthSessionProvider session={pageProps.session}>
      <Header />
      <PrismicProvider
        internalLinkComponent={({ href, children, ...props }) => (
          <Link href={href}>
            <a {...props}>{children}</a>
          </Link>
        )}
      >
        <PrismicPreview repositoryName={repositoryName}>
          <Component {...pageProps} />
        </PrismicPreview>
      </PrismicProvider>
    </NextAuthSessionProvider>
  );
}

export default MyApp;
