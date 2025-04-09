import React, { useEffect, useState } from "react";
import Layout from "../components/Layout";
import Header from '../components/Header'; 
import '../styles/VaccineReg.css'
import Axios from 'axios';
import { useNavigate } from "react-router-dom";
import Swal from 'sweetalert2';
import * as Yup from 'yup';

const VaccineReg = () => {
    const [vname, setVname] = useState('');
    const [manf_date, setManf_date] = useState('');
    const [expi_Date, setExpi_Date] = useState('');
    const [quantity, setQuantity] = useState('');
    
    const [notes, setNotes] = useState('');
    const [errorMessage, setErrorMessage] = useState('');

    const validateSchema = Yup.object().shape({
        vname: Yup.string().required('vaccine name is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
        manf_date: Yup.string().required('Manfacture Date is Required'),
        expi_Date: Yup.string().required('Expire Date is Required'),
        quantity: Yup.string().required('Quantity is Required').matches(/^[.0-9]/,'Quantity must be a number'),
        
        notes: Yup.string().required('Note is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'notes must contain only letters'),
    });

    const navigate = useNavigate();

    const navtoTable = () => {
        navigate('/VaccineRegTab');
    }

    const addvacc = async () => {
        
        Swal.fire({
            title: "Do you want to save the data?",
            showCancelButton: true,
            confirmButtonText: "Save",
        }).then((result) => {
            if (result.isConfirmed) {
                
                saveData(); 
            } else if (result.isDenied) {
                
            }
        });
    };

    const saveData = async () => {
        try {
            await validateSchema.validate({
                vname,
                manf_date,
                expi_Date,
                quantity,
                
                notes,
            }, { abortEarly: false });

            const response = await Axios.post('http://localhost:4000/api/addVac', {
                vname: vname,
                manf_date: manf_date,
                expi_Date: expi_Date,
                quantity: quantity,
                
                notes: notes,
            });

            console.log('Successfully', response.data);

            
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
            <div className='titleVac'>
                <h2 className="head2">Vaccine Registration</h2>
                            
                <form className='addvaccine'>
                    <div className='input'>
                        <label htmlFor='vname'>Vaccine Name :</label>
                        <input onChange={e => setVname(e.target.value)} type='text' id='vname' autoComplete='off' placeholder='Vaccine Name' value={vname} />
                        {errorMessage.vname && <div className="text-danger">{errorMessage.vname}</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor='ManDate'>Manufactured date:</label>
                        <input onChange={e => setManf_date(e.target.value.toString())} type='date' id='ManDate' autoComplete='off' placeholder='Manufactured date' value={manf_date} />
                        {errorMessage.manf_date && manf_date === '' && <div className="text-danger">Invalid Date</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor='ExDate'>Expiration date :</label>
                        <input onChange={e => setExpi_Date(e.target.value.toString())} type='date' id='ExDate' autoComplete='off' placeholder='Expiration date' value={expi_Date} />
                        {errorMessage.expi_Date && expi_Date === '' && <div className="text-danger">Invalid Date</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor='Quantity'>Quantity :</label>
                        <input onChange={e => setQuantity(e.target.value)} type='number' id='Quantity' autoComplete='off' placeholder='Quantity' value={quantity} />
                        {errorMessage.quantity && <div className="text-danger">{errorMessage.quantity}</div>}
                    </div>
                    <div className='input'>
                        <label htmlFor='specialnotes'>Special Notes :</label>
                        <input onChange={e => setNotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes' value={notes} />
                        {errorMessage.notes && <div className="text-danger">{errorMessage.notes}</div>}
                    </div>
                    <button onClick={navtoTable} className='bsubmit' type='button'>View vaccines</button>
                    <button onClick={addvacc} className='bsave' type='button'>Save</button>
                </form>
            </div>
        </div>
    )
}
export default VaccineReg;
