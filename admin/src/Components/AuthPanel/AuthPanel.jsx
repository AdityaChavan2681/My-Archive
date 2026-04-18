import React, { useState } from "react";

import { adminAuth, loginAdmin } from "../../api";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const AuthPanel = ({ onSuccess }) => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (event) => {
    setFormData((current) => ({
      ...current,
      [event.target.name]: event.target.value
    }));
  };

  const validateForm = () => {
    const email = formData.email.trim().toLowerCase();
    const password = formData.password;

    if (!email || !password) {
      return "email and password are required";
    }

    if (!EMAIL_REGEX.test(email)) {
      return "enter a valid email address";
    }

    return "";
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    const validationError = validateForm();

    if (validationError) {
      setError(validationError);
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await loginAdmin({
        email: formData.email.trim().toLowerCase(),
        password: formData.password
      });
      adminAuth.setToken(response.token);
      onSuccess?.();
    } catch (requestError) {
      setError(requestError.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      style={{
        width: "100%",
        maxWidth: "420px",
        background: "#ffffff",
        borderRadius: "12px",
        padding: "24px",
        boxShadow: "0 12px 40px rgba(15, 23, 42, 0.08)"
      }}
    >
      <h2 style={{ marginTop: 0 }}>Admin Sign In</h2>
      <p style={{ color: "#4b5563" }}>
        Sign in with an existing account to create archive entries through the protected API.
      </p>
      <form onSubmit={handleSubmit} style={{ display: "grid", gap: "12px" }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={formData.email}
          onChange={handleChange}
          required
          style={{ height: "44px", padding: "0 12px" }}
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
          style={{ height: "44px", padding: "0 12px" }}
        />
        {error ? <p style={{ color: "#b91c1c", margin: 0 }}>{error}</p> : null}
        <button
          type="submit"
          disabled={isSubmitting}
          style={{
            height: "44px",
            border: "none",
            borderRadius: "8px",
            background: "#1d4ed8",
            color: "#ffffff",
            cursor: "pointer"
          }}
        >
          {isSubmitting ? "Signing in..." : "Sign In"}
        </button>
      </form>
    </div>
  );
};

export default AuthPanel;
