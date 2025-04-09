import React, { useState, useEffect } from 'react';
import Axios from 'axios';
import { Button, Dialog, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import { Link } from 'react-router-dom';
import Layout from '../components/Layout';
import '../styles/Complainstable.css';
import Swal from 'sweetalert2';
import { FaTimes } from 'react-icons/fa';

const RaidOfficerAssign = () => {
  const [officerData, setOfficerData] = useState([]);
  const [complaintData, setComplaintData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [openstaff, setopenStaff] = useState(false);
  const [open, setopen] = useState(false);
  const [compstaff, setcompstaff] = useState([]);
  const [officer, setOfficer] = useState('');
  const [datentime, setDatenTime] = useState('');
  const [notes, setNotes] = useState('');
  const [selectedComplainID, setSelectedComplainId] = useState(null);


  const popupstaffs = (compid) => {
    setopenStaff(true);
    setSelectedComplainId(compid);
  }

  const closepopupstaffs = () => {
    setopenStaff(false);
  }

  const setStaff = (Complains) => {
    setopen(true);
    setcompstaff(Complains);
  }

  const closesetstaff = () => {
    setopen(false);
  }

  useEffect(() => {
    getOfficerData();
    getComplaintData();
  }, []);

  const getOfficerData = () => {
    Axios.get('http://localhost:4000/api/getraidofficer')
      .then(response => {
        console.log('Officer data from server', response.data);
        setOfficerData(response.data.allraidofficer);
      })
      .catch(error => {
        console.error("Axios error: ", error);
      });
  };

  const selectedOfficers = officerData.filter(officer => officer.compID === selectedComplainID);

  const addRaidOfficer = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/api/addraidofficer", {
        Name: compstaff.fname,
        Type: compstaff.yaddress,
        Address: compstaff.ctype,
        DateTime:datentime,
        Specialnotes:notes,
        compID: compstaff._id,
      });
      console.log("Successfully", response.data);
      setopen(false);
      setOfficer('');

      Swal.fire({
        title: "Success!",
        text: "Officer added successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error("error", error);
    }
  }

  const getComplaintData = () => {
    Axios.get('http://localhost:4000/api/Complain')
      .then(response => {
        console.log('Complaint data from server', response.data);
        setComplaintData(response.data);
      })
      .catch(error => {
        console.error("Axios error:", error);
      });
  };

  const handleSearch = (e) => {
    setSearchQuery(e.target.value);
  };

  // const filteredData = selectedOfficers.filter(officer => {
  //   const fullName = `${officer.officer}`.toLowerCase();
  //   return fullName.includes(searchQuery.toLowerCase());
  // });

  return (
    <Layout>
      <div className='Complainstable'>
        <h2>Assign Officer</h2>

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
              {complaintData && complaintData.length > 0 ? (
                complaintData.map((Complains) => (
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
                      <Button onClick={() => popupstaffs(Complains._id)}>View Schedules raids</Button>
                      <Button className="pdfButton" onClick={() => setStaff(Complains)}>Schedule raids</Button>
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell>You have no Complains data to assign staff</TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </TableContainer>
      </div>
      <Dialog open={open}>
        <p>First name : {compstaff.fname}</p>
        <p>Addr : {compstaff.yaddress}</p>
        <p>Type : {compstaff.ctype}</p>
        
        
        <label>Select Time:</label>
      
        <input type='datetime-local' value={datentime} onChange={(e) => setDatenTime(e.target.value)}></input>
        <label> Specialnotes:</label>
        <input type='text' value={notes} onChange={(e) => setNotes(e.target.value)}></input>

        <Button onClick={addRaidOfficer}>Submit</Button>
        <Button onClick={closesetstaff}>Close</Button>
      </Dialog>
      <Dialog open={openstaff}>

        <DialogTitle>Scheduled Raids<FaTimes onClick={closepopupstaffs} /></DialogTitle>
        <TextField
          label="Search officer"
          variant="outlined"
          value={searchQuery}
          onChange={handleSearch}
        />
        <TableContainer component={Paper}>
          <Table border={1} cellPadding={10} cellSpacing={0}>
            <TableHead>
              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>Type</TableCell>
                <TableCell>Address</TableCell>
                <TableCell>Date </TableCell>
                <TableCell>Time </TableCell>
                <TableCell>Special Notes  </TableCell>



              </TableRow>
            </TableHead>
            <TableBody>
              {selectedOfficers.map((officer) => (
                <TableRow key={officer._id}>
                  <TableCell>{officer.Name}</TableCell>
                  <TableCell>{officer.Type}</TableCell>
                  <TableCell>{officer.Address}</TableCell>
                  <TableCell>{new Date(officer.DateTime).toLocaleDateString()}</TableCell>
                  <TableCell>{new Date(officer.DateTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</TableCell>
                  <TableCell>{officer.Specialnotes}</TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </Dialog>
    </Layout>
  );
};

export default RaidOfficerAssign;
