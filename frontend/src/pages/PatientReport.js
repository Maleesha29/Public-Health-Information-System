import React, { useState } from 'react'
import Layout from '../components/Layout'
import { Button, Form, Alert } from 'react-bootstrap'
import '../styles/patientsReport.css';
import jspdf from 'jspdf';
import Swal from 'sweetalert2'
import { Dialog, DialogTitle, DialogContent } from '@mui/material';
import { FaTimes } from 'react-icons/fa';
import { motion } from 'framer-motion';

const PatientReport = () => {
    const [name, setname] = useState('');
    const [stype, setstype] = useState('');
    const [status, setStatus] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [open, setopen] = useState(false);

    const handlePopup = () => {
        if (!name || !stype || !status) {
            setErrorMessage('No details to generate pdf');
            return;
        } else {
            setopen(true);
        }
    }

    const dialogoff = () => {
        setopen(false);
    }


    const genReport = async () => {

        if (!name || !stype || !status) {
            setErrorMessage('No details to generate pdf');
            return;
        } else {
            const doc = new jspdf();
            let y = 10;

            const genPDF = `Public Health Information System
                            \nPatient details\n
                            ---------------\n 
                            Name : ${name}\n
                            Illness : ${stype}\n
                            Status : ${status}\n\n\n
                            Monitored by : null yet\n\n
                            Offered by : Public Health Information System
                            `;
            doc.text(genPDF, 10, y);
            y += 50;

            doc.save(`${name}_report.pdf`);
            Swal.fire({
                title: "Success!",
                text: "PDF download success!",
                icon: "success",
                showConfirmButton: false,
                position: "top-end",
                timer: 2000
            })

            setname('');
            setstype('');
            setStatus('');
        }
    }
    return (
        <Layout>
            <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}
            >
                <div className='ptrep'>
                    <div className='formptnt'>
                        <h2>Generate report</h2>
                        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}
                        <p>Patient name</p>
                        <Form.Group>
                            <Form.Control

                                value={name}
                                onChange={e => setname(e.target.value)}
                                type='text' />
                        </Form.Group>
                    </div>
                    <br />
                    <div className='formptnt'>
                        <p>Patient sickness</p>
                        <Form.Group>
                            <Form.Control
                                as='select'
                                value={stype}
                                onChange={e => setstype(e.target.value)}>
                                <option>Dengue</option>
                                <option>Dental</option>
                            </Form.Control>
                        </Form.Group>
                    </div>
                    <br />
                    <div className='formptnt'>
                        <p>Patient Status</p>
                        <Form.Group>
                            <Form.Control
                                type='text'
                                value={status}
                                onChange={e => setStatus(e.target.value)}
                            />
                        </Form.Group>
                    </div>
                    <br />
                    <Button onClick={handlePopup}>Generate report</Button>
                </div>
            </motion.div>
            <Dialog open={open}>
                <DialogTitle>Confirmation dialog <FaTimes onClick={dialogoff} /></DialogTitle>
                <DialogContent>
                    <h3>Patient details</h3>
                    <p>Patient name : {name}</p>
                    <p>Patient sickness : {stype}</p>
                    <p>Patient status : {status}</p>

                    <Button onClick={genReport}>Confirm</Button>
                </DialogContent>
            </Dialog>

        </Layout>
    )
}

export default PatientReport;
