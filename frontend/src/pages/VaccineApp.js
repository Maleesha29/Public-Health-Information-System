import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from '../components/Header'; 
import '../styles/VaccineApp.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const VaccineApp = ({ submitted, data }) => {
    const [v_name, setv_name] = useState('');
    const [quantity, setQuantity] = useState('');
    const [date, setDate] = useState('');
    const [location, setLocation] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateSchema = Yup.object().shape({
        v_name: Yup.string().required('Vaccine name is required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
        quantity: Yup.string().required('Quantity is required').matches(/^[.0-9]/, 'Quantity must be a number'),

        date: Yup.string()
            .required('Date is required')
            .test('date', 'Date must be the current date or a future date', function (value) {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                return selectedDate >= currentDate; 
            }),

        location: Yup.string().required('Location is required').matches(/^[A-Za-z\s,.0-9]+$/, 'Location must contain only letters'),
    });

    const navigate = useNavigate();

    useEffect(() => {
        if (!submitted) {
            setv_name('');
            setQuantity('');
            setDate('');
            setLocation('');
        }
    }, [submitted]);

    useEffect(() => {
        if (data?.id && data.id !== 0) {
            setv_name(data.v_name);
            setQuantity(data.quantity);
            setDate(data.date);
            setLocation(data.location);
        }
    }, [data]);

    const navtoTable = () => {
        navigate('/VaccineAppTab');
    }

    const addVacApp = async (event) => {
        event.preventDefault(); 

        try {
            await validateSchema.validate(
                {
                    v_name,
                    quantity,
                    date,
                    location,
                },
                { abortEarly: false }
            );

            const response = await Axios.post('http://localhost:4000/api/addVacApp', {
                v_name: v_name,
                quantity: quantity,
                date: date,
                location: location,
            });

            console.log('Successfully', response.data);

            // Show success message
            Swal.fire("Saved!", "", "success");
        } catch (error) {
            if (error instanceof Yup.ValidationError) {
                const errors = {};
                error.inner.forEach(err => {
                    errors[err.path] = err.message;
                });
                setErrorMessage(errors);
            } else {
                console.error('Error', error);
            }
        }
    };

    return (
        <div>
            <Header />
            <div className='title1'>
                <h2 className="head2">Vaccination Appointments</h2>
                <form className='addvaccineapp'>
                    <div className='input'>
                        <label htmlFor='v_name'>Vaccine Name :</label>
                        <input onChange={e => setv_name(e.target.value)} type='text' id='v_name' autoComplete='off' placeholder='Vaccine Name' />
                        {errorMessage.v_name && <div className="text-danger">{errorMessage.v_name}</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor='quantity'>Quantity :</label>
                        <input onChange={e => setQuantity(e.target.value)} type='text' id='quantity' autoComplete='off' placeholder='Quantity' />
                        {errorMessage.quantity && <div className="text-danger">{errorMessage.quantity}</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor='date'>Date :</label>
                        <input onChange={e => setDate(e.target.value.toString())} type='date' id='date' autoComplete='off' placeholder='Date' />
                        {errorMessage.date && <div className="text-danger">{errorMessage.date}</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor='location'>Location :</label>
                        <input onChange={e => setLocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location' />
                        {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>}
                    </div>
                    <button onClick={navtoTable} className='bappview' type='button'>View Appointments</button>
                    <button onClick={addVacApp} className='bappsave' type='submit'>Save</button>
                </form>
            </div>
        </div>
    );
}

export default VaccineApp;
