import React, { useState } from 'react'
import '../styles/VaccineReg.css' 
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';


const EditVReg = () => {

    const { _id, vname, manf_date, expi_Date, quantity, notes } = useParams();
    const [id_u, setID] = useState(_id);
    const [vname_u, setVname] = useState(vname);
    const [manf_date_u, setManf_date] = useState(manf_date);
    const [expi_Date_u, setExpi_Date] = useState(expi_Date);
    const [quantity_u, setQuantity] = useState(quantity);
    const [notes_u, setNotes] = useState(notes);
    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const updateVac = async (_id, vname, manf_date, expi_Date, quantity, notes) => {

        try {
            const response = await Axios.post('http://localhost:4000/api/updateVac', {
                _id: _id,
                vname,
                manf_date,
                expi_Date,
                quantity,
                notes
            });

            console.log("Vaccine data update is successful", response.data);
        } catch (error) {
            console.error('error', error);
        }
    }

    const update = async () => {
        try {
            const response = await updateVac(id_u, vname_u, manf_date_u, expi_Date_u, quantity_u, notes_u);

            console.log(response);
            setID(_id);
            setVname('');
            setManf_date('');
            setExpi_Date('');
            setQuantity('');
            setNotes('');
            navigate('/VaccineRegTab');
        } catch (error) {
            console.log("Error", error);
        }
    }
    


    const confirmUpdate = () => {
          // Check if any field is empty
          if (!vname || !manf_date || !expi_Date || !quantity || !notes) {
            setErrorMessage("Please fill in all fields.");
            return;
        }

         // Check if quantity is a number
        if (isNaN(quantity)) {
        setErrorMessage("Please enter a valid quantity.");
        return;
    }
    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save `
    }).then((result) => {
        if (result.isConfirmed) {
            Swal.fire("Saved", "updated successfully!!", "success");
            update();
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
    }

    return (
        <Layout>
        <div> 
        
        <div className='titleVac'>
            <h2 className="head2">Vaccine Registration</h2>
            {errorMessage && <div className="error-message">{errorMessage}</div>}             
            <form className='addvaccine'>
                <div className='input'>
                    <label htmlFor='vname'>Vaccine Name :</label>
                    <input onChange={e => setVname(e.target.value)} type='text' id='vname' autoComplete='off' placeholder='Vaccine Name' value={vname_u} />
                </div>
                <div className='input'>
                    <label htmlFor='ManDate'>Manufactured date:</label>
                    <input onChange={e => setManf_date(e.target.value.toString())} type='date' id='ManDate' autoComplete='off' placeholder='Manufactured date' value={manf_date_u} />
                </div>
                <div className='input'>
                    <label htmlFor='ExDate'>Expiration date :</label>
                    <input onChange={e => setExpi_Date(e.target.value.toString())} type='date' id='ExDate' autoComplete='off' placeholder='Expiration date' value={expi_Date_u} />
                </div>
                <div className='input'>
                    <label htmlFor='Quantity'>Quantity :</label>
                    <input onChange={e => setQuantity(e.target.value)} type='text' id='Quantity' autoComplete='off' placeholder='Quantity' value={quantity_u} />
                </div>
                <div className='input'>
                    <label htmlFor='specialnotes'>Special Notes :</label>
                    <input onChange={e => setNotes(e.target.value)} type='text' id='specialnotes' autoComplete='off' placeholder='Special Notes' value={notes_u} />
                </div>
                
                <button onClick={confirmUpdate} className='bsave' type='button'>Update</button>
            </form>
        </div>
    </div>
    </Layout>
    )
}

export default EditVReg;
