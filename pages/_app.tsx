import React from "react";
import { NextPage } from "next";
import "./styles/global.css";
import type { AppProps } from "next/app";
import { Layout } from "../components/layout";
import { Header } from "../components/layout/Header";

export type NextPageWithLayout<P = {}, IP = P> = NextPage<P, IP> & {
  getLayout?: (page: React.ReactElement) => React.ReactNode;
};

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout;
  if (getLayout) {
    return getLayout(<Component {...pageProps} />);
  }

  //auth layout
  const navBar = () => <Header />;
  const sideBar = <div> sideBar</div>;
  const footer = <div> footer</div>;
  return (
    //TODO for testing login and logout
    <Layout header={navBar} sidebar={sideBar} isAuth={false}>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
