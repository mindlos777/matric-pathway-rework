<<<<<<< HEAD
import React, { useState } from "react";

export const FilterPanel = ({ config, filters, setFilters }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div style={styles.wrapper}>
      {/* SEARCH + BUTTON ROW */}
      <div style={styles.row}>
        {config.search && (
          <input
            style={styles.search}
            placeholder={config.search.placeholder}
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        )}

        <button style={styles.button} onClick={() => setOpen(!open)}>
          Filters ⚙️
        </button>
      </div>

      {/* FILTER PANEL */}
      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <h3 style={{ margin: 0 }}>Filters</h3>
            <button style={styles.close} onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div style={styles.grid}>
            {config.fields.map((field) => (
              <div key={field.key}>
                <label style={styles.label}>{field.label}</label>

                {/* SELECT */}
                {field.type === "select" && (
                  <select
                    style={styles.select}
                    value={filters[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value || opt} value={opt.value || opt}>
                        {opt.label || opt}
                      </option>
                    ))}
                  </select>
                )}

                {/* CHECKBOX */}
                {field.type === "checkbox" && (
                  <label style={{ display: "flex", gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={filters[field.key]}
                      onChange={(e) =>
                        handleChange(field.key, e.target.checked)
                      }
                    />
                    {field.label}
                  </label>
                )}

                {/* RANGE SLIDER */}
                {field.type === "range" && (
                  <>
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step || 1}
                      value={filters[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <div style={styles.rangeValue}>
                      {filters[field.key]} {field.unit}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: { marginBottom: 20 },

  row: { display: "flex", gap: 10 },

  search: {
    flex: 1,
    padding: "12px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  },

  button: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
  },

  panel: {
    background: "white",
    marginTop: 15,
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  close: {
    background: "transparent",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: 20,
  },

  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: 6,
  },

  select: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  rangeValue: {
    marginTop: 6,
    fontSize: 14,
    color: "#475569",
  },
};
=======
import React, { useState } from "react";

export const FilterPanel = ({ config, filters, setFilters }) => {
  const [open, setOpen] = useState(false);

  const handleChange = (key, value) => {
    setFilters({ ...filters, [key]: value });
  };

  return (
    <div style={styles.wrapper}>
      {/* SEARCH + BUTTON ROW */}
      <div style={styles.row}>
        {config.search && (
          <input
            style={styles.search}
            placeholder={config.search.placeholder}
            value={filters.search || ""}
            onChange={(e) => handleChange("search", e.target.value)}
          />
        )}

        <button style={styles.button} onClick={() => setOpen(!open)}>
          Filters ⚙️
        </button>
      </div>

      {/* FILTER PANEL */}
      {open && (
        <div style={styles.panel}>
          <div style={styles.header}>
            <h3 style={{ margin: 0 }}>Filters</h3>
            <button style={styles.close} onClick={() => setOpen(false)}>
              ✕
            </button>
          </div>

          <div style={styles.grid}>
            {config.fields.map((field) => (
              <div key={field.key}>
                <label style={styles.label}>{field.label}</label>

                {/* SELECT */}
                {field.type === "select" && (
                  <select
                    style={styles.select}
                    value={filters[field.key]}
                    onChange={(e) => handleChange(field.key, e.target.value)}
                  >
                    {field.options.map((opt) => (
                      <option key={opt.value || opt} value={opt.value || opt}>
                        {opt.label || opt}
                      </option>
                    ))}
                  </select>
                )}

                {/* CHECKBOX */}
                {field.type === "checkbox" && (
                  <label style={{ display: "flex", gap: 8 }}>
                    <input
                      type="checkbox"
                      checked={filters[field.key]}
                      onChange={(e) =>
                        handleChange(field.key, e.target.checked)
                      }
                    />
                    {field.label}
                  </label>
                )}

                {/* RANGE SLIDER */}
                {field.type === "range" && (
                  <>
                    <input
                      type="range"
                      min={field.min}
                      max={field.max}
                      step={field.step || 1}
                      value={filters[field.key]}
                      onChange={(e) => handleChange(field.key, e.target.value)}
                      style={{ width: "100%" }}
                    />
                    <div style={styles.rangeValue}>
                      {filters[field.key]} {field.unit}
                    </div>
                  </>
                )}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  wrapper: { marginBottom: 20 },

  row: { display: "flex", gap: 10 },

  search: {
    flex: 1,
    padding: "12px",
    borderRadius: 10,
    border: "1px solid #cbd5e1",
  },

  button: {
    background: "#1e3a8a",
    color: "white",
    border: "none",
    padding: "12px 18px",
    borderRadius: 10,
    cursor: "pointer",
    fontWeight: "bold",
  },

  panel: {
    background: "white",
    marginTop: 15,
    padding: 20,
    borderRadius: 14,
    boxShadow: "0 8px 20px rgba(0,0,0,0.08)",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    marginBottom: 20,
  },

  close: {
    background: "transparent",
    border: "none",
    fontSize: 22,
    cursor: "pointer",
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(200px,1fr))",
    gap: 20,
  },

  label: {
    fontWeight: "bold",
    display: "block",
    marginBottom: 6,
  },

  select: {
    width: "100%",
    padding: 10,
    borderRadius: 6,
    border: "1px solid #ccc",
  },

  rangeValue: {
    marginTop: 6,
    fontSize: 14,
    color: "#475569",
  },
};
>>>>>>> befd2cb14dbdeeebb059d1e3225dc1bce4480f88
