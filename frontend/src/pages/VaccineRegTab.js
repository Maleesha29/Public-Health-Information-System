import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import Swal from 'sweetalert2';
import {  useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import jsPDF from 'jspdf';
import logo1 from '../webImages/logo1.png'; 
import '../styles/VaccineRegTab.css'
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/AdminClinic.css';

const VaccineRegTab = () => {
  const [vaccinedata, setvaccinedata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  const navigate = useNavigate();
  

  useEffect(() => {
    getvaccinedata();
  }, []);




  const getvaccinedata = () => {
    Axios.get('http://localhost:4000/api/Vacccines')
      .then(response => {
        console.log('data from server', response.data);
        setvaccinedata(response.data.allVaccine);
      })
      .catch(error => {
        console.error("Axios error: ", error);
      })
  }

//delete
  const deletevaccinedata = (id) => {
    
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
            
            Axios.post('http://localhost:4000/api/deleteVac', { _id: id })
                .then(response => {
                    console.log('Vaccine Data deleted successfully');
                    setvaccinedata(prevData => prevData.filter(vaccine => vaccine._id !== id));
                    
                    Swal.fire({
                        title: "Deleted!",
                        text: "Your file has been deleted.",
                        icon: "success"
                    });
                })
                .catch(error => {
                    console.error('Error deleting vaccine data:', error);
                });
        }
    });
}



//generate pdf
  const generatePDF = () => {
    const doc = new jsPDF();

    
    const logo = new Image();
    logo.src = logo1; 
    doc.addImage(logo, 'PNG', 6, 7, 20, 20); 

   
    
    doc.setFontSize(12);
    doc.text('Public Health Information System', 70, 15); 
    doc.text('Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha,', 70, 20);
    doc.text('Colombo 10, Sri Lanka.', 70, 25);
    doc.text('Tel: 112 694033, 112 675011, 112 675449, 112 693493', 70, 30);

    
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'S');

    
    doc.setLineWidth(0.5);
    doc.line(5, 45, 205, 45);

    
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); 
    doc.text('Vaccine Registration Summary', 70, 60); 

    
    let summaryDescription = '';
    vaccinedata.forEach((vaccine, index) => {
      summaryDescription += `Vaccine Name: ${vaccine.vname}\n`;
      summaryDescription += `Manufactured Date: ${vaccine.manf_date}\n`;
      summaryDescription += `Expire Date: ${vaccine.expi_Date}\n`;
      summaryDescription += `Quantity: ${vaccine.quantity}\n`;
      summaryDescription += `Notes: ${vaccine.notes}\n`;
      summaryDescription += '--------------------------------------------\n';
    });

    doc.setFontSize(12);
    doc.text(summaryDescription, 15, 75);


    
    doc.save('vaccine_registration_summary.pdf');
  }

  const filteredVaccineData = vaccinedata.filter(vaccine => {
    return vaccine.vname.toLowerCase().includes(searchQuery.toLowerCase());
  });



  return (
    <Layout>
      <div className='adminClinic'>
        <form>
          <label>Search</label>
          <input type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
        </form>
        
        <Table border={1} cellPadding={10} cellSpacing={0}>
          <TableHead>
            <TableRow>
              <TableCell>Vaccine Name</TableCell>
              <TableCell>Manufactured Date</TableCell>
              <TableCell>Expire Date</TableCell>
              <TableCell>Quantity</TableCell>
              
              <TableCell>Notes</TableCell>
              <TableCell>Update</TableCell>
              <TableCell>Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {filteredVaccineData && filteredVaccineData.length > 0 ? (
              filteredVaccineData.map((vaccine) => (
                <TableRow key={vaccine._id}>
                  <TableCell>{vaccine.vname}</TableCell>
                  <TableCell>{vaccine.manf_date}</TableCell>
                  <TableCell>{vaccine.expi_Date}</TableCell>
                  <TableCell>{vaccine.quantity}</TableCell>
                  
                  <TableCell>{vaccine.notes}</TableCell>
                  <TableCell className='actionButtons'>
                    {vaccine._id && vaccine.vname && vaccine.manf_date && vaccine.expi_Date && vaccine.quantity && vaccine.notes &&(
                      <button onClick={() => navigate(`/EditVReg/${vaccine._id}/${vaccine.vname}/${vaccine.manf_date}/${vaccine.expi_Date}/${vaccine.quantity}/${vaccine.notes}`)}><FaEdit/></button>
                    )}
                    
                  </TableCell>
                  <TableCell onClick={() => deletevaccinedata(vaccine._id)} className='deleteButtons'>
                    <button><FaTrash/></button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>You have not added any vaccine data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
        
        <button className="generate" onClick={generatePDF}>Generate Report</button>
      </div>
    </Layout>
  )
}

export default VaccineRegTab;
