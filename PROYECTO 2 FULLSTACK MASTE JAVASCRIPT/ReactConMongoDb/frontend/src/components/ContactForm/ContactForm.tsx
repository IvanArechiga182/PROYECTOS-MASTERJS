import { useState } from "react";
import type { UserContactInfo } from "../../interfaces/UserContactInteface";
import "./ContactForm.css";

function ContactForm() {
  const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;
  const [form, setForm] = useState<UserContactInfo>({
    username: "",
    lastname: "",
    email: "",
    phoneNumber: "",
  });
  const [hasError, setHasError] = useState<boolean>(false);
  const [status, setStatus] = useState<string>("");

  const handleStatusMessage = (error: boolean) => {
    if (error) {
      setStatus("No se ha podido enviar la información de contacto.");
    } else {
      setStatus("Se ha enviado correctamente la información de contacto");
    }

    setTimeout(() => {
      setStatus("");
    }, 3000);
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: name === "phoneNumber" ? Number(value) : value,
    }));
  };

  const isFormValid = () => {
    return (
      form.username.trim() !== "" &&
      form.lastname.trim() !== "" &&
      Number(form.phoneNumber) > 0 &&
      Number(form.phoneNumber).toString().length === 10 &&
      form.email.trim() !== ""
    );
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const res = await fetch(`${API_BASE_URL}postContactInfo`, {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!res.ok) {
      setHasError(true);
      handleStatusMessage(true);
      console.log("No se pudo consumir el endpoint");
    }

    await res.json();
    setHasError(false);
    handleStatusMessage(false);
  };

  return (
    <div className="container">
      <div className="contact-form-container">
        <form onSubmit={handleSubmit}>
          <h2>Ponte en contacto</h2>
          <br />
          <label htmlFor="username">
            Tu nombre/s:
            <input
              type="text"
              name="username"
              id="username"
              onChange={handleChange}
              required
            />
          </label>
          <label htmlFor="lastname">
            Tu/s apellido/s
            <input
              type="text"
              name="lastname"
              onChange={handleChange}
              id="lastname"
              required
            />
          </label>
          <label htmlFor="email">
            Tu correo electrónico
            <input
              type="email"
              name="email"
              onChange={handleChange}
              id="email"
              required
            />
          </label>
          <label htmlFor="phoneNumber">
            Tu número celular
            <input
              type="text"
              name="phoneNumber"
              maxLength={10}
              onChange={handleChange}
              id="phoneNumber"
              required
            />
          </label>
          <br />
          <input
            type="submit"
            value="Enviar"
            id="sendContactInfo"
            disabled={!isFormValid()}
          />
        </form>
      </div>
      <h2 className={`status-request ${!hasError ? `success` : `error`}`}>
        {status}
      </h2>
    </div>
  );
}

export default ContactForm;
