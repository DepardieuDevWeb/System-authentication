import React, { useState } from "react";
import Input from "../components/Input";
import { Link } from "react-router-dom";

const Register = () => {
  const BASE_URL = import.meta.env.VITE_API_URL;

  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirm_password: "",
    email: "",
    whatsapp_number: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    if (formData.password !== formData.confirm_password) {
      setMessage("Les mots de passe ne correspondent pas");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch(`${BASE_URL}/register/`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const text = await res.text();
      let data = null;

      try {
        data = JSON.parse(text);
      } catch (jsonErr) {
        // La réponse n'est pas un JSON valide (ex: erreur 500 HTML)
      }

      if (res.ok) {
        setMessage("Inscription réussie");
      } else {
        setMessage(
          data?.detail ||
            "Une erreur est survenue. Veuillez réessayer plus tard."
        );
        console.error("Erreur inscription :", text);
      }
    } catch (err) {
      setMessage("Erreur réseau. Veuillez réessayer.");
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="home">
      <h1>S'inscrire</h1>
      {message && <p>{message}</p>}
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
        <Input
          type="password"
          value={formData.confirm_password}
          placeholder="Confirmer votre mot de passe"
          onChange={(val) =>
            setFormData({ ...formData, confirm_password: val })
          }
        />
        <Input
          type="email"
          value={formData.email}
          placeholder="Entrer votre mail"
          onChange={(val) => setFormData({ ...formData, email: val })}
        />
        <Input
          value={formData.whatsapp_number}
          placeholder="Entrer votre numéro WhatsApp"
          onChange={(val) => setFormData({ ...formData, whatsapp_number: val })}
        />
        <p>
          Vous avez déjà un compte ?{" "}
          <span>
            <Link to="/connexion">Se connecter</Link>
          </span>
        </p>
        <button disabled={loading}>
          {loading ? "Inscription en cours..." : "S'inscrire"}
        </button>
      </form>
    </div>
  );
};

export default Register;
