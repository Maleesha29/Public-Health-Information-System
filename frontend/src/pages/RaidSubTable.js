import React, { useEffect, useState } from 'react';
import '../styles/RaidSubTable.css';
import Layout from '../components/Layout';
import Axios from 'axios';
import jsPDF from 'jspdf';
import { Link, useNavigate } from 'react-router-dom';
import logo1 from '../webImages/logo1.png'; 
import { Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { FaEdit, FaFilePdf, FaTrash } from 'react-icons/fa';


const RaidSubTable = () => {
    const [submissiondata, setSubmissionData] = useState([]);
    const [searchQuery, setSearchQuery] = useState('');
    const navigate = useNavigate();


    useEffect(() => {
        getsubmissiondata();
    }, []);

    const getsubmissiondata = () => {
        Axios.get('http://localhost:4000/api/raidSub')
            .then(response => {
                console.log('data from server', response.data);
                setSubmissionData(response.data.allRS);
            })
            .catch(error => {
                console.error('Axios error:', error);
            });
    }

    // Delete submission
    const submissionDelete = (id) => {
        Axios.post('http://localhost:4000/api/deleteRS', { _id: id })
            .then(response => {
                console.log('Submission deleted successfully');
                // Filter out the deleted submission from the current state
                const updatedSubmissionData = submissiondata.filter(submission => submission._id !== id);
                // Update the state with the filtered data
                setSubmissionData(updatedSubmissionData);
            })
            .catch(error => {
                console.error('Axios error:', error);
            });
    };

    // PDF generation
    const generatePDF = (submission) => {
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

        // Raid submission summary topic
        doc.setFontSize(18);
        doc.setTextColor(0, 0, 0); // Set text color to black
        doc.text('Raid Submission Summary', 70, 60); // Adjust the position as needed

        // Submission description
        const SubDescription =`
            A raid submission form is a structured document utilized by law enforcement agencies,
            regulatory bodies, or authorized entities to record and document details related to raids or
            enforcement actions conducted. It serves as a comprehensive record of the raid, providing
            essential information for review, analysis, and potential legal proceedings. Here's a
            description of the key components typically found in a raid submission form:

            Vialator Name: ${submission.vname}
            Vialator Email: ${submission.vemail}
            Vialator NIC (National Identity Card): ${submission.vnic}
            Vialator Contact Number: ${submission.vcno}
            Violation Type: ${submission.vtype}
            Location: ${submission.location}
            Details: ${submission.details}

            In summary, a raid submission form is a vital tool for documenting and reporting raids or
            enforcement actions conducted by authorities. It helps ensure that all relevant details of the
            operation are recorded accurately, facilitating accountability, analysis, and follow-up
            actions as necessary. The form serves as an essential part of the documentation and legal
            process surrounding law enforcement activities.
        `;

        doc.setFontSize(12);
        doc.text(SubDescription, 15, 75);

        // Date and signature
        const currentDate = new Date().toLocaleDateString('en-US');
        doc.setFontSize(12);
        doc.text(`Date: ${currentDate}`, 15, doc.internal.pageSize.height - 10); // Adjust the position for date
        doc.text('Signature:', 15, doc.internal.pageSize.height - 5); // Adjust the position for signature

        // Save the PDF with a filename based on the vialator name
        doc.save(`RaidSubmission_${submission.vname}.pdf`);
    };

    // Filter submission data based on search query
    const filteredsubmissiondata = submissiondata.filter(submission => {
        return submission.vname.toLowerCase().includes(searchQuery.toLowerCase());
    });

    return (
        <Layout>
            <div className='adminClinic'>
                <div className="search">
                    <input placeholder="Search name" type='text' value={searchQuery} onChange={e => setSearchQuery(e.target.value)} />
                </div>

                <Table border={1} cellPadding={10} cellSpacing={0}>
                    <TableHead>
                        <TableRow>
                            <TableCell>Name</TableCell>
                            <TableCell>Email</TableCell>
                            <TableCell>Contact No</TableCell>
                            <TableCell>Vialator NIC</TableCell>
                            <TableCell>Violation Type</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Details</TableCell>
                            <TableCell>Edit</TableCell>
                            <TableCell>Delete</TableCell>
                            <TableCell>Generate PDF</TableCell>
                            <TableCell>FineAndCourt</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {filteredsubmissiondata.length > 0 ? (
                            filteredsubmissiondata.map(submission => (
                                <TableRow key={submission._id}>
                                    <TableCell>{submission.vname}</TableCell>
                                    <TableCell>{submission.vemail}</TableCell>
                                    <TableCell>{submission.vcno}</TableCell>
                                    <TableCell>{submission.vnic}</TableCell>
                                    <TableCell>{submission.vtype}</TableCell>
                                    <TableCell>{submission.location}</TableCell>
                                    <TableCell>{submission.details}</TableCell>
                                    <TableCell className='actionButtons'>
                                        <Link to={`/RaidSubFormEdit/${submission._id}/${submission.vname}/${submission.vemail}/${submission.vcno}/${submission.vnic}/${submission.vtype}/${submission.location}/${submission.details}`}>
                                            <button><FaEdit/></button>
                                        </Link>
                                    </TableCell>
                                    <TableCell className='deleteButtons'>
                                        <button onClick={() => submissionDelete(submission._id)}><FaTrash/></button>
                                    </TableCell>
                                    <TableCell>
                                        <button className="pdfButton" onClick={() => generatePDF(submission)}><FaFilePdf/></button>
                                    </TableCell>
                                    <TableCell>
                                        <button className="btn-primary" onClick={() => navigate(`/Fine-And-court-Submit-Reports/${submission.vname}/${submission.vemail}/${submission.vcno}/${submission.vnic}/${submission.vtype}/${submission.location}/${submission.details}`)}>FineAndCourt</button>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <th colSpan="11"><center>You have no submission data.</center></th>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </div>
        </Layout>
    );
};

export default RaidSubTable;
