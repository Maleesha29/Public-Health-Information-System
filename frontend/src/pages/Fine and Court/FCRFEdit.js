import React, { useEffect, useState } from 'react';
import '../../styles/FCReportSubmit.css';
import Layout from '../../components/Layout';
import Axios from 'axios';
import Swal from "sweetalert2";
import * as Yup from 'yup';
import { useNavigate, useParams } from 'react-router-dom';

const FCRFEdit = () => {

  const { _id, ro_name, ro_email, ro_mobile, date, v_location, v_type, v_description, v_name, v_nic, v_mobile, v_email } = useParams();
  const [ROname_u, setROname] = useState(ro_name);
  const [Roemail_u, setRoemail] = useState(ro_email);
  const [ROcontact_u, setROcontact] = useState(ro_mobile);
  const [date_u, setdate] = useState(date);
  const [location_u, setlocation] = useState(v_location);
  const [foodViolation_u, setFoodViolation] = useState(false);
  const [dengueViolation_u, setDengueViolation] = useState(false);
  const [description_u, setdescription] = useState(v_description);
  const [vName_u, setvName] = useState(v_name);
  const [vEmail_u, setvEmail] = useState(v_email);
  const [vContact_u, setvContact] = useState(v_mobile);
  const [vId_u, setvId] = useState(v_nic);
  const [errorMessage, setErrorMessage] = useState('');
  const [violationType_u, setViolationType] = useState(
    v_type === 'Food Violation' ? 'foodViolation' : 'dengueViolation'
  );

  const navigate = useNavigate();

  useEffect(() => {
    if (v_type === 'Food Violation') {
      setFoodViolation(true);
      setDengueViolation(false);
      setViolationType('foodViolation');
    } else if (v_type === 'Dengue Violation') {
      setDengueViolation(true);
      setFoodViolation(false);
      setViolationType('dengueViolation');
    }
  }, [v_type]);

  useEffect(() => {
    const validateForm = async () => {
      try {
        await validateSchema.validate({
          ROname_u,
          Roemail_u,
          ROcontact_u,
          date_u,
          location_u,
          violationType_u,
          description_u,
          vName_u,
          vEmail_u,
          vContact_u,
          vId_u,
        }, { abortEarly: false });

        setErrorMessage({});

      } catch (error) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      }
    };

    validateForm();
  }, [ROname_u, Roemail_u, ROcontact_u, date_u, location_u, violationType_u, description_u, vName_u, vEmail_u, vContact_u, vId_u]);

  const updateRF = async (_id, ro_name, ro_email, ro_mobile, date, v_location, v_type, v_description, v_name, v_nic, v_mobile, v_email) => {
    try {
      const response = await Axios.post('http://localhost:4000/api/updateVioR', {
        _id: _id,
        ro_name,
        ro_email,
        ro_mobile,
        date,
        v_location,
        violationType_u,
        v_type,
        v_description,
        v_name,
        v_nic,
        v_mobile,
        v_email,
      });
      console.log("Form Update Successfully", response.data);
      return response;
    } catch (error) {
      console.error('Error', error);
      throw error;
    }
  }

  const updateRVf = async () => {
    try {
      await validateSchema.validate({
        ROname_u,
        Roemail_u,
        ROcontact_u,
        date_u,
        location_u,
        violationType_u,
        description_u,
        vName_u,
        vEmail_u,
        vContact_u,
        vId_u,
      }, { abortEarly: false });
  
      const validationTypeValue = foodViolation_u ? 'Food Violation' : dengueViolation_u ? 'Dengue Violation' : '';
  
      await updateRF(_id, ROname_u, Roemail_u, ROcontact_u, date_u, location_u, validationTypeValue, description_u, vName_u, vId_u, vContact_u, vEmail_u);
      Swal.fire({
        icon: 'success',
        title: 'Success!',
        text: 'Report Update Successfully.',
      }).then(() => {
        navigate('/F&CDReportViolationTable');
      });
    } catch (error) {
      if (error && error.inner) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      } else {
        console.log("Error", error);
      }
    }
  };
  

  const validateSchema = Yup.object().shape({
    ROname_u: Yup.string().required('Report ID is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    Roemail_u: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Gmail address').required('Email is Required'),
    ROcontact_u: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact number is Required'),
    date_u: Yup.string().required('Date is Required'),
    location_u: Yup.string().required('Location is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Location must contain only letters and numbers'),
    description_u: Yup.string().required('Description is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Description must contain only letters'),
    vName_u: Yup.string().required('Name is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    vEmail_u: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Email address').required('Email is Required'),
    vContact_u: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact Number is Required'),
    vId_u: Yup.string().required('NIC is required').matches(/^\d{11}(V|v|\d)$/, 'Invalid NIC Number'),
    violationType_u: Yup.string().required('Violation Type is required').oneOf(['foodViolation', 'dengueViolation'], 'Violation Type Required'),
  });

  // Function to handle radio button changes
  const handleViolationTypeChange = (type) => {
    if (type === 'foodViolation') {
      setFoodViolation(true);
      setDengueViolation(false);
      setViolationType('foodViolation');
    } else if (type === 'dengueViolation') {
      setDengueViolation(true);
      setFoodViolation(false);
      setViolationType('dengueViolation');
    }
  };

  return (
    <Layout>
      <div className="form-container">
        <form className='form'>
          <h2>Report Violation</h2>
          <h4>Raid Officer Information</h4>
          <div className='ROinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={ROname_u} onChange={(e) => setROname(e.target.value)} />
              {errorMessage.ROname_u && <div className="errorMessage">{errorMessage.ROname_u}</div>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={Roemail_u} onChange={(e) => setRoemail(e.target.value)} />
              {errorMessage.Roemail_u && <div className="errorMessage">{errorMessage.Roemail_u}</div>}
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="text" name="contactNumber" value={ROcontact_u} onChange={(e) => setROcontact(e.target.value)} />
              {errorMessage.ROcontact_u && <div className="errorMessage">{errorMessage.ROcontact_u}</div>}
            </div>
            <div>
              <label>Date:</label>
              <input type="date" name="date" value={date_u} onChange={(e) => setdate(e.target.value)} />
              {errorMessage.date_u && date === '' && <div className="errorMessage">Invalid Date</div>}
            </div>
          </div>
          <h4>Violation Details</h4>
          <div className='Vdetails'>
            <div>
              <label>Location:</label>
              <input type="text" name="location" value={location_u} onChange={(e) => setlocation(e.target.value)} />
              {errorMessage.location_u && <div className="errorMessage">{errorMessage.location_u}</div>}
            </div>
            <div>
              <label>Violation Type:</label>
              <input type="radio" id="foodViolation" name="violationType" value="foodViolation" checked={violationType_u === 'foodViolation'} onChange={() => handleViolationTypeChange('foodViolation')} />
              Food Violation
              <span style={{ marginRight: '40px' }}></span>
              <input type="radio" id="dengueViolation" name="violationType" value="dengueViolation" checked={violationType_u === 'dengueViolation'} onChange={() => handleViolationTypeChange('dengueViolation')} />
              Dengue Violation
              {errorMessage.violationType_u && <div className="errorMessage">{errorMessage.violationType_u}</div>}
            </div>
            <div>
              <label>Violation Description:</label>
              <textarea name="description" value={description_u} onChange={(e) => setdescription(e.target.value)} />
              {errorMessage.description_u && <div className="errorMessage">{errorMessage.description_u}</div>}
            </div>
          </div>
          <h4>Violator Information</h4>
          <div className='Vinfo'>
            <div>
              <label>Name:</label>
              <input type="text" name="name" value={vName_u} onChange={(e) => setvName(e.target.value)} />
              {errorMessage.vName_u && <div className="errorMessage">{errorMessage.vName_u}</div>}
            </div>
            <div>
              <label>Email:</label>
              <input type="email" name="email" value={vEmail_u} onChange={(e) => setvEmail(e.target.value)} />
              {errorMessage.vEmail_u && <div className="errorMessage">{errorMessage.vEmail_u}</div>}
            </div>
            <div>
              <label>Contact Number:</label>
              <input type="text" name="contactNumber" value={vContact_u} onChange={(e) => setvContact(e.target.value)} />
              {errorMessage.vContact_u && <div className="errorMessage">{errorMessage.vContact_u}</div>}
            </div>
            <div>
              <label>NIC Number:</label>
              <input type="text" name="idNumber" value={vId_u} onChange={(e) => setvId(e.target.value)} />
              {errorMessage.vId_u && <div className="errorMessage">{errorMessage.vId_u}</div>}
            </div>
          </div>
          <button className="upbutton" type="button" onClick={updateRVf}>
            Update Report
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default FCRFEdit;