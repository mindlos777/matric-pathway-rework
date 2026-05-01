<<<<<<< HEAD
import React, { useState } from "react";

export const TopRightActions = ({
  showFilter,
  filterOptions,
  filterValue,
  onFilterChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div style={styles.wrapper}>
      {/* FILTER DROPDOWN */}
      {showFilter && (
        <select
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          style={styles.dropdown}
        >
          {filterOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}

      {/* NOTIFICATION ICON */}
      <div style={styles.notificationWrapper}>
        <button
          style={styles.bellBtn}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          🔔
          <span style={styles.badge}>3</span>
        </button>

        {showNotifications && (
          <div style={styles.panel}>
            <p>No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  dropdown: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },

  notificationWrapper: {
    position: "relative",
  },

  bellBtn: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
  },

  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "red",
    color: "white",
    borderRadius: "50%",
    padding: "3px 6px",
    fontSize: "12px",
  },

  panel: {
    position: "absolute",
    top: "40px",
    right: 0,
    width: "250px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    padding: "15px",
    zIndex: 999,
  },
};
=======
import React, { useState } from "react";

export const TopRightActions = ({
  showFilter,
  filterOptions,
  filterValue,
  onFilterChange,
}) => {
  const [showNotifications, setShowNotifications] = useState(false);

  return (
    <div style={styles.wrapper}>
      {/* FILTER DROPDOWN */}
      {showFilter && (
        <select
          value={filterValue}
          onChange={(e) => onFilterChange(e.target.value)}
          style={styles.dropdown}
        >
          {filterOptions.map((opt) => (
            <option key={opt}>{opt}</option>
          ))}
        </select>
      )}

      {/* NOTIFICATION ICON */}
      <div style={styles.notificationWrapper}>
        <button
          style={styles.bellBtn}
          onClick={() => setShowNotifications(!showNotifications)}
        >
          🔔
          <span style={styles.badge}>3</span>
        </button>

        {showNotifications && (
          <div style={styles.panel}>
            <p>No new notifications</p>
          </div>
        )}
      </div>
    </div>
  );
};

const styles = {
  wrapper: {
    display: "flex",
    alignItems: "center",
    gap: "20px",
  },

  dropdown: {
    padding: "8px 12px",
    borderRadius: "8px",
    border: "1px solid #cbd5e1",
  },

  notificationWrapper: {
    position: "relative",
  },

  bellBtn: {
    background: "transparent",
    border: "none",
    fontSize: "22px",
    cursor: "pointer",
  },

  badge: {
    position: "absolute",
    top: "-5px",
    right: "-5px",
    background: "red",
    color: "white",
    borderRadius: "50%",
    padding: "3px 6px",
    fontSize: "12px",
  },

  panel: {
    position: "absolute",
    top: "40px",
    right: 0,
    width: "250px",
    background: "white",
    borderRadius: "12px",
    boxShadow: "0 10px 25px rgba(0,0,0,0.15)",
    padding: "15px",
    zIndex: 999,
  },
};
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
