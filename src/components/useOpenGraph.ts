import * as React from "react";

const APP_ID = "5133bf89-f859-43e5-b8b6-0144ae0dc4af";

type OpenGraphResponse = {
  error?: {
    message?: string;
  };
  htmlInferred: {
    description?: string;
    title: string;
    type: string;
    videoType?: string;
    url: string;
    favicon: string;
    images?: string[];
    image?: string;
    site_name?: string;
  };
  hybridGraph: {
    description?: string;
    title: string;
    type: string;
    image: string;
    video?: string;
    videoType: string;
    favicon?: string;
    site_name?: string;
    url?: string;
    videoWidth?: number;
    videoHeight?: number;
  };
  openGraph: {
    description?: string;
    title?: string;
    site_name?: string;
    image?: {
      url?: string;
      height?: string;
      width?: string;
    };
    video?: {
      url?: string;
      height?: string;
      width?: string;
    };
    url?: string;
  };
  url: string;
};

export type OpenGraphState = {
  data?: {
    description?: string;
    favicon?: string;
    image?: string;
    video?: string;
    siteName?: string;
    title?: string;
    url: string;
    siteHost?: string;
  };
};
