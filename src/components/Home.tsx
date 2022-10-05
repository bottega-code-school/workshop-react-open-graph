import * as React from "react";
import Layout from "./Layout";
import { OpenGraph } from "./OpenGraph";

const isValidUrl = (url: string) => {
  try {
    return Boolean(new URL(url));
  } catch (e) {
    return false;
  }
};

export default function Home() {
  const [url, setUrl] = React.useState("");
  const [ogUrl, setOgUrl] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();

    if (url?.length > 0 && isValidUrl(url)) {
      setOgUrl(url);
    } else {
      alert("Please enter a valid URL");
    }
  };

  return (
    <Layout>
      <div className="card-container">
        <form onSubmit={handleSubmit} className="card-container__form">
          <input
            type="text"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            placeholder="Paste a link here"
          />
          <button type="submit">Get Preview</button>
        </form>

        <div className="card-container__preview">
          <OpenGraph url={ogUrl} />
        </div>
      </div>
    </Layout>
  );
}
