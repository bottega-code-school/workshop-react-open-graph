import * as React from "react";
import { useOpenGraph } from "./useOpenGraph";
import ReactPlayer from "react-player";

type Props = {
  url: string;
};
export const OpenGraph = ({ url }: Props) => {
  const { data } = useOpenGraph({
    url,
  });

  if (data) {
    const mediaPlayer = data?.video ? (
      <ReactPlayer
        url={data?.video}
        playing
        loop
        className="open-graph-media"
      />
    ) : data?.image ? (
      <img src={data?.image} className="open-graph-media" />
    ) : null;

    const siteName =
      data?.siteName?.length > 0 && data?.siteName !== data?.title
        ? `${data.siteName} | `
        : "";

    return (
      <div className="open-graph">
        {mediaPlayer}
        <a
          onClick={() => window.open(data?.url, "_blank")}
          className="og-container"
        >
          <div className="og-container-title">{data?.title}</div>

          {data.description?.length > 0 && (
            <div className="og-container-description">{data?.description}</div>
          )}

          <div className="og-container-secondary">
            {data?.favicon && (
              <img className="og-container-favicon" src={data?.favicon} />
            )}
            <div className="og-container-site-name">
              {siteName}
              {data?.siteHost}
            </div>
          </div>
        </a>
      </div>
    );
  } else {
    return null;
  }
};
