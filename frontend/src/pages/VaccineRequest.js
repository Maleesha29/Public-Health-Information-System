import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import '../styles/VaccineRequest.css'
import Axios from 'axios';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent, Table, TableHead, TableRow, TableBody, TableCell } from '@mui/material';
import { Link } from 'react-router-dom';

const VaccineRequest = () => {
    const [bvaccinedata, setbvaccinedata] = useState([]);
    const [stvreqpdata, setstvreqpdata] = useState({});
    const [open, setOpen] = useState(false);
    const [notification, setnotification] = useState('');

    useEffect(() => {
        getbvaccinedata();
    }, []);

    const functionPopup = (babyvacc) => {
        setOpen(true);
        setstvreqpdata(babyvacc);
    }

    const closePopup = () => {
        setOpen(false);
    }

    const getbvaccinedata = () => {
        Axios.get('http://localhost:4000/api/babyvacc')
            .then(response => {
                console.log('data from sever', response.data);
                setbvaccinedata(response.data.allBVac);
            })
            .catch(error => {
                console.error('Axios error:', error);
            })
    }

    const handleDelete = async (id) => {
        
        try {
            await Axios.post('http://localhost:4000/api/deleteVacRq', { _id: id });
            setbvaccinedata((prevvaqreq) => prevvaqreq.filter((bvaccine) => bvaccine._id !== id));
            console.log('Vac deleted successfully');
        } catch (error) {
            console.error('Error deleting vac:', error);
        }
    };


    const addVacRq = async () => {
        try {
            const response = await Axios.post("http://localhost:4000/api/addVacRq", {
                type: stvreqpdata.type,
                esti_Date: stvreqpdata.esti_Date,
                quantity: stvreqpdata.quantity,
                notification: notification,
            });
            console.log("Successfully", response.data);
            setOpen(false);
            setnotification('');

            Swal.fire({
                title: "Success!",
                text: "Status added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 1500
            });

        } catch (error) {
            console.error("error", error);
        }
    }

    return (
        <>
            <Layout>
                <div className='adminClinic'>
                    <Table border={1} cellPadding={10} cellSpacing={0}>
                        <TableHead>
                            <TableRow>
                                <TableCell>Vaccine Type</TableCell>
                                <TableCell>Estimated Date</TableCell>
                                <TableCell>Quantity</TableCell>
                                <TableCell>Status</TableCell>
                                

                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {bvaccinedata && bvaccinedata.length > 0 ? (
                                bvaccinedata.map((bvaccine) => (
                                    <TableRow key={bvaccine._id}>
                                        <TableCell>{bvaccine.type}</TableCell>
                                        <TableCell>{bvaccine.esti_Date}</TableCell>
                                        <TableCell>{bvaccine.quantity}</TableCell>
                                        <TableCell className='actionButtons'>
                                            <button onClick={() => functionPopup(bvaccine)}>Status</button>
                                        </TableCell>
                                       
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell colSpan="5">You have no baby vaccine data</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </div>
                <Dialog open={open} onClose={closePopup}>
                    <DialogTitle>Status</DialogTitle>
                    <DialogContent>
                        <p>{stvreqpdata.type}</p>
                        <p>{stvreqpdata.esti_Date}</p>
                        <p>{stvreqpdata.quantity}</p>
                        <input type='text' onChange={(e) => setnotification(e.target.value)} />
                        <Link to="/VaccineRequestTab">
                            <button onClick={addVacRq}>Submit</button>
                        </Link>
                        <button onClick={closePopup}>Close</button>
                    </DialogContent>
                </Dialog>
            </Layout>
        </>
    )
}

export default VaccineRequest;
