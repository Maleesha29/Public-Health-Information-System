import React, { useState, useEffect } from "react";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import * as Yup from 'yup';
import '../../styles/FCNotify.css';
import Layout from '../../components/Layout';
import { useLocation, useNavigate } from 'react-router-dom';
import FCSendEvi from './FCSendEvi';

const FCNotify = () => {
  const [email, setemail] = useState('');
  const [Vname, setName] = useState('');
  const [vdate, setvdate] = useState('');
  const [panelty, setPanelty] = useState('');
  const [policeStation, setpoliceStation] = useState('');
  const [date, setdate] = useState('');
  const [aname, setaname] = useState('');
  const [violationType, setViolationType] = useState('');
  const [cNumber, setcNumber] = useState('');
  const [errors, setErrors] = useState({});
  const [evidence, setEvidence] = useState([]);
  const [caseId, setCaseId] = useState('');
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { _id, v_name, v_email, date, v_type, evidence, c_number  } = location.state;
      setName(v_name);
      setemail(v_email);
      setvdate(date);
      setViolationType(v_type);
      setEvidence(evidence);
      setCaseId(_id);
      setcNumber(c_number);
    }
  }, [location.state]);

  const validationSchema = Yup.object().shape({
    cNumber: Yup.string().required('Case Number is required').matches(/^\d+$/, 'Case Number must contain numbers only'),
    panelty: Yup.string().required('Action is required'),
    policeStation: Yup.string().required('Police Station is required').matches(/^[a-zA-Z\s]+$/, 'Police Station must contain letters only'),
    date: Yup.string()
      .required('Due Date is required')
      .test('date', 'Due Date must be after Violated Date', function (value) {
        const selectedDate = new Date(value);
        const violatedDate = new Date(vdate);
        return selectedDate > violatedDate;
      }),
    aname: Yup.string().required('Analyse By is required').matches(/^[a-zA-Z\s]+$/, 'Analyse By must contain letters only'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      await validationSchema.validate({
        cNumber,
        panelty,
        policeStation,
        date,
        aname,
      }, { abortEarly: false });

      const formattedDate = new Date(date);
      const serviceID = 'service_0r9kntj';
      const templateID = 'template_hrj18ia';
      const publicKey = 'evKLHFlH0AuDv1opA';

      const templateParams = {
        cNumber: cNumber,
        email: email,
        Vname: Vname,
        vtype: violationType,
        vdate: formattedDate.toLocaleDateString(),
        panelty: panelty,
        policeStation: policeStation,
        date: formattedDate.toLocaleDateString(),
        aname: aname
      };

      emailjs.send(serviceID, templateID, templateParams, publicKey)
        .then((response) => {
          console.log('Email Sent Successfully', response);
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Email sent successfully!',
            allowOutsideClick: false,
            confirmButtonText: 'OK'
          }).then(() => {
            if (panelty === "Fine only") {
              navigate('/Fine-And-court-Analyse');
            }
          });
        })
        .catch((error) => {
          console.error('Error sending Email', error);
        });

    } catch (error) {
      const validationErrors = {};
      if (error instanceof Yup.ValidationError) {
        error.inner.forEach(err => {
          validationErrors[err.path] = err.message;
        });
      }
      setErrors(validationErrors);
    }
  };

  return (
    <Layout>
      <div className="form1">
        <form onSubmit={handleSubmit} className="emailForm">
          <h2>Notify Violator</h2>
          <div className="row">
            <div className="col">
              <label>Case Number:</label>
              <input type="number" name="cNumber" value={cNumber} onChange={(e) => setcNumber(e.target.value)} className="inputField"/>
              {errors.cNumber && <div className="error">{errors.cNumber}</div>}
            </div>
            <div className="col">
              <label>Email:</label>
              <input type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} readOnly className="inputField"/>
            </div>
            <div className="col">
              <label>Violator Name:</label>
              <input type="text" name="Vname" value={Vname} onChange={(e) => setName(e.target.value)} readOnly className="inputField"/>
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Violation Type:</label>
              <div>
                <input type="radio" id="foodViolation" name="violationType" value="Food Violation" checked={violationType === "Food Violation"} onChange={(e) => setViolationType(e.target.value)} disabled className="inputField"/>
                Food Violation
              </div>
              <div>
                <input type="radio" id="dengueViolation" name="violationType" value="Dengue Violation" checked={violationType === "Dengue Violation"} onChange={(e) => setViolationType(e.target.value)} disabled/>
                Dengue Violation
              </div>
            </div>
            <div className="col">
              <label>Violated Date:</label>
              <input type="date" name="vdate" value={vdate} onChange={(e) => setvdate(e.target.value)} readOnly className="inputField"/>
            </div>
            <div className="col">
              <label>Action:</label>
              <div>
                <input type="radio" id="fineOnly" name="panelty" value="Fine only" checked={panelty === "Fine only"} onChange={(e) => setPanelty(e.target.value)} className="inputField"/>
                Fine only
              </div>
              <div>
                <input type="radio" id="courtAction" name="panelty" value="Court Action" checked={panelty === "Court Action"} onChange={(e) => setPanelty(e.target.value)} />
                Court Action
              </div>
              {errors.panelty && <div className="error">{errors.panelty}</div>}
            </div>
          </div>
          <div className="row">
            <div className="col">
              <label>Police Station:</label>
              <input type="text" name="policeStation" value={policeStation} onChange={(e) => setpoliceStation(e.target.value)} className="inputField"/>
              {errors.policeStation && <div className="error">{errors.policeStation}</div>}
            </div>
            <div className="col">
              <label>Due Date:</label>
              <input type="date" name="date" value={date} onChange={(e) => setdate(e.target.value)} className="inputField"/>
              {errors.date && <div className="error">{errors.date}</div>}
            </div>
            <div className="col">
              <label>Analyse By:</label>
              <input type="text" name="aname" value={aname} onChange={(e) => setaname(e.target.value)} className="inputField"/>
              {errors.aname && <div className="error">{errors.aname}</div>}
            </div>
          </div>
          <button className='notifyBut' type="submit">Send Email</button>
        </form>
      </div>
      <div>
        {panelty === "Court Action" && <FCSendEvi caseId={caseId} caseNumber={cNumber} />}
      </div>
    </Layout>
  )
}

export default FCNotify;
