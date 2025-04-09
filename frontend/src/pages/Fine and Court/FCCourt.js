import React, { useEffect, useState } from "react";
import '../../styles/FCRS.css';
import Layout from '../../components/Layout';
import 'jspdf-autotable';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';
import { useNavigate } from 'react-router-dom';

const FCCourt = () => {
  const [cNumber, setcNumber] = useState('');
  const [email, setemail] = useState('');
  const [Vname, setVname] = useState('');
  const [Oname, setOname] = useState('');
  const [evidence, setevidence] = useState('');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();

    const serviceID = 'service_5f4dgy6';
    const templateID = 'template_y83s7pa';
    const publicKey = 'evKLHFlH0AuDv1opA';

    const templateParams = {
      cNumber: cNumber,
      email: email,
      Oname: Oname,
      Vname: Vname,
      evidence: evidence,
    };

    emailjs.send(serviceID, templateID, templateParams, publicKey)
      .then((response) => {
        console.log('Email Sent Successfully', response);
        setcNumber('');
        setemail('');
        setOname('');
        setVname('');
        setevidence('');
        Swal.fire({
          icon: 'success',
          title: 'Success',
          text: 'Email sent successfully!',
          allowOutsideClick: false,
          confirmButtonText: 'OK'
        }).then(() => {
          navigate('/Fine-And-court');
        });
      })
      .catch((error) => {
        console.error('Error sending Email', error);
      });
  };

  return (
    <Layout>
    <div>
      <form onSubmit={handleSubmit} className="emailForm">
        <h2>Notify Violator</h2>
        <div>
          <label>Case Number:</label>
          <input type="Number" name="cNumber" value={cNumber} onChange={(e) => setcNumber(e.target.value)} />
        </div>
        <div>
          <label>Court Email:</label>
          <input type="Email" name="email" value={email} onChange={(e) => setemail(e.target.value)} />
        </div>
        <div>
          <label>Officer Name:</label>
          <input type="text" name="Oname" value={Oname} onChange={(e) => setOname(e.target.value)} />
        </div>
        <div>
          <label>Violator Name:</label>
          <input type="text" name="Vname" value={Vname} onChange={(e) => setVname(e.target.value)} />
        </div>
        <div>
          <label>Evidence:</label>
          <input type="text" name="Evidence" value={evidence} onChange={(e) => setevidence(e.target.value)} />
        </div>
        <button className='notifyBut' type="submit">Send Email</button>
      </form>
    </div>
    </Layout>
  );
};

export default FCCourt;
