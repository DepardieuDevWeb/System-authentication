import React, { useState } from "react";
import Input from "../components/Input";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState();
  const [typeMessage, setTypeMessage] = useState();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await fetch(`${BASE_URL}/login/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: formData.username,
          password: formData.password,
        }),
      });
      const response = await res.json();
      if (response.message) {
        setMessage("Connexion réussie");
        setTypeMessage("success");
        navigate("/otp");
      } else {
        setMessage(response.detail || "Echec de la connexion");
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
      <h1>Se connecter</h1>
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
          type="password"
          value={formData.password}
          placeholder="Entrer votre mot de passe"
          onChange={(val) => setFormData({ ...formData, password: val })}
        />
        <p>
          Vous n'avez pas de compte?{" "}
          <span>
            <Link to="/inscription">S'inscrire</Link>
          </span>
        </p>
        <button type="submit" disabled={loading}>
          {loading ? "Connexion en cours..." : "Se connecter"}
        </button>
      </form>
    </div>
  );
};

export default Login;
