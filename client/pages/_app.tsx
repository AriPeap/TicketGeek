import "bootstrap/dist/css/bootstrap.css";
import type { AppProps, AppContext, AppInitialProps } from "next/app";
import React from "react";
import { buildClient } from "./api/build-client";
import App from "next/app";
import Header from "@/components/header";

type AppOwnProps = { currentUser: any };

export default function MyApp({
  Component,
  pageProps,
  currentUser,
}: AppProps & AppOwnProps) {
  return (
    <div>
      <Header currentUser={currentUser} />
      <div className="container">
        <Component currentUser={currentUser} {...pageProps} />
      </div>
    </div>
  );
}

MyApp.getInitialProps = async (
  context: AppContext
): Promise<AppOwnProps & AppInitialProps> => {
  try {
    const ctx = await App.getInitialProps(context);

    const client = buildClient(context.ctx);
    const {
      data: { currentUser },
    } = await client.get("api/users/currentuser");

    return { ...ctx, currentUser };
  } catch (error) {
    const ctx = await App.getInitialProps(context);
    return { ...ctx, currentUser: "null" };
  }
};
