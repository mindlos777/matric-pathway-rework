import React, { useState } from "react";
import { useAuth } from "./auth/auth";

export const ProfilePage = () => {
  const { setApsScore, setSubjects, subjects } = useAuth();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    idNumber: "",
    citizenship: "South African",

    email: "",
    phone: "",

    addressLine1: "",
    city: "",
    province: "",
    postalCode: "",

    schoolName: "",
    matricYear: "",

    mathematics: "",
    english: "",
    physics: "",
    lifeOrientation: "",

    disability: "No",
    disabilityDetails: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubjectChange = (index, field, value) => {
    const updated = [...subjects];

    if (field === "name") {
      const exists = updated.some(
        (s, i) => s.name.toLowerCase() === value.toLowerCase() && i !== index
      );

      if (exists) {
        alert("You already added this subject.");
        return;
      }
    }

    updated[index][field] = value;
    setSubjects(updated);
  };

  const addSubject = () => {
    if (subjects.length >= 7) {
      alert("You can only add up to 7 subjects.");
      return;
    }

    setSubjects([...subjects, { name: "", mark: "" }]);
  };

  const removeSubject = (index) => {
    const updated = subjects.filter((_, i) => i !== index);
    setSubjects(updated);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const cleanedSubjects = subjects.map((s) => ({
      name: s.name.trim(),
      mark: Number(s.mark),
    }));

    const aps = calculateAPS();

    setSubjects(cleanedSubjects);
    setApsScore(aps);

    alert("Profile saved!");
  };

  const calculateAPS = () => {
    let total = 0;

    subjects.forEach((subj) => {
      const mark = Number(subj.mark);

      if (mark >= 80) total += 7;
      else if (mark >= 70) total += 6;
      else if (mark >= 60) total += 5;
      else if (mark >= 50) total += 4;
      else if (mark >= 40) total += 3;
      else if (mark >= 30) total += 2;
      else if (mark > 0) total += 1;
    });

    return total;
  };

  return (
    <div style={styles.page}>
      <form style={styles.card} onSubmit={handleSubmit}>
        <h2 style={styles.heading}>Student Profile</h2>

        {/* PERSONAL DETAILS */}
        <Section title="Personal Information">
          <Input
            label="First Name"
            name="firstName"
            value={form.firstName}
            onChange={handleChange}
            required
          />
          <Input
            label="Last Name"
            name="lastName"
            value={form.lastName}
            onChange={handleChange}
            required
          />
          <Input
            label="Date of Birth"
            name="dob"
            type="date"
            value={form.dob}
            onChange={handleChange}
            required
          />

          <Select
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
          >
            <option value="">Select</option>
            <option>Male</option>
            <option>Female</option>
            <option>Other</option>
          </Select>

          <Input
            label="ID / Passport Number"
            name="idNumber"
            value={form.idNumber}
            onChange={handleChange}
            required
          />

          <Select
            label="Citizenship"
            name="citizenship"
            value={form.citizenship}
            onChange={handleChange}
          >
            <option>South African</option>
            <option>Permanent Resident</option>
            <option>International</option>
          </Select>
        </Section>

        {/* CONTACT DETAILS */}
        <Section title="Contact Information">
          <Input
            label="Email Address"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
          />
          <Input
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
            required
          />
        </Section>

        {/* ADDRESS */}
        <Section title="Home Address">
          <Input
            label="Street Address"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
            required
          />
          <Input
            label="City/Town"
            name="city"
            value={form.city}
            onChange={handleChange}
            required
          />
          <Input
            label="Province"
            name="province"
            value={form.province}
            onChange={handleChange}
            required
          />
          <Input
            label="Postal Code"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
            required
          />
        </Section>

        {/* SCHOOL */}
        <Section title="School Information">
          <Input
            label="High School Name"
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
            required
          />
          <Input
            label="Matric Year"
            name="matricYear"
            type="number"
            value={form.matricYear}
            onChange={handleChange}
            required
          />
        </Section>

        {/* SUBJECT MARKS */}
        <Section title="Matric Subjects & Marks">
          <div style={styles.subjectsWrapper}>
            {subjects.map((subject, index) => (
              <div key={index} style={styles.subjectRow}>
                <input
                  style={styles.subjectInput}
                  placeholder="Subject Name"
                  value={subject.name}
                  onChange={(e) =>
                    handleSubjectChange(index, "name", e.target.value)
                  }
                />

                <input
                  style={styles.markInput}
                  type="number"
                  placeholder="%"
                  value={subject.mark}
                  onChange={(e) =>
                    handleSubjectChange(index, "mark", e.target.value)
                  }
                />

                <button
                  type="button"
                  style={styles.removeBtn}
                  onClick={() => removeSubject(index)}
                >
                  −
                </button>
              </div>
            ))}
          </div>

          <button type="button" style={styles.addBtn} onClick={addSubject}>
            + Add Subject
          </button>
          <div style={styles.apsBox}>
            Current APS Score: <strong>{calculateAPS()}</strong>
          </div>
        </Section>

        {/* ADDITIONAL INFO */}
        <Section title="Additional Information">
          <Select
            label="Do you have a disability?"
            name="disability"
            value={form.disability}
            onChange={handleChange}
          >
            <option>No</option>
            <option>Yes</option>
          </Select>

          {form.disability === "Yes" && (
            <textarea
              name="disabilityDetails"
              placeholder="Please describe"
              value={form.disabilityDetails}
              onChange={handleChange}
              style={styles.textarea}
            />
          )}
        </Section>

        <button type="submit" style={styles.saveBtn}>
          Save Profile
        </button>
      </form>
    </div>
  );
};

