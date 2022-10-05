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

const serializeOpenGraph = (
  data: OpenGraphResponse
): OpenGraphState["data"] => {
  const description =
    data.openGraph.description ||
    data.hybridGraph.description ||
    data.htmlInferred.description;
  const title =
    data.openGraph.title || data.hybridGraph.title || data.htmlInferred.title;
  const siteName =
    data.openGraph.site_name ||
    data.hybridGraph.site_name ||
    data.htmlInferred.site_name;
  const favicon = data.hybridGraph.favicon || data.htmlInferred.favicon;
  const url =
    data.url ||
    data.openGraph.url ||
    data.hybridGraph.url ||
    data.htmlInferred.url;
  const image =
    data.openGraph.image?.url ||
    data.hybridGraph.image ||
    data.htmlInferred.image;
  const video = data.openGraph.video?.url || data.hybridGraph.video;
  const siteHost = new URL(url).hostname;

  return {
    description,
    favicon,
    image,
    video,
    siteName,
    title,
    url,
    siteHost,
  };
};
type Args = {
  url: string;
};
export const useOpenGraph = ({ url }: Args): OpenGraphState => {
  const [data, setData] = React.useState<OpenGraphState["data"]>(undefined);

  // ensure we only fetch once if the url changes
  React.useEffect(() => {
    if (url?.length > 0) {
      getData();
    }

    return () => {
      setData(undefined);
    };
  }, [url]);

  const getData = () => {
    const site = encodeURIComponent(url);
    const ENDPOINT = `https://opengraph.io/api/1.1/site/${site}?accept_lang&app_id=${APP_ID}`;
    fetch(ENDPOINT)
      .then((response) => response.json())
      .then((data: OpenGraphResponse) => {
        console.log("og res", data);

        if (data.hybridGraph || data.openGraph || data.htmlInferred) {
          setData(serializeOpenGraph(data));
        } else if (data?.error?.message) {
          alert(data.error.message);
        }
      })
      .catch((_error) => {});
  };

  return {
    data,
  };
};
