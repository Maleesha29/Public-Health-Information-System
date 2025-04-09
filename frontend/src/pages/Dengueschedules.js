import React, { useEffect, useState } from 'react';
import Layout from '../components/Layout';
import Axios from 'axios';
import { Dialog, DialogTitle, DialogContent} from '@mui/material';
import Swal from 'sweetalert2';
import Alert from 'react-bootstrap/Alert';
import { Link } from 'react-router-dom';
import { Table, TableBody, TableCell, TableHead, TableRow } from '@mui/material';


const Dengueschedules = () => {
  const [campdata, setcampdata] = useState([]);
  const [stcampdata, setstcampdata] = useState([]);
  const [open, openConfirm] = useState(false);
  const [staffmember, setstaffmember] = useState('');

  useEffect(() => {
    getcampdata();
  }, []);

  const functionPopup = (camp) => {
    setstcampdata(camp);
    openConfirm(true);
  }

  const closepopup = () => {
    openConfirm(false);
  }

  const getcampdata = () => {
    Axios.get('http://localhost:4000/api/camp')
      .then(response => {
        console.log('data from server', response.data);
        setcampdata(response.data.allCampaign);
      })
      .catch(error => {
        console.error("Axios error: ", error);
      })
  };

  const addstaffdengue = async () => {
    try {
      const response = await Axios.post("http://localhost:4000/api/addstaffdengue", {
        venue: stcampdata.venue,
        date: stcampdata.date,
        staffmember: staffmember,
        time: stcampdata.time,
      });
      console.log("Successfully", response.data);
      openConfirm(false);
      setstaffmember('');

      Swal.fire({
        title: "Success!",
        text: "Staff added successfully!",
        icon: "success",
        showConfirmButton: false,
        timer: 1500
      });

    } catch (error) {
      console.error("error", error);
    }
  }

  return (
    <Layout>
      <div className='Dcamptable'>
        <Table border={1} cellPadding={10} cellSpacing={0}>
          <TableHead>
            <TableRow>
              <TableCell>Venue</TableCell>
              <TableCell>Date</TableCell>
              <TableCell>Starting time</TableCell>
              <TableCell>Conducted by</TableCell>
              <TableCell>Assign Staff</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {campdata && campdata.length > 0 ? (
              campdata.map((camp) => (
                <TableRow key={camp._id}>
                  <TableCell>{camp.venue}</TableCell>
                  <TableCell>{camp.date}</TableCell>
                  <TableCell>{camp.time}</TableCell>
                  <TableCell>{camp.drName}</TableCell>
                  <TableCell className='reportButtons'>
                    <button onClick={() => functionPopup(camp)}>Assign Staff</button>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell>You have no camp data</TableCell>
              </TableRow>
            )}
          </TableBody>
          <Link to="/DengueAssignTable">
        <button className="denbtn" style={{ backgroundColor: '#2196f3', color: '#fff', padding: '10px 20px', border: 'none', borderRadius: '5px', cursor: 'pointer', marginTop: '20px' }}>View Assigned Staff</button>
      </Link>
        </Table>
      </div>
      <Dialog open={open}>
        <DialogTitle>Assign staff</DialogTitle>
        <DialogContent>
          <p>{stcampdata.venue}</p>
          <p>{stcampdata.date}</p>
          <p>{stcampdata.time}</p>
          <input type='text' value={staffmember} onChange={(e) => setstaffmember(e.target.value)}></input>
          <Link to="/DengueAssignTable">
            <button onClick={addstaffdengue}>Submit</button>
          </Link>
          <button onClick={closepopup}>Close</button>
        </DialogContent>
      </Dialog>
    </Layout>
  );
};

export default Dengueschedules;
