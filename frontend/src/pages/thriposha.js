import React, { useEffect, useState } from 'react'
import '../styles/thriposha.css'
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';

import {useNavigate} from 'react-router-dom'
import {Alert} from 'react-bootstrap'
import Swal from 'sweetalert2'
const Thriposha = ({submitted,data}) => {

    const[ttype,setttype] = useState('');
    const[test_date,settest_date]= useState('');
    const[tquantity,settquantity]=useState(0);
    const navigate=useNavigate();
    const[errorMessage,setErrorMessage]=useState('');

    useEffect(()=>{
        if(!submitted){
            setttype('');
            settest_date('');
            settquantity('');
        }
    },[submitted]);

    useEffect(()=>{
        if(data?.id && data.id !==0 ){
            setttype(data.type);
            settest_date(data.esti_Date);
            settquantity(data.quantity);
        }
    },[data]);

    const addthriposha = async(e) =>{
        e.preventDefault();
        if(!ttype || !test_date || !tquantity){
            setErrorMessage('Please fill in all required fields');
            return;
        }

        try{
            const response=await Axios.post('http://localhost:4000/api/addTDis',{
                type : ttype,
                esti_Date:test_date,
                quantity:tquantity,
            });

           console.log('Thriposha adding is successful',response.data);
           Swal.fire({
            title:"Success!",
            text:"Thriposha was added successfully",
            icon:"success",
            showConfirmButton:false,
            timer:2000
           });

           setttype('');
           settest_date('');
           settquantity('');
           navigate('/Thriposhatable');
            console.log('Successfully',response.data);
        }catch(error){
            console.error('error',error);
        }
    }
    
  return (
    <Layout>
    <div>
    <div className='Ttitle'>
    {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

    <h3 >Thriposha Destribution</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Thriposha Type</label>
            <input  onChange={e=>setttype(e.target.value)} type='text' id='bname' autoComplete='off' placeholder='Thriposha Type'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Estimated Date</label>
            <input  onChange={e=>settest_date(e.target.value.toString())} type='date' id='age' autoComplete='off' placeholder='Estimated Date'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Quantity</label>
            <input  onChange={e=>settquantity(e.target.value)} type='text' id='weight' autoComplete='off' placeholder='Quantity'/>
        </div>



       
        <button   onClick={addthriposha} className='tbsave'type='button'>Save</button>
       

        <Link to="/Thriposhatable">
        <button  className='bvvsubmit' type='submit'>View Thriposha data</button>
        </Link>

       

    </form>
    
    </div>
    </div>
    </Layout>
  )
}

export default Thriposha