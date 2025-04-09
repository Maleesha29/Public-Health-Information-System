import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import { Link } from 'react-router-dom';
import '../styles/Vaccineschedules.css';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Alert from 'react-bootstrap/Alert'; // Import Bootstrap Alert component
import { Dialog, DialogTitle, DialogContent } from '@mui/material';


const Vaccineschedules = ({ submitted, data }) => {
    // State variables
    const [vaccineappdata, setvaccineappdata] = useState([]);
    const [stvacdata, setstvacdata] = useState([]);
    const [open, setOpen] = useState(false); // Renamed openConfirm to setOpen
    const [staffmember, setstaffmember] = useState('');

    useEffect(() => {
        getvaccineappdata();
    }, []);

    const functionPopup = (vaccineapp) => {
        setOpen(true); 
        setstvacdata(vaccineapp);
    
    }

    const closepopup = () => {
        setOpen(false); // Renamed openConfirm to setOpen
    }

    const getvaccineappdata = () => {
        Axios.get('http://localhost:4000/api/VacccinesApp')
            .then(response => {
                console.log('data from server', response.data);
                setvaccineappdata(response.data.allVaccineAppointments);
            })
            .catch(error => {
                console.error("Axios error: ", error);
            })
    };

    const addstaffvaccine = async () => {
        try {
            const response = await Axios.post("http://localhost:4000/api/addstaffvaccine", {
                v_name: stvacdata.v_name,
                quantity: stvacdata.quantity,
                date: stvacdata.date, // Date
                location: stvacdata.location,
                staffmember: staffmember
            });
            console.log("Successfully", response.data);
            setOpen(false);
            setstaffmember('');

            Swal.fire({
                title: "Success!",
                text: "Staff added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
              });

        } catch (error) {
            console.error("error", error);
        }
    };

    return (
        <>
            <Layout>
                <div className='VaccineAppTab'>
                    <table border={1} cellPadding={10} cellSpacing={0}>
                        <thead>
                            <tr>
                                <th>Vaccine Name</th>
                                <th>Quantity</th>
                                <th>Date</th>
                                <th>Location</th>
                                <th>Assign staff</th>
                            </tr>
                        </thead>
                        <tbody>
                            {vaccineappdata && vaccineappdata.length > 0 ? (
                                vaccineappdata.map((vaccineapp) => (
                                    <tr key={vaccineapp._id}>
                                        <td>{vaccineapp.v_name}</td>
                                        <td>{vaccineapp.quantity}</td>
                                        <td>{vaccineapp.date}</td>
                                        <td>{vaccineapp.location}</td>
                                        <td className='actionButtons'>
                                            <button onClick={() => functionPopup(vaccineapp)}>Assign Staff</button>
                                        </td>
                                    </tr>
                                ))
                            ) : (
                                <tr>
                                    <td>You have not added any vaccine Appointments</td>
                                </tr>
                            )}
                        </tbody>
                    </table>
                </div>
            </Layout>
            <Dialog open={open} onClose={closepopup}> {/* Added onClose prop to Dialog component */}
                <DialogTitle>Assign staff</DialogTitle>
                <DialogContent>
                    <p>{stvacdata.v_name}</p>
                    <p>{stvacdata.quantity}</p>
                    <p>{stvacdata.date}</p>
                    <p>{stvacdata.location}</p>
                    <input type='text' onChange={(e) => setstaffmember(e.target.value)} />
                    <button onClick={addstaffvaccine}>Submit</button>
                    <button onClick={closepopup}>Close</button>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default Vaccineschedules;
