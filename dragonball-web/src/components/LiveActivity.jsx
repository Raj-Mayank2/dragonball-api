import { useEffect, useState } from "react";

const API_URL = import.meta.env.VITE_API_URL;

function LiveActivity() {
  const [connected, setConnected] = useState(false);
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const eventSource = new EventSource(
      `${API_URL}/api/v1/events`
    );

    eventSource.onopen = () => {
      setConnected(true);
    };

    eventSource.onerror = () => {
      setConnected(false);
    };

    function addEvent(type) {
      return (event) => {
        const data = JSON.parse(event.data);

        setEvents((current) => [
          {
            type,
            data,
            time: new Date().toLocaleTimeString(),
          },
          ...current,
        ].slice(0, 10));
      };
    }

    eventSource.addEventListener(
      "character_created",
      addEvent("Character created")
    );

    eventSource.addEventListener(
      "saga_created",
      addEvent("Saga created")
    );
    eventSource.addEventListener(
  "character_updated",
  addEvent("Character updated")
);

eventSource.addEventListener(
  "character_deleted",
  addEvent("Character deleted")
);

eventSource.addEventListener(
  "character_added_to_saga",
  addEvent("Character added to saga")
);

    return () => {
      eventSource.close();
    };
  }, []);

  return (
    <section className="live-activity">
      <div className="live-header">
        <div>
          <p className="section-label">REAL-TIME</p>
          <h2>Live API activity</h2>
        </div>

        <div className="connection-status">
          <span
            className={`connection-dot ${
              connected ? "connected" : ""
            }`}
          />

          {connected ? "Connected" : "Disconnected"}
        </div>
      </div>

      <div className="activity-list">
        {events.length === 0 ? (
          <div className="activity-empty">
            Waiting for API events...
          </div>
        ) : (
          events.map((event, index) => (
            <article
              className="activity-item"
              key={`${event.time}-${index}`}
            >
              <div>
                <strong>{event.type}</strong>

                <p>
  {event.data.name ||
    event.data.character_name ||
    "API event"}

  {event.data.id
    ? ` · #${event.data.id}`
    : event.data.character_id
      ? ` · Character #${event.data.character_id}`
      : ""}
</p>
              </div>

              <time>{event.time}</time>
            </article>
          ))
        )}
      </div>
    </section>
  );
}

export default LiveActivity;