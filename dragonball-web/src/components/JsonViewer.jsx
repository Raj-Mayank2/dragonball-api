import { useState } from "react";

function JsonViewer({ data, endpoint }) {
  const [copied, setCopied] = useState(false);

  async function copyJson() {
    if (!data) {
      return;
    }

    await navigator.clipboard.writeText(
      JSON.stringify(data, null, 2)
    );

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 1500);
  }

  return (
    <section className="json-section">
      <div className="json-header">
        <div>
          <p className="section-label">API RESPONSE</p>
          <h2>JSON</h2>
        </div>

        <button
          type="button"
          className="copy-button"
          onClick={copyJson}
          disabled={!data}
        >
          {copied ? "Copied!" : "Copy JSON"}
        </button>
      </div>

      <div className="json-panel">
        <div className="json-toolbar">
          <div className="toolbar-dots">
            <span />
            <span />
            <span />
          </div>

          <span className="json-endpoint">
            {endpoint}
          </span>

          <span className="json-status">
            200 OK
          </span>
        </div>

        <pre>
          {data
            ? JSON.stringify(data, null, 2)
            : "No response yet."}
        </pre>
      </div>
    </section>
  );
}

export default JsonViewer;