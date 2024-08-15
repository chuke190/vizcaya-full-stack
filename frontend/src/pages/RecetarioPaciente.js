import React, { useState, useRef, useEffect } from "react";
import "../styles/RecetarioPaciente.css";
import Nav from "../components/Nav";
import logoo from "../assets/15.png";

const RecetaPaciente = ({ medicos, setMedicos }) => {
  const [patientName, setPatientName] = useState("");
  const [fechanac, setFechanac] = useState("");
  const [medicines, setMedicines] = useState([
    { name: "", dosage: "", schedule: "" },
  ]);
  const [instructions, setInstructions] = useState("");
  const [sexo, setSexo] = useState("");
  const [edad, setEdad] = useState("");
  const [selectedMedico, setSelectedMedico] = useState(
    medicos.length > 0 ? medicos[0] : null
  );
  const [selectedMedicoDNI, setSelectedMedicoDNI] = useState(
    medicos.length > 0 ? medicos[0].dni : ""
  );
  const recetaRef = useRef(null);

  useEffect(() => {
    const fetchMedicos = async () => {
      try {
        const response = await fetch(
          "http://localhost/vizcaya-full-stack/backend2/public/index.php?action=getmedicos"
        );
        const data = await response.json();
        setMedicos(data);
      } catch (error) {
        console.error("Error:", error);
      }
    };
    fetchMedicos();
  }, []);

  const handleMedicineChange = (index, field, value) => {
    const newMedicines = [...medicines];
    newMedicines[index][field] = value;
    setMedicines(newMedicines);
  };

  const handleMedicoChange = (e) => {
    const selected = medicos.find(
      (medico) => medico.id === parseInt(e.target.value)
    );
    setSelectedMedico(selected);
    setSelectedMedicoDNI(selected.dni);
  };

  useEffect(() => {
    if (medicos.length > 0) {
      setSelectedMedico(medicos[0]);
      setSelectedMedicoDNI(medicos[0].dni);
    }
  }, [medicos]);

  const addMedicine = () => {
    setMedicines([...medicines, { name: "", dosage: "", schedule: "" }]);
  };

  const removeMedicine = (index) => {
    const newMedicines = medicines.filter((_, i) => i !== index);
    setMedicines(newMedicines);
  };

  const handlePrint = () => {
    const printContents = recetaRef.current.innerHTML;
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Receta Médica</title>
          <style>
          body {
              background-color: #EBE7E7;
              display: flex;
              justify-content: center;
              align-items: center;
              height: 100vh;
              padding: 0;
              margin: 0;
              font-family: 'Jomhuria Slab', serif;
            }
            .receta-container {
              width: 90%;
              background-color: #ffffff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
              padding: 20px;
              display: flex;
              flex-direction: column;
              align-items: center;
              overflow: hidden;
            }
            .receta-text-box {
              width: 39rem;
              padding: 20px;
              border: 1px solid #1f1e1e;
              border-radius: 8px;
              text-align: left;
            }
            .receta-text-box .receta-title {
              font-size: 1rem;
              margin-bottom: -1.5rem;
              text-align: center;
            }
            .receta-title {
              font-size: 1rem;
              margin-top: 1rem;
              text-align: center;
            }
            .receta-text-box .container-form{
               margin-top: 40px;
            }
            .container-form{
              margin-top: -4rem;
            }
            .container-form p {
              font-size: 12px;
              margin-bottom: 10px;
            }
            .container-form ul {
              font-size: 12px;
              padding-left: 20px;
            }
            .container-form li {
              font-size: 12px;
              padding-left: 20px;
            }
            .container-form strong {
              font-weight: bold;
              font-size: 12px;
            }
            .container-form h3{
              font-weight: bold;
              font-size: 12px;
              text-align: right;
              margin-right: 1rem;
            }
            .logoo-container {
              display: flex;
              align-items: flex-end;
              margin-top: -3.5rem;
            }
            .logoo-container .logoo-logoo {
              max-width: 10px;
              height: 50px;
              widht: 40px;
              margin-top:-4rem;
              margin-left: -3px;
            }
            .logoo-logoo .logo{
              margin-top: 1rem;
            }
            .subtiit  {
              display: flex;
              flex-direction: column;
              align-items: flex-start;
              font-size: 6px;
              margin-top: 50px;
              margin-left: 10rem;
            }
            .subtiit .sub {
              font-size: 6px;
              text-align: left;
              margin-right: -1rem;
              margin-bottom: 3px;
              margin-top: 6px;
              white-space: nowrap; /* Evita el salto de línea */
            }
            .subtiit .sub:last-child {
              margin-bottom: 0; /* Elimina el margen inferior del último elemento */
            }
            .container-form-sub{
              font-size: 9px;
              text-align: right;
              margin-top: -.5rem;
            }
            .subtitulos-receta {
              margin-top: 13px;
              margin-right: 5px;
              font-size: 9px;
            }
             .subtitulos-receta .subtiit .sub {
               font-size: 9px;
              text-align: left;
              margin-bottom: -3px;
              margin-top: 1px;
            }
            .subtitulos-receta .dire {
              font-size: 6px;
              margin-top: 2px;
              margin-left: -.5rem;
              margin-bottom: -30px;
            }
            .logoo-container-fecha-hora {
              font-size: 8px;
              margin-left: 6rem;
              color: #1f1e1e;
              margin-top: -2.5rem;
              font-family: 'Josefin Slab', serif;
            }
            .separacion{
              font-size: 20px;
            }
          </style>
        </head>
         <body>
        <div class="receta-container">
          <div class="receta-text-box">
            ${printContents}
          </div>
          <p class="separacion"></p>
          <div class="receta-text-box">
            ${printContents} 
          </div>
        </div>
      </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
    printWindow.close();
  };

  const handleDownload = () => {
    const text = `
      Paciente: ${patientName}
      Sexo: ${sexo}
      Edad: ${edad}
      Fecha de Nacimiento: ${fechanac}

      Medicamentos:
      ${medicines
        .map(
          (medicine) =>
            `${medicine.name} - ${medicine.dosage} - ${medicine.schedule}`
        )
        .join("\n")}

      Instrucciones:
      ${instructions}
    `;

    const blob = new Blob([text], { type: "text/plain" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "receta_paciente.txt";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  // Función para formatear las instrucciones a 155 caracteres por línea
  const formatInstructions = (text) => {
    const maxLength = 155;
    const words = text.split(" ");
    let formattedText = "";
    let currentLine = "";

    words.forEach((word) => {
      if ((currentLine + word).length <= maxLength) {
        currentLine += (currentLine ? " " : "") + word;
      } else {
        formattedText += currentLine + "\n";
        currentLine = word;
      }
    });

    if (currentLine) {
      formattedText += currentLine;
    }

    return formattedText;
  };

  const handleInstructionsChange = (e) => {
    const formattedText = formatInstructions(e.target.value);
    setInstructions(formattedText);
  };

  // Obtener la fecha y la hora actual
  const fechaActual = new Date().toLocaleDateString();
  const horaActual = new Date().toLocaleTimeString();

  return (
    <div className="receta-body">
      <Nav />
      <div className="receta-container">
        <div className="receta-content">
          <form className="receta-form">
            <div className="form-group">
              <label htmlFor="patientName">Nombre del Paciente:</label>
              <input
                type="text"
                id="patientName"
                name="patientName"
                value={patientName}
                onChange={(e) => setPatientName(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="sexo">Sexo:</label>
              <input
                type="text"
                id="sexo"
                name="sexo"
                value={sexo}
                onChange={(e) => setSexo(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="edad">Edad:</label>
              <input
                type="number"
                id="edad"
                name="edad"
                value={edad}
                onChange={(e) => setEdad(e.target.value)}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="fechanac">Fecha de Nacimiento:</label>
              <input
                type="date"
                id="fechanac"
                name="fechanac"
                value={fechanac}
                onChange={(e) => setFechanac(e.target.value)}
                required
              />
            </div>
            <div className="info">
              {medicines.map((medicine, index) => (
                <div key={index} className="medicine-group">
                  <div className="form-group">
                    <label htmlFor={`medicineName${index}`}>Medicamento:</label>
                    <input
                      type="text"
                      id={`medicineName${index}`}
                      name="medicineName"
                      value={medicine.name}
                      onChange={(e) =>
                        handleMedicineChange(index, "name", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="form-group dosis-form">
                    <label htmlFor={`dosage${index}`}>Dosis:</label>
                    <input
                      type="text"
                      id={`dosage${index}`}
                      name="dosage"
                      value={medicine.dosage}
                      onChange={(e) =>
                        handleMedicineChange(index, "dosage", e.target.value)
                      }
                      required
                    />
                  </div>
                  <div className="form-group">
                    <label htmlFor={`schedule${index}`}>Horario:</label>
                    <input
                      type="time"
                      id={`schedule${index}`}
                      name="schedule"
                      value={medicine.schedule}
                      onChange={(e) =>
                        handleMedicineChange(index, "schedule", e.target.value)
                      }
                      required
                    />
                  </div>
                  <button
                    className="btn-del"
                    type="button"
                    onClick={() => removeMedicine(index)}
                  >
                    Eliminar
                  </button>
                </div>
              ))}
            </div>
            <button className="btn-adde" type="button" onClick={addMedicine}>
              Añadir Medicamento
            </button>
            <div className="form-group instruc">
              <label htmlFor="instructions">Instrucciones Generales:</label>
              <textarea
                id="instructions"
                name="instructions"
                value={instructions}
                onChange={handleInstructionsChange}
                required
              />
            </div>
            <div className="form-group">
              <label htmlFor="medico">Médico:</label>
              <select
                id="medico"
                name="medico"
                value={selectedMedico?.id || ""}
                onChange={handleMedicoChange}
              >
                {medicos.map((medico) => (
                  <option key={medico.id} value={medico.id}>
                    {medico.nombre.toUpperCase()}
                  </option>
                ))}
              </select>
            </div>
          </form>

          <div className="receta-text-box" ref={recetaRef}>
            <h1 className="receta-title">RECETA MÉDICA</h1>

            <div className="logoo-container">
              <div className="logoo-logoo">
                <img src={logoo} alt="Logo de la empresa" className="logo" />
              </div>
              <div className="subtitulos-receta">
                <div className="subtiit">
                  <strong className="sub">
                    {selectedMedico?.nombre.toUpperCase()}
                  </strong>
                  <p className="sub">
                    MEDICO CIRUJANO CED. PROF.{selectedMedicoDNI}
                  </p>
                  <p className="sub">UNIVERSIDAD......................</p>
                </div>
                <p className="dire">
                  Clinica Dental Vizcaya Calle Benito Crespo 233 entre Fúnez
                  Vásquez de Mercado, Colonia Nueva Vizcaya, 34080 Durango, Dgo.
                </p>
              </div>
              <p className="logoo-container-fecha-hora">
                FECHA Y HORA DE ELABORACIÓN: {fechaActual} {horaActual}
              </p>
            </div>
            <div className="container-form-sub">
              <p>
                <strong>
                  Médico:{selectedMedico?.nombre} DNI: {selectedMedicoDNI}
                </strong>
              </p>
            </div>
            <div className="container-form">
              <p>
                <strong>NOMBRE:</strong> {patientName}
              </p>
              <p>
                <strong>SEXO:</strong> {sexo}____________<strong>EDAD:</strong>{" "}
                {edad}____________<strong>FECHA DE NACIMIENTO:</strong>{" "}
                {fechanac}
              </p>
              <p>
                <strong>MEDICAMENTOS:</strong>
              </p>
              <ul>
                {medicines.map((medicine, index) => (
                  <li key={index}>
                    <strong>{medicine.nombre}</strong> - {medicine.dosage} cada{" "}
                    {medicine.schedule} hrs
                  </li>
                ))}
              </ul>
              <p>
                <strong>INSTRUCCIONES GENERALES:</strong>
                <br />
                {instructions}
              </p>
              <br />
              <br />
              <h3>
                <strong>FIRMA: ____________________________</strong>
              </h3>
            </div>
          </div>
        </div>
        <div className="btn-group">
          <button className="buttonIm" type="button" onClick={handlePrint}>
            Imprimir
          </button>
          {/*<button className="buttonDe" type="button" onClick={handleDownload}>Descargar</button>*/}
        </div>
      </div>
    </div>
  );
};

export default RecetaPaciente;
