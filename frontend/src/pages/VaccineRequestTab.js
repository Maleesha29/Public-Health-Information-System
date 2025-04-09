import React, { useEffect, useState } from 'react'
import '../styles/VaccineRequestTab.css'
import Axios from 'axios';
import Swal from 'sweetalert2';
import Layout from '../components/Layout';
import '../styles/AdminClinic.css';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FaTrash } from 'react-icons/fa';

const VaccineRequestTab = () => {

    const [vacreqData, setvacreqData] = useState([]);


    useEffect(() => {
        getvacreqData();
      }, []);
    

    const getvacreqData = () => {
        Axios.get('http://localhost:4000/api/VacccinesReq')
          .then(response => {
            console.log('data from server', response.data);
            setvacreqData(response.data.allVaccineRq);
          })
          .catch(error => {
            console.error("Axios error: ", error);
          })
      };


      //delete

    const deletevaccinereqdata = (id) => {
        
   Swal.fire({
       title: "Are you sure?",
       text: "You won't be able to revert this!",
       icon: "warning",
       showCancelButton: true,
       confirmButtonColor: "#3085d6",
       cancelButtonColor: "#d33",
       confirmButtonText: "Yes, delete it!"
   }).then((result) => {
       if (result.isConfirmed) {
          
       Axios.post('http://localhost:4000/api/deleteVacRq',{_id: id})
       .then(response =>{
           console.log('Vaccine Data deleted successfully');
           setvacreqData(prevData => prevData.filter(vacreqData => vacreqData._id !== id));
          
           Swal.fire({
               title: "Deleted!",
               text: "Your file has been deleted.",
               icon: "success"
       });
   })
   
       .catch(error =>{
           console.error('Error deleting vaccinereqdata:',error);
       });
   }
   });
};

  return (
   <Layout>
     <div className='adminClinic'>
        <h2>Vaccine Status</h2>

    

        <Table border ={1} cellPadding={10} cellSpacing={0}>
            <TableHead>
                <TableRow>
                    <TableCell>Vaccine type</TableCell>
                    <TableCell>Estimated date</TableCell>
                    <TableCell>qunatity</TableCell>
                    <TableCell>status</TableCell>
                    <TableCell>Delete</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
                {vacreqData && vacreqData.length > 0 ?(                  
                    vacreqData.map((vacreqData)=>(
                        <TableRow key={vacreqData._id}>
                            <TableCell>{vacreqData.type}</TableCell>
                            <TableCell>{vacreqData.esti_Date}</TableCell>
                            <TableCell>{vacreqData.quantity}</TableCell>
                            <TableCell>{vacreqData.notification}</TableCell>


                            <TableCell onClick={() => deletevaccinereqdata(vacreqData._id)} className='deleteButtons'>
                            <button ><FaTrash/></button>
                        </TableCell>
    
                    </TableRow>

                    

                    ))

                ):(
                    <tr>
                        <td>You have not added any vaccine Requests</td>
                    </tr>
                )}
               
            </TableBody>
        </Table>
        </div>
   </Layout>
  )
}

export default VaccineRequestTab

