import React, { useState } from 'react'
import Layout from '../components/Layout';
import '../styles/thriposha.css'
import { useNavigate ,useParams } from 'react-router-dom';
import  Axios  from 'axios';
import Swal from 'sweetalert2';
import {Alert} from 'react-bootstrap';

const Edittriposha = () => {

      const {_id , type , esti_Date ,quantity} = useParams();
      const[_id_u , setID] = useState(_id);
      const[type_u ,setTtype] = useState(type);
      const[esti_Date_u , setTesti_Date] = useState(esti_Date);
      const[quantity_u , setTquantity] = useState(quantity);
      const[errorMessage,setErrorMessage] = useState('');
      const navigate = useNavigate();

const updateThriposha = async(_id , type ,esti_Date ,quantity) => {
    try{
      const response = await Axios.post('http://localhost:4000/api/updateTDis',{
        _id : _id ,
        type,
        esti_Date,
        quantity
      });

      console.log("thriposha updated successful", response.data);
    }catch(error){
      console.error('error',error);
    }
  }

const update = async()=>{
    try{
      const response = await updateThriposha(_id_u ,type_u ,esti_Date_u ,quantity_u);

      console.log(response);

      setID(_id);
      setTtype('');
      setTesti_Date('');
      setTquantity('');
      navigate('/Thriposhatable');
    }catch(error){
      console.log("Error",error);
    }
  }

  const confirmUpdate = () => {
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
    <div className='Ttitle'>
    {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

    <h3 >Thriposha Destribution</h3>
    <form className='addbaby'>
        <div className='input'>
            <label htmlFor='bname'>Thriposha Type</label>
            <input value={type_u} onChange={e => setTtype(e.target.value)} type='text' id='bname' autoComplete='off' placeholder='Thriposha Type'/>
        </div>

        <div className='input'>
            <label htmlFor='age'>Estimated Date</label>
            <input value={esti_Date_u} onChange={e=> setTesti_Date(e.target.value.toString())} type='date' id='age' autoComplete='off' placeholder='Estimated Date'/>
        </div>

        <div className='input'>
            <label htmlFor='weight'>Quantity</label>
            <input value={quantity_u}  onChange={e => setTquantity(e.target.value)} type='text' id='weight' autoComplete='off' placeholder='Quantity'/>
        </div>


        

       
            <button  onClick={confirmUpdate} className='tbupdate'type='button'>Update</button>
       

    </form>
    
    </div>
    </div>
    </Layout>
  )
}

export default Edittriposha