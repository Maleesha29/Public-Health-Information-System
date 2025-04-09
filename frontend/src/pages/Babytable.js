import React, { useEffect, useState } from 'react'
import '../styles/babytable.css'
import  Axios  from 'axios';
import { Link, useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from '../components/Layout';
import { FaEdit, FaTrash } from 'react-icons/fa';

const Babytable = () => {

    const [babydata,setbabydata]=useState([]);
    //search
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();

    useEffect(()=>{
        getbabydata();
    },[]);

    const getbabydata =()=>{
        Axios.get('http://localhost:4000/api/baby')
        .then(response=>{
            console.log('data from sever',response.data);
            setbabydata(response.data.allBabies);
        })
        .catch(error=>{
            console.error("Axios error:",error);
        })
    }

    //delete
    const babyDdelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteBaby', { _id: id })
            .then(response => {
                console.log('Babydata deleted successfully');
                setbabydata(prevData => prevData.filter(baby => baby._id !== id));
            })
            .catch(error => {
                console.error('Error deleting babydata:', error);
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
            babyDdelete(id);
            Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
            });
        }
    });
};
   
//search
const filteredBabyData = babydata.filter(baby => {
    return baby.bname.toLowerCase().includes(searchQuery.toLowerCase());
});

  return (
    <Layout>
    <div className='adminClinic'>
        
        <form className= "babysearch_bar">
        
        <input  placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
    </form>
    <TableContainer component={Paper}>

        <Table border ={1} cellPadding={10} cellSpacing={0}>
            <TableHead>
                <TableRow>
                    <TableCell>Baby Name</TableCell>
                    <TableCell>Age</TableCell>
                    <TableCell>Weight</TableCell>
                    <TableCell>Contact Number</TableCell>
                    <TableCell>Special Notes</TableCell>
                    <TableCell>Birth Date</TableCell>
                    <TableCell>Gardian name</TableCell>

                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {filteredBabyData && filteredBabyData.length > 0 ? (
                        filteredBabyData.map((baby) =>(
                <TableRow key={baby._id}>
                    <TableCell>{baby.bname}</TableCell>
                    <TableCell>{baby.age} </TableCell>
                    <TableCell>{baby.weight}</TableCell>
                    <TableCell>{baby.co_no}</TableCell>
                    <TableCell>{baby.notes}</TableCell>
                    <TableCell>{baby.BDate}</TableCell>
                    <TableCell>{baby.Gname}</TableCell>

                    <TableCell className='actionButtons'>
                    {baby._id && baby.bname && baby.age && baby.weight  && baby.co_no  && baby.notes  && baby.BDate && baby.Gname &&(
                        <Button onClick={() => navigate(`/Editbabydetails/${baby._id}/${baby.bname}/${baby.age}/${baby.weight}/${baby.co_no}/${baby.notes}/${baby.BDate}/${baby.Gname}`)}><FaEdit/></Button>
                    )}
                    </TableCell>
                 
                    
                    <TableCell  className='deleteButtons'>
                        <Button onClick={()=> confirmDelete(baby._id)}><FaTrash/></Button>
                    </TableCell>
                </TableRow>
                    ))
                    ):(
                        <TableRow>
                            <TableCell>You have not baby data</TableCell>
                        </TableRow>  
                )}

            </TableBody>
        </Table>
        </TableContainer>

    </div>
    </Layout>
  )
}

export default Babytable