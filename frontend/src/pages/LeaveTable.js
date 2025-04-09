import React, { useEffect, useState } from 'react';
import Axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import Layout from '../components/Layout';
import jsPDF from 'jspdf';
import logo1 from '../webImages/logo1.png';
import Swal from 'sweetalert2';
import '../styles/LeaveTable.css';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';
import { FaEdit, FaTrash } from 'react-icons/fa';
import '../styles/AdminClinic.css';


const LeaveTable = () => {
  const navigate = useNavigate();
  const [leavedata, setLeavedata] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    getLeavedata();
  }, []);

  const getLeavedata = () => {
    Axios.get('http://localhost:4000/api/Leave')
      .then(response => {
        console.log('data from server', response.data);
        setLeavedata(response.data.allLeave);
      })
      .catch(error => {
        console.error("Axios error:", error);
      });
  };

  const handleDelete = (id) => {

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

        Axios.post('http://localhost:4000/api/deleteLeave', { _id: id })
          .then(response => {
            console.log('Leave deleted successfully');
            setLeavedata(prevData => prevData.filter(leave => leave._id !== id));

            Swal.fire({
              title: "Deleted!",
              text: "Your leave application has been deleted.",
              icon: "success"
            });
          })
          .catch(error => {
            console.error('Error deleting leave:', error);

            Swal.fire({
              title: "Error!",
              text: "Failed to delete leave application.",
              icon: "error"
            });
          });
      }
    });
  };


  const generatePDF = (leave) => {
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
    doc.text('Leave Summary', 90, 60);


    let leaveTypeDescription = '';
    switch (leave.leaveType) {
      case 'Sick':
        leaveTypeDescription = 'medical reasons';
        break;
      case 'Vacation':
        leaveTypeDescription = 'personal reasons';
        break;
      case 'Quitting':
        leaveTypeDescription = 'resignation';
        break;
      default:
        leaveTypeDescription = 'reasons unknown';
        break;
    }

    let positionDescription = '';
    switch (leave.position) {
      case 'Doctor':
        positionDescription = 'Doctor';
        break;
      case 'Nurse':
        positionDescription = 'Nurse';
        break;
      case 'PHI':
        positionDescription = 'Public Health Inspector';
        break;
      default:
        positionDescription = 'position unknown';
        break;
    }

    const leaveStartDate = new Date(leave.leavestrt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
    const leaveEndDate = new Date(leave.leaveend).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });

    const description = `
    ${positionDescription} ${leave.name}, with Staff ID ${leave.staffid}, will be on leave for ${leaveTypeDescription} 

    from ${leaveStartDate}, to ${leaveEndDate}. During this period, ${positionDescription} ${leave.name},

    who holds the position of ${positionDescription}, will not be available for duty. 


    This leave has been approved due to health concerns, as indicated by the ${leave.leaveType.toLowerCase()} 

    leave type. We wish ${positionDescription} ${leave.name} a swift recovery and look forward to 

    their return to full health and work responsibilities thereafter.
    `;

    doc.setFontSize(12);
    doc.text(description, 15, 75);


    const currentDate = new Date().toLocaleDateString('en-US');
    doc.setFontSize(12);
    doc.text(`Date: ${currentDate}`, 15, 170);
    doc.text('Signature:', 15, 180);

    doc.save(`Leave_Summary_${leave.name}.pdf`);
  };

  const handleSearch = (e) => {
    const value = e.target.value.toLowerCase();
    setSearchQuery(value);

    const filteredData = value
      ? leavedata.filter(leave =>
        leave.name.toLowerCase().includes(value) ||
        leave.staffid.toLowerCase().includes(value)
      )
      : leavedata;
    setLeavedata(filteredData);
  };

  return (
    <Layout>
      <div className='LeaveTable'>
        <div className="search-container">
          <input
            type="text"
            value={searchQuery}
            onChange={handleSearch}
            placeholder="Search by name or staff ID..."
          />
        </div>
        <Table border={1} cellPadding={10} cellSpacing={0}>
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell>Staff ID</TableCell>
              <TableCell>Email</TableCell>
              <TableCell>Position</TableCell>
              <TableCell>Leaves For</TableCell>
              <TableCell>Leave Start</TableCell>
              <TableCell>Leave End</TableCell>
              <TableCell>Leave Type</TableCell>
              <TableCell>Edit</TableCell>
              <TableCell>Delete</TableCell>
              <TableCell>Summary</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {leavedata && leavedata.length > 0 ? (
              leavedata.map((leave) => (
                <TableRow key={leave._id}>
                  <TableCell>{leave.name}</TableCell>
                  <TableCell>{leave.staffid}</TableCell>
                  <TableCell>{leave.email}</TableCell>
                  <TableCell>{leave.position}</TableCell>
                  <TableCell>{leave.doleave}</TableCell>
                  <TableCell>{leave.leavestrt}</TableCell>
                  <TableCell>{leave.leaveend}</TableCell>
                  <TableCell>{leave.leaveType}</TableCell>

                  <TableCell className='actionButtons'>
                    <Link to={`/EditLeave/${leave._id}/${leave.name}/${leave.staffid}/${leave.email}/${leave.position}/${leave.doleave}/${leave.leavestrt}/${leave.leaveend}/${leave.leaveType}`}>
                      <button className="editButton"><FaEdit /></button>
                    </Link>
                  </TableCell>

                  <TableCell className='actionButtons'>
                    <button className="deleteButton" onClick={() => handleDelete(leave._id)}><FaTrash /></button>
                  </TableCell>
                  <TableCell className='actionButtons'>
                    <button className="pdfButton" onClick={() => generatePDF(leave)}>Generate PDF</button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan="11">You have no leave data</TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Layout>
  );
};

export default LeaveTable;
