"use client";

import { register } from "@/services/auth-feature.service";
import { useState } from "react";
import { toast } from "react-toastify";

const FormContent = ({ formRegister, onChangeForm }) => {
  // ============================= Handle Functions =============================/
  const [loading, setLoaing] = useState(false);

  // ============================= Handle Functions =============================/
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoaing(true);
    try {
      const res = await register(formRegister);
      if (res && res.success) {
        toast.success("Registration successful! Please log in.");
        onChangeForm({ target: { name: "email", value: "" } });
        onChangeForm({ target: { name: "password", value: "" } });
      }
    } catch (error) {
      console.log("Registration error:", error);

      const message = Array.isArray(error.response?.data?.message)
        ? error.response?.data?.message[0]
        : error.response?.data?.message ||
          error.message ||
          "An error occurred during registration.";

      toast.error(message);
    } finally {
      setLoaing(false);
    }
  };

  // ============================= Render UI =============================/
  return (
    <form method="post" action="add-parcel.html" onSubmit={handleSubmit}>
      <div className="form-group">
        <label>Email Address</label>
        <input
          type="email"
          name="email"
          value={formRegister.email}
          onChange={onChangeForm}
          placeholder="Username"
          required
        />
      </div>
      {/* name */}

      <div className="form-group">
        <label>Password</label>
        <input
          id="password-field"
          type="password"
          name="password"
          value={formRegister.password}
          onChange={onChangeForm}
          placeholder="Password"
          required
        />
      </div>
      {/* password */}

      <div className="form-group">
        <button
          className="theme-btn btn-style-one"
          type="submit"
          disabled={loading}
        >
          Register
        </button>
      </div>
      {/* login */}
    </form>
  );
};

export default FormContent;
