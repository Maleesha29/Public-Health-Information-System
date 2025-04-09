import React, { useEffect, useState } from 'react'
import '../styles/babyvaccination.css'
import { Link } from 'react-router-dom'; 
import Layout from '../components/Layout';
import Axios from 'axios';
import {useNavigate} from 'react-router-dom'
import {Alert} from 'react-bootstrap'
import Swal from 'sweetalert2'

const BabyVaccination = (submitted,data) => {
    const[vtype,setvtype]=useState('');
    const[vesti_Date,setvdate]=useState('');
    const[vquantity,setvquantity]=useState(0);
    const navigate=useNavigate();
    const[errorMessage,setErrorMessage]=useState('');

    useEffect(()=>{
        if(!submitted){
            setvtype('');
            setvdate('');
            setvquantity('');
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0){
            setvtype(data.vtype);
            setvdate(data.vesti_Date);
            setvquantity(data.vquantity);
        }
    },[data]);

    

    const addbvaccine = async(e)=>{

        e.preventDefault();
        if(!vtype || !vesti_Date || !vquantity){
            setErrorMessage('Please fill in all required fields');
            return;
        }
        try{
            const response = await Axios.post('http://localhost:4000/api/addBabyVac',{
                type:vtype,
                esti_Date:vesti_Date,
                quantity:vquantity,
            });

            console.log('Baby vaccine adding is successful',response.data);
           Swal.fire({
            title:"Success!",
            text:"Baby vaccine was added successfully",
            icon:"success",
            showConfirmButton:false,
            timer:2000
           });

           setvtype('');
           setvdate('');
           setvquantity('');
           navigate('/Bvaccinetable');
            console.log('Successfully',response.data);
            console.log('Successfully',response.data);

        }catch(error){
            console.error('error',error);
        }
    
        }

  return (
    <Layout>
    <div>
    <div className='bvtitle'>
    {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

    <h3 >Baby Vaccination</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Vaccine Type</label>
            <input onChange={e=>setvtype(e.target.value)} type='text' id='bname' autoComplete='off' placeholder='Vaccine Type'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Estimated Date</label>
            <input onChange={e=>setvdate(e.target.value.toString())} type='date' id='age' autoComplete='off' placeholder='Estimated Date'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Quantity</label>
            <input onChange={e=>setvquantity(e.target.value)} type='text' id='weight' autoComplete='off' placeholder='Quantity'/>
        </div>


        

        <button  onClick={addbvaccine} className='bvsave'type='button'>Save</button>
        
        <Link to="/Bvaccinetable">
        <button  className='bvvsubmit' type='submit'>View Baby vaccination</button>
        </Link>

        
        
    </form>
    
    </div>
    </div>
    </Layout>
    
  )
}

export default BabyVaccination