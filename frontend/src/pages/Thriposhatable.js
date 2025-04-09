import React, { useEffect, useState } from 'react'
import '../styles/thriposhatable.css'
import Axios from 'axios';
import jsPDF from 'jspdf';
import { useNavigate } from 'react-router-dom';
import Swal from 'sweetalert2';
import logo1 from '../webImages/logo1.png';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Layout from '../components/Layout';
import { FaEdit, FaFilePdf, FaTrash } from 'react-icons/fa';


const Thriposhatable = () => {

    const[thriposhadata,setthriposhadata]=useState([]);
    const navigate = useNavigate();

    useEffect(()=>{
        getthriposhadata();
    },[]);

    const getthriposhadata =()=>{
        Axios.get('http://localhost:4000/api/Triposha')
        .then(response=>{
            console.log('data from sever',response.data);
            setthriposhadata(response.data.allTDis);
        })
        .catch(error=>{
            console.error('Axios error :',error);
        })
    }

    //delete
    const thriposhaDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteTDis', { _id: id })
            .then(response => {
                console.log('thriposha deleted successfully');
                setthriposhadata(prevData => prevData.filter(thriposha => thriposha._id !== id));
            })
            .catch(error => {
                console.error('Error deleting thriposha:', error);
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
            thriposhaDelete(id);
            Swal.fire({
                title: 'Deleted!',
                text: 'Your file has been deleted.',
                icon: 'success'
            });
        }
    });
};
//generate report
    const generatePDF = (thriposhaapp) => {
        const doc = new jsPDF();

    // Add Sri Lankan national logo
    const logo = new Image();
    logo.src = logo1; // Use the imported logo image
    doc.addImage(logo, 'PNG', 6, 7, 20, 20); // Adjust the position and dimensions as needed

   
    // Add Public Health Information System as the letterhead
    doc.setFontSize(12);
    doc.text('Public Health Information System', 70, 15); // Adjust the position as needed
    doc.text('Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha,', 70, 20);
    doc.text('Colombo 10, Sri Lanka.', 70, 25);
    doc.text('Tel: 112 694033, 112 675011, 112 675449, 112 693493', 70, 30);

    // Add page border
    doc.setDrawColor(0);
    doc.setLineWidth(0.5);
    doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'S');

    // Add horizontal line
    doc.setLineWidth(0.5);
    doc.line(5, 45, 205, 45);

    // Vaccine registration summary topic
    doc.setFontSize(18);
    doc.setTextColor(0, 0, 0); // Set text color to black
    doc.text('Thriposha Destribution', 70, 60); // Adjust the position as needed

    //appointment description

    const AppDescription =`
    Join us for a crucial thriposha distribution program on ${thriposhaapp.esti_Date}, aimed at 
    combating malnutrition, particularly among vulnerable groups like children and expectant mothers. 
    The distribution of ${thriposhaapp.type} thriposha (${thriposhaapp.quantity} units) is vital,
    serving as a preventive measure against malnutrition-related illnesses and fostering overall 
    growth and development.We need your collaboration. Volunteers, healthcare workers,
    and community leaders must work together to ensure a smooth and efficient distribution process.
    Timely arrival and proper organization are essential, as is adherence to safety protocols and 
    hygiene standards. Your active participation is invaluable in improving the nutritional status 
    and overall health outcomes of our community. Together, let's build a healthier future for all.
    
    `;

    doc.setFontSize(12);
    doc.text(AppDescription, 15, 75);

    // Date and signature
    const currentDate = new Date().toLocaleDateString('en-US');
    doc.setFontSize(12);
    doc.text(`Date:  ${currentDate}`, 15, 170); 
    doc.text('Signature:', 15, 180); 

    // Save the PDF with a filename based on leave name
    doc.save(`Thriposha Destribution_${thriposhaapp.type}.pdf`);

    };

  return (
    <Layout>

    <div className='adminClinic'>
        <TableContainer component={Paper}>

        <Table border ={1} cellPadding={10} cellSpacing={0}>
            <TableHead>
                <TableRow>
                    <TableCell>Thriposha Type</TableCell>
                    <TableCell>Estimated Date</TableCell>
                    <TableCell>Quantity</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>PDF</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
            {thriposhadata && thriposhadata.length > 0 ?(
                    thriposhadata.map((thriposha)=>(
                <TableRow key={thriposha._id}>
                    <TableCell>{thriposha.type}</TableCell>
                    <TableCell>{thriposha.esti_Date} </TableCell>
                    <TableCell>{thriposha.quantity}</TableCell>

                    <TableCell className='actionButtons'>
                    {thriposha._id && thriposha.type && thriposha.esti_Date && thriposha.quantity  && (
                        <Button onClick={() => navigate(`/Edittriposha/${thriposha._id}/${thriposha.type}/${thriposha.esti_Date}/${thriposha.quantity}`)}><FaEdit/></Button>
                    )}
                    </TableCell>
                    <TableCell className='deleteButtons'>
                        <Button onClick={() => confirmDelete(thriposha._id)} ><FaTrash/></Button>
                    </TableCell>
                    <TableCell >
                    <button className='generate' onClick={() => generatePDF(thriposha)}>Generate PDF</button>
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

export default Thriposhatable