<<<<<<< HEAD
import { useNavigate } from "react-router-dom";
import { useApplicationTracker } from "../ApplicationTrackerContext";

export const ApplicationStats = ({ type }) => {
  const navigate = useNavigate();
  const { getStats } = useApplicationTracker();
  const stats = getStats(type);

  return (
    <>
      <div style={styles.cards}>
        <Card title="Submitted" value={stats.submitted} />
        <Card title="Accepted" value={stats.accepted} />
        <Card title="Rejected" value={stats.rejected} />
      </div>

      <button
        style={styles.btn}
        onClick={() => navigate("/application-status")}
      >
        View Application Status
      </button>
    </>
  );
};

const Card = ({ title, value }) => (
  <div style={styles.card}>
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);

const styles = {
  cards: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    margin: "20px 0",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    minWidth: 200,
    flex: 1,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  btn: {
    padding: "12px 20px",
    borderRadius: 8,
    border: "none",
    background: "#1e3a8a",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
=======
import { useNavigate } from "react-router-dom";
import { useApplicationTracker } from "../ApplicationTrackerContext";

export const ApplicationStats = ({ type }) => {
  const navigate = useNavigate();
  const { getStats } = useApplicationTracker();
  const stats = getStats(type);

  return (
    <>
      <div style={styles.cards}>
        <Card title="Submitted" value={stats.submitted} />
        <Card title="Accepted" value={stats.accepted} />
        <Card title="Rejected" value={stats.rejected} />
      </div>

      <button
        style={styles.btn}
        onClick={() => navigate("/application-status")}
      >
        View Application Status
      </button>
    </>
  );
};

const Card = ({ title, value }) => (
  <div style={styles.card}>
    <p>{title}</p>
    <h2>{value}</h2>
  </div>
);

const styles = {
  cards: {
    display: "flex",
    gap: 20,
    flexWrap: "wrap",
    margin: "20px 0",
  },
  card: {
    background: "#fff",
    borderRadius: 12,
    padding: 24,
    minWidth: 200,
    flex: 1,
    boxShadow: "0 2px 8px rgba(0,0,0,0.08)",
  },
  btn: {
    padding: "12px 20px",
    borderRadius: 8,
    border: "none",
    background: "#1e3a8a",
    color: "#fff",
    fontWeight: "bold",
    cursor: "pointer",
  },
};
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