/* ---------- Reusable Components ---------- */

const Section = ({ title, children }) => (
  <div style={styles.section}>
    <h3 style={styles.sectionTitle}>{title}</h3>
    <div style={styles.grid}>{children}</div>
  </div>
);

const Input = ({ label, ...props }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <input style={styles.input} {...props} />
  </div>
);

const Select = ({ label, children, ...props }) => (
  <div style={styles.field}>
    <label style={styles.label}>{label}</label>
    <select style={styles.input} {...props}>
      {children}
    </select>
  </div>
);

/* ---------- Styles ---------- */

const styles = {
  page: {
    minHeight: "100vh",
    background: "#f4f6f9",
    padding: "40px 20px",
    display: "flex",
    justifyContent: "center",
  },
  card: {
    width: "100%",
    maxWidth: "900px",
    background: "white",
    padding: "40px",
    borderRadius: "16px",
    boxShadow: "0 10px 30px rgba(0,0,0,0.08)",
  },
  heading: {
    fontSize: "28px",
    color: "#1e3a8a",
    marginBottom: "20px",
    textAlign: "center",
  },
  section: { marginBottom: "30px" },
  sectionTitle: { marginBottom: "15px", color: "#1e3a8a" },
  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
    gap: "15px",
  },
  field: { display: "flex", flexDirection: "column" },
  label: { fontWeight: "bold", marginBottom: "5px" },
  input: {
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  textarea: {
    gridColumn: "1/-1",
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    minHeight: "80px",
  },
  saveBtn: {
    marginTop: "20px",
    width: "100%",
    padding: "14px",
    background: "#1e3a8a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    fontSize: "16px",
    cursor: "pointer",
  },
  subjectRow: {
    display: "flex",
    alignItems: "center",
    gap: "12px",
    marginBottom: "14px",
    width: "100%",
  },
  subjectInput: {
    flex: 2,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
  },
  markInput: {
    flex: 1,
    padding: "10px",
    borderRadius: "6px",
    border: "1px solid #ccc",
    textAlign: "center",
    MozAppearance: "textfield",
  },
  subjectsWrapper: {
    gridColumn: "1 / -1",
    display: "flex",
    flexDirection: "column",
  },
  addBtn: {
    marginTop: "10px",
    padding: "10px 16px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
    boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
    transition: "all 0.2s ease",
  },
  removeBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "10px 14px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },
  apsBox: {
    marginTop: "15px",
    padding: "12px",
    background: "#e0f2fe",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#0369a1",
  },
};
