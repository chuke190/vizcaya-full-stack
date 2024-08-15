import React, { useState } from 'react';
import '../styles/ConsentimientoInformado.css';
import Nav from '../components/Nav';

const ConsentimientoInformado = () => {
  const [patientName, setPatientName] = useState('');
  const [doctorName, setDoctorName] = useState('');
  const [date, setDate] = useState('');
  const [nomber, setNomber] = useState('');
  const [curp, setCurp] = useState('');
  const [domicilio, setDomicilio] = useState('');
  const [tutor, setTutor] = useState('');

  return (
    <div className="consentimiento-body">
      <Nav/>
      <div className="consentimiento-container">
        <h2>Consentimiento Informado</h2>
        <div className="consentimiento-content">
          <div className="consentimiento-form">
            <form>
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
                <label htmlFor="doctorName">Nombre del Odontólogo/a:</label>
                <input
                  type="text"
                  id="doctorName"
                  name="doctorName"
                  value={doctorName}
                  onChange={(e) => setDoctorName(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="date">Fecha:</label>
                <input
                  type="date"
                  id="date"
                  name="date"
                  value={date}
                  onChange={(e) => setDate(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="nombere">Matricula:</label>
                <input
                  type="number"
                  id="nombere"
                  name="nomber"
                  value={nomber}
                  onChange={(e) => setNomber(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="curp">CURP:</label>
                <input
                  type="text"
                  id="curp"
                  name="curp"
                  value={curp}
                  onChange={(e) => setCurp(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="domicilio">Domicilio:</label>
                <input
                  type="text"
                  id="domicilio"
                  name="domicilio"
                  value={domicilio}
                  onChange={(e) => setDomicilio(e.target.value)}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="tutor">Padre/madre o tutor/a del/la menor:</label>
                <input
                  type="text"
                  id="tutor"
                  name="tutor"
                  value={tutor}
                  onChange={(e) => setTutor(e.target.value)}
                  required
                />
              </div>
            </form>
          </div>
          <div className="consentimiento-text">
            <p>D./Dâ <strong>{nomber}</strong> con CURP <strong>{curp}</strong> con domicilio en <strong>{domicilio}</strong> actuando en:</p>
            <p><strong>{patientName}</strong> mi propio nombre,</p>
            <p>como padre/madre o tutor/a del/la menor <strong>{tutor}</strong></p>
            <p><strong>MANIFIESTO QUE:</strong></p>
            <p>
              He recibido del/la Odontólogo/a <strong>{doctorName}</strong> toda la información
              necesaria, de forma confidencial, clara, comprensible y satisfactoria sobre la naturaleza y propósito de los objetivos, procedimientos, temporalidad y honorarios que se seguirán a lo largo del proceso que se deriva de la demanda que al mismo he formulado, una vez efectuada la inicial valoración profesional que al mismo/a corresponde, aplicándose al efecto la obligación de confidencialidad y el resto de los preceptos que rigen en el
              Código Deontológico y normas de deontología profesional de la Odontología.
              Así mismo reconozco expresamente que el odontólogo/a me ha informado de la necesidad de informar al otro/a padre/madre respecto de la intervención solicitada para lo cual el/la solicitante se compromete a comunicárselo,
              eximiendo al odontólogo/a de realizar tal comunicación, por expresado motivo.
            </p>
            <p>
              Que, una vez valorada la necesidad del tratamiento o intervención precisa, de la que he recibido información en los términos antes indicados, ACUERDO Y COMPROMETO con el Odontólogo/a que suscribe este documento, que será solo él/ella quien se encargará de prestarlo, conforme a indicada información.
              Así mismo quedo informado de que el presente consentimiento PODRA SER REVOCADO LIBREMENTE, en cualquier momento, tanto por el paciente como por el profesional, de acuerdo con lo establecido en la legislación aplicable.
            </p>
            <p className="consentimiento-signature">
              Fecha: <strong>{date}</strong>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConsentimientoInformado;
