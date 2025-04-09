import React, { useState } from 'react'
import Layout from '../components/Layout';
import '../styles/babyvaccination.css'
import { useNavigate ,useParams } from 'react-router-dom';
import  Axios  from 'axios';
import Swal from 'sweetalert2';
import {Alert} from 'react-bootstrap';

const Editbabyvaccination = () => {

  const {_id , type , esti_Date ,quantity} = useParams();
  const[_id_u , setID] = useState(_id);
  const[type_u ,setBvtype] = useState(type);
  const[esti_Date_u , setBvesti_Date] = useState(esti_Date);
  const[quantity_u , setBvquantity] = useState(quantity);
  const[errorMessage,setErrorMessage] = useState('');
  const navigate = useNavigate();

  const updatebabyvaccine = async(_id , type ,esti_Date ,quantity) => {
    try{
      const response = await Axios.post('http://localhost:4000/api/updateBabyVac',{
        _id : _id ,
        type,
        esti_Date,
        quantity
      });
  
      console.log("baby vaccine updated successful", response.data);
    }catch(error){
      console.error('error',error);
    }
  }

  const update = async()=>{
    try{
      const response = await updatebabyvaccine(_id_u ,type_u ,esti_Date_u ,quantity_u);
  
      console.log(response);
  
      setID(_id);
      setBvtype('');
      setBvesti_Date('');
      setBvquantity('');
      navigate('/Bvaccinetable');
    }catch(error){
      console.log("Error",error);
    }
  }

  const confirmUpdatee = () => {
    if(!type_u || !esti_Date_u || !quantity_u){
        setErrorMessage('Please fill in all required fields');
        return;
    }
  Swal.fire({
        title:"Do you want to save the changes?",
        showDenyButton:true,
        showCancelButton:true,
        confirmButtonText:"Save",
        denyButtonText:`Don't save `
    }).then((result)=>{
        if(result.isConfirmed){
          Swal.fire("Saved","updated successfully!!","success");
          update();
      }else if(result.isDenied){
        Swal.fire("Changes are not saved","","info");
      }
    });
    
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
            <input value={type_u} onChange={e => setBvtype(e.target.value)} type='text' id='bname' autoComplete='off' placeholder='Vaccine Type'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Estimated Date</label>
            <input value={esti_Date_u} onChange={e=> setBvesti_Date(e.target.value.toString())} type='date' id='age' autoComplete='off' placeholder='Estimated Date'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Quantity</label>
            <input value={quantity_u}  onChange={e => setBvquantity(e.target.value)} type='text' id='weight' autoComplete='off' placeholder='Quantity'/>
        </div>



        
            <button onClick={confirmUpdatee} className='bvvupdate'type='button'>Update</button>
        

    </form>
    
    </div>
    </div>
    </Layout>
  )
}

export default Editbabyvaccination