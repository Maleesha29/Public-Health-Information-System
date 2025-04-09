import React, { useEffect, useState } from 'react'
import '../styles/bvaccinetable.css'
import  Axios  from 'axios'
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from '../components/Layout';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Bvaccinetable = () => {

    const[bvaccinedata,setbvaccinedata]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getbvaccinedata();
    },[]);

    const getbvaccinedata =()=>{
        Axios.get('http://localhost:4000/api/babyvacc')
        .then(response=>{
            console.log('data from sever',response.data);
            setbvaccinedata(response.data.allBVac);
        })
        .catch(error=>{
            console.error('Axios error:',error);
        })
    }

    //delete
    const bvaccineDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteBabyVac', { _id: id })
            .then(response => {
                console.log('Baby vaccine deleted successfully');
                setbvaccinedata(prevData => prevData.filter(bvaccine => bvaccine._id !== id));
            })
            .catch(error => {
                console.error('Error deleting Baby vaccine:', error);
      });
};

const confirmDelete = (id) => {
    Swal.fire({
        title: 'Are you sure?',
        text: "You won't be able to revert this!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
    }).then((result) => {
        if (result.isConfirmed) {
            bvaccineDelete(id);
            Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
            });
        }
    });
};
  return (
    <Layout>

    <div className='adminClinic'>
            <TableContainer component={Paper}>

        <Table border ={1} cellPadding={10} cellSpacing={0}>
            <TableHead>
                <TableRow>
                    <TableCell>Vaccine Type</TableCell>
                    <TableCell>Estimated Date</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {bvaccinedata && bvaccinedata.length > 0 ?(
                    bvaccinedata.map((bvaccine)=>(
                <TableRow key={bvaccine._id}>
                    <TableCell>{bvaccine.type}</TableCell>
                    <TableCell>{bvaccine.esti_Date} </TableCell>
                    <TableCell>{bvaccine.quantity}</TableCell>
                    
                    <TableCell className='actionButtons'>
                    {bvaccine._id && bvaccine.type && bvaccine.esti_Date && bvaccine.quantity  && (
                        <Button onClick={() => navigate(`/Editbabyvaccination/${bvaccine._id}/${bvaccine.type}/${bvaccine.esti_Date}/${bvaccine.quantity}`)}><FaEdit/></Button>
                    )}
                    </TableCell>
                    <TableCell className='deleteButtons'>
                        
                        <Button onClick={() => confirmDelete(bvaccine._id)} ><FaTrash/></Button>

                    </TableCell>
                </TableRow>
                    ))
                    ):(
                        <TableRow>
                            <TableCell>You have not baby vaccine data</TableCell>
                        </TableRow>  
                )}
            </TableBody>
        </Table>
        </TableContainer>

        </div>
        </Layout>

  )
}

export default Bvaccinetable