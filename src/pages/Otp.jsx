import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";

const Otp = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    otp: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}/verify/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.otp,
        }),
      });
      const data = await res.json();

      if (res.ok) {
        setMessage("Confirmation réussie");
        setTypeMessage("success");
        navigate("/confirmation");
      } else {
        setMessage(data.detail || "Echec de la confirmation");
        setTypeMessage("error");
      }
    } catch (error) {
      setMessage("Erreur réseau. Veuillez réessayer.");
      setLoading(false);
      setTypeMessage("error");
    }
  };
  return (
    <div className="home">
      <h1>Confirmation</h1>
      <p>Un code de vérification a été envoyé par WhatsApp.</p>
      {message && (
        <div
          className={`alert ${
            typeMessage === "success" ? "alert-success" : "alert-danger"
          }`}
        >
          {message}
        </div>
      )}
      <form onSubmit={handleSubmit}>
        <Input
          value={formData.username}
          placeholder="Entrer votre nom"
          onChange={(val) => setFormData({ ...formData, username: val })}
        />
        <Input
          type="otp"
          value={formData.otp}
          placeholder="Code OTP"
          onChange={(val) => setFormData({ ...formData, otp: val })}
        />
        <button type="submit" disabled={loading}>
          {loading ? "Verification..." : "Valider"}
        </button>
      </form>
    </div>
  );
};

export default Otp;
