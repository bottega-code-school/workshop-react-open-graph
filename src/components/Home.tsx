import * as React from "react";
import Layout from "./Layout";

export default function Home() {
  const [url, setUrl] = React.useState("");

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
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

        <div className="card-container__preview">Preview here...</div>
      </div>
    </Layout>
  );
}
