import React, { useEffect, useState } from 'react';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';
import { motion } from 'framer-motion';
import '../styles/AdminClinic.css';

const Dengue = () => {
    const [dgClinics, setDgClinics] = useState([]);
    const navigate = useNavigate();

    const [searchQuery, setSearchQuery] = useState('');

    const getDgClinics = async () => {
        try {
            const response = await Axios.get('http://localhost:4000/api/Clinics');
            const dengueClinicsData = response.data.allClinics.filter(clinic => clinic.ctype === 'Dengue');
            setDgClinics(dengueClinicsData);
        } catch (error) {
            console.error('Axios error:', error);
        }
    };

    useEffect(() => {
        getDgClinics();
    }, []);

    const filteredDgClinicData = dgClinics.filter(clinic => {
        return clinic.uname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <Layout>
            <motion.div className="progress-bar"
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -50 }}
                transition={{ duration: 0.5 }}

            >
                <div>
                    <div className='adminClinic'>
                        <br />
                        <h3>Dengue Clinics</h3><br />
                        <input placeholder="Search doctor name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} /><br />
                        <TableContainer component={Paper}>
                            <Table>
                                <TableHead>
                                    <TableRow>
                                        <TableCell>Date</TableCell>
                                        <TableCell>Time</TableCell>
                                        <TableCell>Doctor name</TableCell>
                                        <TableCell>Venue</TableCell>
                                        <TableCell>Actions</TableCell>
                                    </TableRow>
                                </TableHead>
                                <TableBody>
                                    {filteredDgClinicData && filteredDgClinicData.length > 0 ? (
                                        filteredDgClinicData.map((clinic) => (
                                            <TableRow key={clinic._id}>
                                                <TableCell>{new Date(clinic.date).toLocaleDateString()}</TableCell>
                                                <TableCell>{new Date(clinic.date).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                                                <TableCell>Dr .{clinic.uname}</TableCell>
                                                <TableCell>{clinic.venue}</TableCell>
                                                <TableCell>
                                                    <Button onClick={() => navigate(`/addpatients/${clinic._id}/${clinic.date}/${clinic.venue}/${clinic.ctype}`)}>Join</Button>
                                                </TableCell>
                                            </TableRow>
                                        ))
                                    ) : (
                                        <TableRow>
                                            <TableCell colSpan={4}>You have no Dengue Clinics added yet!!</TableCell>
                                        </TableRow>
                                    )}
                                </TableBody>
                            </Table>
                        </TableContainer>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
};

export default Dengue;
