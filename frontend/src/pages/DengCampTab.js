import React, { useEffect, useState } from 'react';
import '../styles/Dengcamptab.css';
import Axios from 'axios';
import jsPDF from 'jspdf';
import Swal from 'sweetalert2';
import { Link, useNavigate ,useParams } from 'react-router-dom';
import logo1 from '../webImages/logo1.png';
import DengueCampaigns from './DengueCampaignSchedule';
import { Alert, Button, Card, Col, Container, Form, Row } from 'react-bootstrap';
import denimg3 from '../webImages/dengueimg3.jpeg';
import Layout from '../components/Layout';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FaEdit, FaFilePdf, FaTrash } from 'react-icons/fa';


const DengCampTab = () => {
    const [campdata,setcampdata]=useState([]);

    const [searchQuery, setSearchQuery] = useState('');

    const navigate = useNavigate();

    useEffect(()=>{
        getcampdata();
    },[]);

    const getcampdata =()=>{
        Axios.get('http://localhost:4000/api/camp')
        .then(response => {
            console.log('data from server',response.data);
            setcampdata(response.data.allCampaign);
        })
        .catch(error=>{
            console.error("Axios error: ",error);
        })
    }

    const campDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteCamp', { _id: id })
            .then(response => {
                console.log('Campaign data deleted successfully');
                setcampdata(prevData => prevData.filter(camp => camp._id !== id));
            })
            .catch(error => {
                console.error('Error deleting campdata:', error);
      });
};

const filteredcampdata = campdata.filter(camp=> {

    return camp.date?.toLowerCase().includes(searchQuery.toLowerCase());

});

const generateReport = (camp) => {
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
    doc.text('Notice-Dengue Campaign', 70, 60);

    

    const campaignDescription =`
    We are inform you to our upcoming dengue campaign on ${camp.date}.Please join us at 
    ${camp.venue} from ${camp.time} to ${camp.etime}.This Dengue campaign conducted by
    ${camp.drName}.Engage in activities such as eliminating breeding sites, educating 
    others about dengue prevention, and helping with clean-up efforts.Please listen to 
    instructions from our organizers and health professionals to ensure everyone's
     safety and effectiveness. Feel free to ask any questions you may have about 
     dengue prevention and control measures.We work together to combat the spread 
    of dengue in our community.Let's work together to protect our community from dengue.
    We look forward to seeing you there.
    `;

    doc.setFontSize(13);
    doc.text(campaignDescription, 10, 75);

    
    const currentDate = new Date().toLocaleDateString('en-US');
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 15, 170); 
    doc.text('Signature:', 15, 180); 

    
    doc.save(`Dengue Campaign_${camp.drName}.pdf`);




  
   };
  return (
   <Layout>
     <div className='adminClinic'>
         <form className= "campsearch_bar">
         <input  placeholder="Search by date" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
         </form>
        <Table border ={1} cellPadding={10} cellSpacing={0}>
            <TableHead>
                <TableRow>
                    <TableCell>Venue</TableCell>
                    <TableCell>Date</TableCell>
                    <TableCell>Starting time</TableCell>
                    <TableCell>End time</TableCell>
                    <TableCell>Conducted by</TableCell>
                    <TableCell>Edit</TableCell>
                    <TableCell>Delete</TableCell>
                    <TableCell>Generate PDF</TableCell>
                </TableRow>
            </TableHead>
            <TableBody>
             {filteredcampdata && filteredcampdata.length > 0 ? (
                filteredcampdata.map((camp)=>(
                <TableRow key={camp._id}>
                    <TableCell>{camp.venue}</TableCell>
                    <TableCell>{camp.date}</TableCell>
                    <TableCell>{camp.time}</TableCell>
                    <TableCell>{camp.etime}</TableCell>
                    <TableCell>{camp.drName}</TableCell>
                    <TableCell className='actionButtons'>
                                    <Link to={`/Editcampdetails/${camp._id}/${camp.venue}/${camp.date}/${camp.time}/${camp.etime}/${camp.drName}`}><FaEdit/>
                                    </Link>
                                </TableCell>
                    <TableCell className='deleteButtons'>
                        <button onClick={()=> campDelete(camp._id)}><FaTrash/></button>
                    </TableCell>
                    <TableCell className='reportButtons'>
                    <button onClick={() => generateReport(camp)}><FaFilePdf/>Generate Report</button>
                    </TableCell>
                </TableRow>))
            ):(
                <TableRow>
                    <TableCell>You have not camp data</TableCell>
                </TableRow>
             )}   
               
            </TableBody>
        </Table>

        </div>
   </Layout>
  )
}

export default DengCampTab;