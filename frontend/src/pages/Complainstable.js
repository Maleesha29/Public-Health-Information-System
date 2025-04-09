import React, { useEffect, useState } from 'react';
import '../styles/Complainstable.css';
import Layout from "../components/Layout";
import Axios from 'axios';
import Swal from "sweetalert2";
import jsPDF from 'jspdf';
import logo1 from '../webImages/logo1.png';
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FaEdit, FaTrash,FaFilePdf } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import Aos from 'aos';
import 'aos/dist/aos.css'; //anim

const Complainstable = () => {
    const navigate = useNavigate();

    const [complainsdata, setComplainsdata] = useState([]);
    //search
    const [searchQuery, setSearchQuery] = useState('');

    const getComplainsdata = () => {
        Axios.get('http://localhost:4000/api/Complain')
            .then(response => {

                console.log('data from sever', response.data);
                setComplainsdata(response.data);
            })
            .catch(error => {
                console.error("Axios error:", error);
            })
    }

    useEffect(() => {
        getComplainsdata();
    }, []);

    //delete

    const ComplainsDdelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteComplain', { _id: id })
            .then(response => {
                console.log('ComplainData deleted successfully');
                setComplainsdata(prevData => prevData.filter(Complains => Complains._id !== id));
            })
            .catch(error => {
                console.error('Error deleting Complaindata:', error);
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
                ComplainsDdelete(id);
                Swal.fire({
                    title: 'Deleted!',
                    text: 'Your file has been deleted.',
                    icon: 'success'
                });
            }
        });

    };


    //search
    const filteredComplainsData = complainsdata.filter(Complains => {
        const fullName = `${Complains.fname} ${Complains.lname} ${Complains.email} ${Complains.yaddress} ${Complains.cdesc} ${Complains.area}`.toLowerCase();
        return fullName.includes(searchQuery.toLowerCase());
    });

    const generatePDF = (Complains) => {
        const doc = new jsPDF();

        // Add Sri Lankan national logo
        const logo = new Image();
        logo.src = logo1; // Use the imported logo image
        doc.addImage(logo, 'PNG', 10, 10, 20, 20); // Adjust the position and dimensions as needed

        // Add Public Health Information System as the letterhead
        doc.setFontSize(12);
        doc.text('Public Health Information System', 40, 15); // Adjust the position as needed
        doc.text('Suwasiripaya, No. 385, Rev. Baddegama Wimalawansa Thero Mawatha,', 40, 20);
        doc.text('Colombo 10, Sri Lanka.', 40, 25);
        doc.text('Tel: 112 694033, 112 675011, 112 675449, 112 693493', 40, 30);

        // Add page border
        doc.setDrawColor(0);
        doc.setLineWidth(0.5);
        doc.rect(0, 0, doc.internal.pageSize.width, doc.internal.pageSize.height, 'S');

        // Add horizontal line
        doc.setLineWidth(0.5);
        doc.line(5, 45, 205, 45);

        // Leave summary topic
        doc.setFontSize(10);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text('Complain Summery', 78, 60);

        let xPos = 15;
        let yPos = 195; // Fixed yPos for all images
        const verticalSpacing = 10; // Adjust vertical spacing between rows
        if (Array.isArray(Complains.images)) {
            Complains.images.forEach((image, index) => {
                if (index > 0 && index % 2 === 0) {
                    yPos += 50; // Move to the next row
                    xPos = 15; // Reset xPos for the new row
                }
                const imageData = `data:${image.contentType};base64,${image.data}`;
                doc.addImage(imageData, 'JPEG', xPos, yPos, 60, 40); // Adjust dimensions as needed
                xPos += 80; // Adjust horizontal spacing between images
            });

        } else {
            doc.text('No images available', 15, 70);
        };

        const descriptionText = `Description: ${Complains.cdesc}`;
    const descriptionLines = doc.splitTextToSize(descriptionText, 180); // Adjust width as needed
    doc.text(descriptionLines, 15, 158);

        doc.text(`First Name: ${Complains.fname}`, 15, 80);
        doc.text(`Last Name: ${Complains.lname}`, 15, 90);
        doc.text(`Mobile: ${Complains.mobile}`.toString(), 15, 100);
        doc.text(`Email: ${Complains.email}`, 15, 110);
        doc.text(`NIC: ${Complains.NIC}`, 15, 120);
        doc.text(`Date: ${Complains.date}`, 15, 130);
        doc.text(`Address: ${Complains.yaddress}`, 15, 140);
        doc.text(`Type: ${Complains.ctype}`, 15, 150);
        /*doc.text(`Description: ${Complains.cdesc}`, 15, 170);*/
        doc.text(`Area: ${Complains.area}`, 15, 175);
        doc.text('Images:',15,185);

        doc.save(`Complain_Summary_${Complains.fname}.pdf`);
    };

    useEffect(() => {
        Aos.init({ duration: 1000 }); // Initialize AOS with your desired options //anim
      }, []);

    console.log(complainsdata.length);
    return (
        <Layout>

            <div data-aos="zoom-in" //anim
                data-aos-anchor-placement="center-bottom">

            <div className='Complainstable'>



                {<input placeholder="Search Here" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} style={{ fontWeight: 'bold' }}/>}

                <TableContainer component={Paper}>
                    <Table border={1} cellPadding={10} cellSpacing={0}>
                        <TableHead>
                            <TableRow>
                                <TableCell>First name</TableCell>
                                <TableCell>Last Name</TableCell>
                                <TableCell>Mobile</TableCell>
                                <TableCell>Email</TableCell>
                                <TableCell>NIC</TableCell>
                                <TableCell>Address</TableCell>
                                <TableCell>Complain Type</TableCell>
                                <TableCell>Description</TableCell>
                                <TableCell>Area</TableCell>
                                <TableCell>Images</TableCell>
                                <TableCell>Actions</TableCell>
                            </TableRow>
                        </TableHead>
                        <TableBody>
                            {filteredComplainsData && filteredComplainsData.length > 0 ? (
                                filteredComplainsData.map((Complains) => (
                                    <TableRow key={Complains._id}>
                                        <TableCell className="fname-column">{Complains.fname}</TableCell>
                                        <TableCell className="lname-column">{Complains.lname} </TableCell>
                                        <TableCell>{Complains.mobile} </TableCell>
                                        <TableCell className="email-column">{Complains.email}</TableCell>
                                        <TableCell>{Complains.NIC}</TableCell>
                                        <TableCell className="yaddress-column">{Complains.yaddress}</TableCell>
                                        <TableCell>{Complains.ctype}</TableCell>
                                        <TableCell className="cdesc-column">{Complains.cdesc}</TableCell>
                                        <TableCell className="area-column">{Complains.area}</TableCell>
                                        <TableCell>
                                            {Array.isArray(Complains.images) ? (
                                                Complains.images.map((image, index) => (
                                                    <div className="imge" key={index} style={{ width: "50px", height: "100px" }}>
                                                        <img src={`data:${image.contentType};base64,${image.data}`} alt={`Image`} width={50} height={50} />
                                                    </div>
                                                ))
                                            ) : (
                                                <div>No images available</div>
                                            )}
                                        </TableCell>


                                        <TableCell >
                                            <Button onClick={() => navigate(`/updateComp/${Complains._id}/${Complains.fname}/${Complains.lname}/${Complains.mobile}/${Complains.email}/${Complains.NIC}/${Complains.yaddress}/${Complains.ctype}/${Complains.cdesc}`)}><FaEdit /></Button>
                                            <Button onClick={() => confirmDelete(Complains._id)} style={{  color: 'red'}}><FaTrash /></Button>
                                            <button className="pdfButton" onClick={() => generatePDF(Complains)}><FaFilePdf/></button>
                                        </TableCell>
                                    </TableRow>
                                ))
                            ) : (
                                <TableRow>
                                    <TableCell>You have no Complains data</TableCell>
                                </TableRow>
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </div>
            </div>
        </Layout>
    )
}

export default Complainstable;

