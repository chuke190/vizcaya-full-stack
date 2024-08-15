import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import "../../styles/EditUser.css";

const EditUser = ({ users, setUsers }) => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState("");

  const tipoUsuarioOptions = ["Administrador", "Médico", "Secretaria"];

  useEffect(() => {
    const user = users.find((user) => user.id === parseInt(id));
    if (user) {
      setUserData(user);
    } else {
      navigate("/usuarios");
    }
  }, [id, users, navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 2 * 1024 * 1024) {
        setError("El archivo es demasiado grande. El tamaño máximo es 2 MB.");
        return;
      }
      setError("");
      const reader = new FileReader();
      reader.onload = (upload) => {
        setUserData((prevState) => ({
          ...prevState,
          photo: upload.target.result,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      !userData.nombre ||
      !userData.rol ||
      !userData.noDocumento ||
      !userData.email ||
      !userData.tipoDocumento ||
      !userData.telefono
    ) {
      setError("Por favor, completa todos los campos.");
      return;
    }
    setError("");

    console.log("Datos enviados:", userData);

    const response = await fetch(
      "http://localhost/sisDenatal/backend2/public/index.php?action=updateuser",
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: userData.id,
          nombre: userData.nombre,
          email: userData.email,
          contra: userData.password,
          rol: userData.rol,
          telefono: userData.telefono,
          noDocumento: userData.noDocumento,
          tipoDocumento: userData.tipoDocumento,
        }),
      }
    );

    const data = await response.json();
    console.log("Respuesta del servidor:", data);

    if (data.message === "exito") {
      const updatedUsers = users.map((user) => {
        if (user.id === userData.id) {
          return userData;
        }
        return user;
      });
      setUsers(updatedUsers);
      navigate("/usuarios");
    } else {
      setError("Error al actualizar el usuario.");
    }
  };

  const handleCancel = () => {
    navigate("/usuarios");
  };

  if (!userData) return <div>Cargando...</div>;

  return (
    <div className="edituser-body">
      <div className="edituser-container">
        <div className="header">
          <h2>Editar Usuario</h2>
          <FontAwesomeIcon
            icon={faTimes}
            className="close-icon"
            onClick={handleCancel}
          />
        </div>
        <form onSubmit={handleSubmit} className="rect">
          <div className="form-tablee">
            <div className="form-group">
              <label htmlFor="nombre">Nombre:</label>
              <input
                type="text"
                id="nombre"
                name="nombre"
                value={userData.nombre}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="rol">Rol:</label>
              <select
                id="rol"
                name="rol"
                value={userData.rol}
                onChange={handleChange}
                required
              >
                <option value="">Seleccionar rol</option>
                {tipoUsuarioOptions.map((option, index) => (
                  <option key={index} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </div>
            <div className="form-group">
              <label htmlFor="tipoDocumento">Tipo de Documento:</label>
              <input
                type="text"
                id="tipoDocumento"
                name="tipoDocumento"
                value={userData.tipoDocumento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="noDocumento">No. Documento:</label>
              <input
                type="number"
                id="noDocumento"
                name="noDocumento"
                value={userData.noDocumento}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="telefono">Teléfono:</label>
              <input
                type="tel"
                id="telefono"
                name="telefono"
                value={userData.telefono}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="email">Email:</label>
              <input
                type="email"
                id="email"
                name="email"
                value={userData.email}
                onChange={handleChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="photo">Foto:</label>
              <input
                type="file"
                id="photo"
                name="photo"
                accept="image/*"
                onChange={handleFileChange}
              />
              {userData.photo && (
                <img
                  src={userData.photo}
                  alt="Preview"
                  className="photo-preview"
                />
              )}
            </div>
          </div>
          <div className="button-group-us">
            <button type="submit" className="btn-guardar-us">
              Guardar
            </button>
            <button
              type="button"
              className="btn-cancelar-us"
              onClick={handleCancel}
            >
              Cancelar
            </button>
          </div>
        </form>
        {error && <div className="error-message">{error}</div>}
      </div>
    </div>
  );
};

export default EditUser;
