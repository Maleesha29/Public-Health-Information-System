import React, { useState, useEffect, useRef } from "react";
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import '../../styles/FCNotify.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Axios from "axios";
import * as Yup from 'yup';

const FCSendEvi = ({ caseId, caseNumber }) => {
  const [email, setemail] = useState('');
  const [Vname, setName] = useState('');
  const [vdate, setvdate] = useState('');
  const [violationType, setViolationType] = useState('');
  const [evidence, setEvidence] = useState([]);
  const [errors, setErrors] = useState({});
  const form = useRef(null);
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (location.state) {
      const { v_name, date, v_type } = location.state;
      setName(v_name);
      setvdate(date);
      setViolationType(v_type);
    }

    getReportData();
  }, [location.state, caseId]);

  const getReportData = () => {
    Axios.get('http://localhost:4000/api/VioReports')
      .then(response => {
        console.log('Data from Server', response.data);
        const allReports = response.data.allVioReports;
        const report = allReports.find(report => report._id === caseId);
        if (report) {
          setEvidence(report.evidence);
        } else {
          console.error('Report not found');
        }
      })
      .catch(error => {
        console.error('Axios Error : ', error);
      });
  };

  const validationSchema = Yup.object().shape({
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Gmail address').required('Email is Required'),
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await validationSchema.validate({
        email,
      }, { abortEarly: false });

      const formData = new FormData(form.current);

      evidence.forEach((evidenceItem, index) => {
        formData.append(`file_${index}`, evidenceItem.data, `evidence_${index}.${evidenceItem.contentType}`);
      });

      emailjs.sendForm('service_0r9kntj', 'template_y83s7pa', form.current, {
        publicKey: 'evKLHFlH0AuDv1opA',
      }).then(
        () => {
          console.log('Email Sent Successfully');
          Swal.fire({
            icon: 'success',
            title: 'Success',
            text: 'Email sent successfully!',
            allowOutsideClick: false,
            confirmButtonText: 'OK'
          }).then(() => {
            navigate('/Fine-And-court-Analyse');
          });
        },
        (error) => {
          console.error('Error sending Email', error);
          Swal.fire({
            icon: 'error',
            title: 'Error',
            text: 'An error occurred while sending the email. Please try again later.',
            allowOutsideClick: false,
            confirmButtonText: 'OK'
          });
        }
      );

    } catch (error) {
      console.error('Validation Error', error);

      const validationErrors = {};
      error.inner.forEach(err => {
        validationErrors[err.path] = err.message;
      });

      setErrors(validationErrors);
    }
  };


  return (
    <div className="form1">
      <form ref={form} onSubmit={handleSubmit} className="emailForm">
        <h2>Send Evidences</h2>
        <div className="row">
          <div className="col">
            <label>Case Number:</label>
            <input type="text" name="cNumber" value={caseNumber} readOnly />
          </div>
          <div className="col">
            <label>Court Email:</label>
            <input type="email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
            {errors.email && <div className="error">{errors.email}</div>}
          </div>
          <div className="col">
            <label>Violator Name:</label>
            <input type="text" name="Vname" value={Vname} readOnly />
          </div>
        </div>
        <div className="row">
          <div className="col">
            <label>Violation Type:</label>
            <div>
              <input type="radio" id="foodViolation" name="violationType" value="Food Violation" checked={violationType === "Food Violation"} disabled />
              Food Violation
            </div>
            <div className="col">
              <input type="radio" id="dengueViolation" name="violationType" value="Dengue Violation" checked={violationType === "Dengue Violation"} disabled />
              Dengue Violation
            </div>
          </div>
          <div className="col">
            <label>Violated Date:</label>
            <input type="date" name="vdate" value={vdate} readOnly />
          </div>
        </div>
        <div className="row">
          <div >
            <label>Evidences:</label>
            {evidence && evidence.length > 0 ? (
              evidence.map((evidenceItem, index) => (
                <img
                  key={index}
                  src={`data:${evidenceItem.contentType};base64,${evidenceItem.data}`}
                  alt={`Evidence ${index + 1}`}
                  className="image-container"
                />
              ))
            ) : (
              <span>No evidence available</span>
            )}
          </div>
        </div>
        <button className='notifyBut' type="submit">Send Email</button>
      </form>
    </div>
  );
};

export default FCSendEvi;
