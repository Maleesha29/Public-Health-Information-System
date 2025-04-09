import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import '../styles/RaidSchedules.css';
import Swal from 'sweetalert2';
import { Dialog, DialogTitle, DialogContent } from '@mui/material';

const RaidSchedules = ({ submitted, data }) => {
  const [submissiondata, setSubmissionData] = useState([]);
  const [stradpdata, setStradpdata] = useState({});
  const [open, setOpen] = useState(false);
  const [staffmember, setStaffmember] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  
  useEffect(() => {
    getSubmissionData();
  }, []);

  const getSubmissionData = () => {
    Axios.get('http://localhost:4000/api/raidForm')
      .then(response => {
        console.log('Data from server:', response.data);
        setSubmissionData(response.data.allRF);
      })
      .catch(error => {
        console.error('Axios error:', error);
      });
  }

  const functionPopup = (raidSub) => {
    setStradpdata(raidSub);
    setOpen(true);
  }

  const closePopup = () => {
    setOpen(false);
  }

  const addStaffRaids = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/api/addstaffraids", {
        location: stradpdata.location,
        date: stradpdata.date,
        time: stradpdata.time,
        officer: stradpdata.officer,
        sNote: stradpdata.sNote
      });
      console.log('data ', response.data);    
      setOpen(false);
      setStaffmember('');

      Swal.fire({
        title: "Success!",
        text: "Staff added successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error("Error:", error);
    }
  }

  return (
    <Layout>
      <h2>Raid Form Table</h2>
      <div className='FormtableTab'>
        <table border={1} cellPadding={10} cellSpacing={0}>
          <thead>
            <tr>
              <th>Location</th>
              <th>Date</th>
              <th>Time</th>
              <th>Officer</th>
              <th>Special Notes</th>
              <th>Assign Staff</th>
            </tr>
          </thead>
          <tbody>
            {submissiondata && submissiondata.length > 0 ? (
              submissiondata.map((raidSub) => (
                <tr key={raidSub._id}>
                  <td>{raidSub.location}</td>
                  <td>{raidSub.date}</td>
                  <td>{raidSub.time}</td>
                  <td>{raidSub.officer}</td>
                  <td>{raidSub.sNote}</td>
                  <td className='reportButtons'>
                    <button onClick={() => functionPopup(raidSub)}>Assign Staff</button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6"><center>No Raid Data Available</center></td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <Dialog open={open}>
        <DialogTitle>Assign staff</DialogTitle>
        <DialogContent>
          <p>Location: {stradpdata.location}</p>
          <p>Date: {stradpdata.date}</p>
          <p>Time: {stradpdata.time}</p>
          <input type='text' value={staffmember} onChange={(e) => setStaffmember(e.target.value)}></input>
          <button onClick={addStaffRaids}>Submit</button>
          <button onClick={closePopup}>Close</button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default RaidSchedules;
