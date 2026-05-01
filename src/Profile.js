import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "./auth/auth";

export const ProfilePage = () => {
  const {
    user,
    profileData,
    saveProfile,
    setApsScore,
    setSubjects,
    subjects,
  } = useAuth();

  const [saving, setSaving] = useState(false);

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

    disability: "No",
    disabilityDetails: "",
  });

  /* AUTO FILL FROM FIREBASE */
  useEffect(() => {
    if (profileData) {
      setForm((prev) => ({
        ...prev,
        ...profileData,
        email: profileData.email || user?.email || "",
      }));
    } else if (user?.email) {
      setForm((prev) => ({
        ...prev,
        email: user.email,
      }));
    }
  }, [profileData, user]);

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

const navigate = useNavigate();
const handleSubmit = async (e) => {
  e.preventDefault();

  try {
    setSaving(true);

    const cleanedSubjects = subjects.map((s) => ({
      name: s.name.trim(),
      mark: Number(s.mark),
    }));

    const aps = calculateAPS();

    await saveProfile({
      ...form,
      email: user?.email || form.email,
      subjects: cleanedSubjects,
      apsScore: aps,
      updatedAt: new Date(),
    });

      alert("Profile saved successfully!");
      navigate("/dashboard", { replace: true });
    } catch (error) {
      console.error(error);
      alert("Failed to save profile.");
    } finally {
      setSaving(false);
    }
  };

  const isMobile = window.innerWidth <= 768;

  return (
    <div
      style={{
        ...styles.page,
        padding: isMobile ? "20px 10px" : styles.page.padding,
      }}
    >
      <form
        style={{
          ...styles.card,
          padding: isMobile ? "20px" : styles.card.padding,
        }}
        onSubmit={handleSubmit}
      >
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

        {/* CONTACT */}
        <Section title="Contact Information">
          <Input
            label="Email Address"
            name="email"
            value={form.email}
            disabled
          />

          <Input
            label="Phone Number"
            name="phone"
            value={form.phone}
            onChange={handleChange}
          />
        </Section>

        {/* ADDRESS */}
        <Section title="Home Address">
          <Input
            label="Street Address"
            name="addressLine1"
            value={form.addressLine1}
            onChange={handleChange}
          />

          <Input
            label="City/Town"
            name="city"
            value={form.city}
            onChange={handleChange}
          />

          <Input
            label="Province"
            name="province"
            value={form.province}
            onChange={handleChange}
          />

          <Input
            label="Postal Code"
            name="postalCode"
            value={form.postalCode}
            onChange={handleChange}
          />
        </Section>

        {/* SCHOOL */}
        <Section title="School Information">
          <Input
            label="High School Name"
            name="schoolName"
            value={form.schoolName}
            onChange={handleChange}
          />

          <Input
            label="Matric Year"
            name="matricYear"
            type="number"
            value={form.matricYear}
            onChange={handleChange}
          />
        </Section>

        {/* SUBJECTS */}
        <Section title="Matric Subjects & Marks">
          <div style={styles.subjectsWrapper}>
            {subjects.map((subject, index) => (
              <div
                key={index}
                style={{
                  ...styles.subjectRow,
                  flexDirection: isMobile ? "column" : "row",
                }}
              >
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

        {/* EXTRA */}
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
          {saving ? "Saving..." : "Save Profile"}
        </button>
      </form>
    </div>
  );
};

/* COMPONENTS */
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
    flexDirection: "row",
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
    padding: "12px",
    background: "#16a34a",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontWeight: "bold",
    fontSize: "14px",
  },

  removeBtn: {
    background: "#dc2626",
    color: "white",
    border: "none",
    padding: "12px",
    borderRadius: "6px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  apsBox: {
    marginTop: "15px",
    padding: "14px",
    background: "#e0f2fe",
    borderRadius: "8px",
    fontWeight: "bold",
    color: "#0369a1",
    textAlign: "center",
  },
};
