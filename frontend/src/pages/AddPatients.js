import React, { useEffect, useState } from 'react'
import { Button, Form, Alert } from 'react-bootstrap'
import Layout from '../components/Layout'
import '../styles/addPatient.css';
import Swal from 'sweetalert2'
import Axios from 'axios';
import { useParams } from 'react-router-dom';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import jspdf from 'jspdf';
import { motion } from 'framer-motion';
import * as Yup from 'yup';
import logo1 from '../webImages/logo1.png';
import { FaFilePdf } from 'react-icons/fa';

const AddPatients = () => {


  //const navigate = useNavigate();

  const { _id, date, venue, ctype } = useParams();

  const [name, setName] = useState('');
  const [gender, setGender] = useState('');
  const [age, setAge] = useState(0);
  const [address, setAddress] = useState('');
  const [mobile, setMobile] = useState(0);
  const [errorMessage, setErrorMessage] = useState('');

  const [open, openConfirm] = useState(false);

  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Name is required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    gender: Yup.string().required('Gender is Required'),
    age: Yup.number().required('Age is required').min(1, 'Age must be greater than 0'),
    address: Yup.string().required('Address is required').matches(/^[A-Za-z\s,./0-9]+$/, 'Address must contain only letters and numbers'),
    mobile: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact Number is Required'),
  })

  const functionPopup = async () => {

    try {
      await validateSchema.validate(
        {
          name,
          gender,
          age,
          address,
          mobile,
        },
        { abortEarly: false }

      );
      openConfirm(true);
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      }
    }
  }

  const closepopup = () => {
    openConfirm(false);
  }


  //generatePDF
  const confirmWithGetPDF = () => {
    const doc = new jspdf();
    let y = 10;

    const logo = new Image();
    logo.src = logo1; // Use the imported logo image
    doc.addImage(logo, 'PNG', 6, 7, 20, 20); // Adjust the position and dimensions as needed

    // Add Public Health Information System as the letterhead
    doc.setFontSize(12);
    doc.text('Public Health Information System', 70, 15); // Adjust the position as needed
    doc.text('Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha,', 70, 20);
    doc.text('Colombo 10, Sri Lanka.', 70, 25);
    doc.text('Tel: 112 694033, 112 675011, 112 675449, 112 693493', 70, 30);

    // Add page border
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'S');

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(5, 45, 205, 45);

    // Leave summary topic
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text('Patient details', 90, 60); // Adjust the position as needed

    const genPDF = `\n\n 
                      Name : ${name}\n
                      Gender : ${gender}\n
                      Age : ${age}\n
                      Mobile : ${mobile}\n
                      Address : ${address}\n\n\n
                      Clinic details \n\n
                      Type : ${ctype}\n
                      Date : ${new Date(date).toLocaleDateString()}\n
                      Time : ${new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}\n
                      Venue : ${venue}\n\n
                      Please be on time\tThank you
                      \n
                      Public Health Information Technical Team
                      `;
    doc.text(genPDF, 10, 50);


    doc.save(`${name}_${ctype}_appointment_report.pdf`);

    addPatient();
  }

  //add patients
  const addPatient = async () => {
    openConfirm(false);
    try {
      const response = await Axios.post('http://localhost:4000/api/addPatients', {
        name,
        sex: gender,
        age,
        address,
        mobile,
        clinicID: _id
      });

      console.log('Patient added to queue successfully', response.data);

      setName('');
      setGender('');
      setAge(0);
      setAddress('');
      setMobile(0);

      Swal.fire({
        title: "Success!",
        text: "You have been appointed to queue!",
        icon: "success",
        showConfirmButton: false,
        timer: 2000
      });

    } catch (error) {
      console.error('Error:', error);
    }
  }



  return (
    <>
      <Layout>
        <motion.div className="progress-bar"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -50 }}
          transition={{ duration: 0.5 }}
        >
          <div className='addform'>
            <h2>Admission form</h2>
            <Form>
              <Form.Group className='padd'>
                <p>Your Name</p>
                <Form.Control
                  type='text'
                  size='sm'
                  value={name}
                  onChange={e => setName(e.target.value)}
                />
              </Form.Group>
              {errorMessage.name && <div className="d-flex justify-content-center text-danger">{errorMessage.name}</div>}
              <br />
              <Form.Group className='padd'>
                <p>Age</p>
                <Form.Control
                  type='number'
                  size='sm'
                  value={age}
                  min={0}
                  onChange={e => setAge(e.target.value)}
                />
              </Form.Group>
              {errorMessage.age && <div className="d-flex justify-content-center text-danger">{errorMessage.age}</div>}
              <br />
              <Form.Group className='padd'>
                <p>Gender</p>
                <Form.Control as='select' size='sm' value={gender} onChange={e => setGender(e.target.value)}>
                  <option>Select Gender</option>
                  <option>Male</option>
                  <option>Female</option>
                  <option>Other</option>
                </Form.Control>
              </Form.Group>
              {errorMessage.gender && <div className="d-flex justify-content-center text-danger">{errorMessage.gender}</div>}
              <br />
              <Form.Group className='padd'>
                <p>Address :</p>
                <Form.Control
                  type='text'
                  size='sm'
                  value={address}
                  onChange={e => setAddress(e.target.value)}
                />
              </Form.Group>
              {errorMessage.address && <div className="d-flex justify-content-center text-danger">{errorMessage.address}</div>}
              <br />
              <Form.Group className='padd'>
                <p>Mobile :</p>
                <Form.Control
                  type='number'
                  size='sm'
                  value={mobile}
                  min={0}
                  maxLength={10}
                  onChange={e => setMobile(e.target.value.slice(0, 10))}
                />
              </Form.Group>
              {errorMessage.mobile && <div className="d-flex justify-content-center text-danger">{errorMessage.mobile}</div>}
              <br />
              <Button onClick={functionPopup}>Submit</Button>
            </Form>
          </div>
        </motion.div>
      </Layout>
      <Dialog open={open}>
        <DialogTitle><h2>Appointment Confirmation</h2></DialogTitle>
        <DialogContent>
          <Form>
            <h3>Your details</h3>
            <p>Name : {name}</p>
            <p>Gender : {gender}</p>
            <p>Age : {age}</p>
            <p>Mobile : {mobile}</p>
            <p>Address : {address}</p>
            <br />
            <h3>Clinic details</h3>
            <p>Type : {ctype}</p>
            <p>Date : {new Date(date).toLocaleDateString()}</p>
            <p>TIme : {new Date(date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</p>
            <p>Venue : {venue}</p>

            <div className='btns'>
              <Button className='btnaddp' onClick={addPatient}>Confirm appointment</Button>
              <Button className='btnaddp' onClick={confirmWithGetPDF}>Confirm with get pdf <FaFilePdf /></Button>
              <Button className='btnaddp' onClick={closepopup}>Decline</Button>
            </div>
          </Form>
        </DialogContent>
      </Dialog>
    </>
  )
}

export default AddPatients
