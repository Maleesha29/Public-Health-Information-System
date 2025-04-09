import React, { useState } from 'react';
import { Link, useParams, useNavigate } from 'react-router-dom';
import Layout from '../components/Layout';
import Axios from 'axios';
import Swal from 'sweetalert2';

const RaidSubFormEdit = () => {
  const { _id, vname, vemail, vcno, vnic, vtype, location, details } = useParams();
  const [location_u, setslocation] = useState(location);
  const [id_u, sets_id] = useState(_id);
  const [details_u, setsdetails] = useState(details);
  const [vname_u, setsvname] = useState(vname);
  const [vemail_u, setsvemail] = useState(vemail);
  const [vcno_u, setsvcno] = useState(vcno);
  const [vnic_u, setsvnic] = useState(vnic);
  const [vtype_u, setsvtype] = useState(vtype);

  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const updateRS = async (_id, vname, vemail, vcno, vnic, vtype, location, details) => {
    try {
      const response = await Axios.post(`http://localhost:4000/api/updateRS`, {
        _id: _id,
        vname,
        vemail,
        vcno,
        vnic,
        vtype,
        location,
        details,
      });

      console.log('Raid Submission updated successfully:', response.data);
    } catch (error) {
      console.error('Error updating Raid Form:', error);
    }
  };

  const updateF = async () => {

    try {
      const response = await updateRS(id_u, vname_u, vemail_u, vcno_u, vnic_u, vtype_u, location_u, details_u,);
      console.log(response);
      sets_id(_id);
      setslocation('');
      setsdetails('');
      setsvname('');
      setsvemail('');
      setsvcno('');
      setsvnic('');
      setsvtype('');
      sets_id('');

      navigate('/RaidSubTable');
    } catch (error) {
      console.log('Error', error);
    }
  };

  const conUpdate = () => {
    Swal.fire({
      title: 'Do you want to save the changes?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: 'Save',
      denyButtonText: `Don't save `,
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire('Saved', 'updated successfully!!', 'success');
        updateF();
      } else if (result.isDenied) {
        Swal.fire('Changes are not saved', '', 'info');
      }
    });
  };

  return (
    <Layout>
      <div className='bdtitle'>
        <h3 className='he3'>Raid Submission</h3>
        <form className='addRS'>
          <p>{_id}</p>
          <div className='input'>
            <label htmlFor='vname'>Vialator name</label>
            <input value={vname_u} onChange={e => setsvname(e.target.value)} type='text' id='vname' autoComplete='off' placeholder='Vialator name' />
            {/* {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>} */}
          </div>
          <div className='input'>
            <label htmlFor='vemail'>Vialator email</label>
            <input value={vemail_u} onChange={e => setsvemail(e.target.value)} type='text' id='vemail' autoComplete='off' placeholder='Email' />
            {/* {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>} */}
          </div>
          <div className='input'>
            <label htmlFor='vnic'>Vialator NIC</label>
            <input value={vnic_u} onChange={e => setsvnic(e.target.value)} type='number' id='nic' autoComplete='off' placeholder='NIC' />
            {/* {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>} */}
          </div>

          <div className='input'>
            <label htmlFor='vcno'>Vialator Contact-no</label>
            <input value={vcno_u} onChange={e => setsvcno(e.target.value)} type='text' id='vcno' autoComplete='off' placeholder='Contact No' />
            {/* {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>} */}
          </div>
          <div className='input'>
            <label htmlFor='vtype'>Vialation type</label>
            <select value={vtype_u} onChange={e => setsvtype(e.target.value)}>
              <option>Select violation type</option>
              <option>Food Violation</option>
              <option>Dengue Violation</option>
            </select>
          </div>
          <div className='input'>
            <label htmlFor='location'>Location</label>
            <input value={location_u} onChange={e => setslocation(e.target.value)} type='text' id='location' autoComplete='off' placeholder='Location' />
            {errorMessage.location && <div className="text-danger">{errorMessage.location}</div>}
          </div>

          <div className='input'>
            <label htmlFor='details'>Details</label>
            <input value={details_u} onChange={e => setsdetails(e.target.value)} type='text' id='details' autoComplete='off' placeholder='Details' />
            {errorMessage.details && <div className="text-danger">{errorMessage.details}</div>}
          </div>

          {/* <div className='input'>
                        <label htmlFor='specialNotes'>Special Notes</label>
                        <input value={specialnotes_u} onChange={e => setSpecialNotes(e.target.value)} type='text' id='specialNotes' autoComplete='off' placeholder='Special Notes' />
                        {errorMessage.specialNotes && <div className="text-danger">{errorMessage.specialNotes}</div>}
                    </div> */}
          <Link to='/raidsubtable'>
            <button className='bsubmit' >View Raids</button>
          </Link>
          <button type='button' onClick={conUpdate} className='bdsave'>Update</button>
        </form>
      </div>
    </Layout>
  );
};

export default RaidSubFormEdit;
