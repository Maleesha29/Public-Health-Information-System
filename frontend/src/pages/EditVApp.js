import React, { useState } from 'react'
import '../styles/VaccineApp.css'
import { useNavigate, useParams } from 'react-router-dom';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';


const EditVApp = () => {

    const { _id, v_name, quantity, date, location } = useParams();
    const [id_u, setID] = useState(_id);
    const [v_name_u, setv_name] = useState(v_name);
    const [quantity_u, setq_uantity] = useState(quantity);
    const [date_u, setDate] = useState(date);
    const [location_u, setlocation] = useState(location);

    const [errorMessage, setErrorMessage] = useState('');
    const navigate = useNavigate();

    const updateVacApp = async (_id, v_name, quantity , date, location) => {

        try {
            const response = await Axios.post('http://localhost:4000/api/updateVacApp', {
                _id: _id,
                v_name,
                quantity,
                date,
                location,
                
            });

            console.log("Appointment data update is successful", response.data);
        } catch (error) {
            console.error('error', error);
        }
    }

    const update = async () => {
        try {
            const response = await updateVacApp(id_u, v_name_u, quantity_u , date_u, location_u);

            console.log(response);
            setID(_id);
            setv_name('');
            setq_uantity('');
            setDate('');
            setlocation('');
            
            navigate('/VaccineAppTab');
        } catch (error) {
            console.log("Error", error);
        }
    }
    


    const confirmUpdate = async(event) => {
        event.preventDefault();    //disapearing error
        
          // Check if any field is empty
        if (!v_name || !quantity || !date || !location) {
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
            
    
    <div className='title1'>

    <h2 className="head2" >Vaccination Appointments</h2>
    {errorMessage && <div className="error-message">{errorMessage}</div>}
    <form className='addvaccineapp'>
        <div className='input'>
            <label htmlFor='v_name'>Vaccine Name :</label>
            <input onChange={e=>setv_name(e.target.value)} type='text' id='v_name' autoComplete='off' placeholder='Vaccine Name' value={v_name_u}/>
        </div>


        <div className='input'>
            <label htmlFor='quantity'>Quantity :</label>
            <input onChange={e=>setq_uantity(e.target.value)} type='text' id='quantity' autoComplete='off' placeholder='Quantity' value={quantity_u}/>
        </div>

        <div className='input'>
            <label htmlFor='date'>Date :</label>
            <input onChange={e=>setDate(e.target.value.toString())} type='date' id='date' autoComplete='off' placeholder='Date'value={date_u}/>
        </div>


        


        <div className='input'>
            <label htmlFor='location'>Location :</label>
            <input onChange={e=>setlocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='location' value={location_u}/>
        </div>

        

        
            
            
            <button onClick={(e) => confirmUpdate(e)} className='bappsave' type='submit'>Update</button>
             

            
            



    </form>
    
    </div>
    </div>
    </Layout>
    )
}

export default EditVApp;
