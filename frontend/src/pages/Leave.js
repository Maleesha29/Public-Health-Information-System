import React, { useEffect, useState } from "react";
import Axios from "axios";
import { Link } from "react-router-dom"; // Import Link
import Layout from "../components/Layout";
import Swal from "sweetalert2"; // Import SweetAlert
import Alert from "react-bootstrap/Alert"; // Import Bootstrap Alert component
import "../styles/Leave.css";
import { useNavigate } from "react-router-dom";
import * as Yup from 'yup';


const Leave = ({ submitted, data }) => {
  const [name, setName] = useState("");
  const [staffId, setStaffId] = useState("");
  const [email, setEmail] = useState("");
  const [position, setPosition] = useState("");
  const [leaveType, setLeaveType] = useState("");
  const [leaveFor, setLeaveFor] = useState("Days");
  const [leaveStart, setLeaveStart] = useState("");
  const [leaveEnd, setLeaveEnd] = useState("");
  const [errorMessage, setErrorMessage] = useState('');
  const [validationError, setValidationError] = useState(false); // State for validation error

  useEffect(() => {
    if (!submitted) {
      clearForm();
    }
  }, [submitted]);

  useEffect(() => {
    if (data?.id && data.id !== 0) {
      setName(data.name);
      setStaffId(data.staffid);
      setEmail(data.email);
      setPosition(data.position);
      setLeaveType(data.leaveType);
      setLeaveFor(data.doleave);
      setLeaveStart(data.leavestrt);
      setLeaveEnd(data.leaveend);
      navigate('/LeaveTable');

    }
  }, [data]);

  const navigate = useNavigate();

  const validateSchema = Yup.object().shape({
    name: Yup.string().required('Report ID is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Gmail address').required('Email is Required'),
    leaveStart: Yup.string()
    .required('Date is Required')
    .test('date', 'Date must be the current date or a future date', function (value) {
      const selectedDate = new Date(value);
      const currentDate = new Date();
      return selectedDate >= currentDate; // Change the condition to >= for future dates
    }),
    leaveEnd: Yup.string()
    .required('Date is Required')
    .test('date', 'Date must be after leave start date', function (value) {
      const selectedEndDate = new Date(value);
      const selectedStartDate = new Date(leaveStart); // Convert leaveStart to date object
      return selectedEndDate > selectedStartDate;
    }),
    
    staffId: Yup.string().required('Location is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Staff ID must contain only letters'),
    position: Yup.string().required('Report ID is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    leaveFor: Yup.string().required('Leave for is required').oneOf(['Days', 'Hours'], 'Invalid leave '),
    leaveType: Yup.string().required('Leave type for is required').oneOf(['Sick', 'Vacation', 'Quitting'], 'Invalid leave '),

  });

  const clearForm = () => {
    setName("");
    setStaffId("");
    setEmail("");
    setPosition("");
    setLeaveType("");
    setLeaveFor("Days");
    setLeaveStart("");
    setLeaveEnd("");
  };

  const addLeave = async () => {

    try {
      await validateSchema.validate(
        {
          name,
          staffId,
          email,
          position,
          leaveType,
          leaveFor,
          leaveStart,
          leaveEnd,

        },
        { abortEarly: false }
      );

      const response = await Axios.post("http://localhost:4000/api/addLeave", {
        name: name,
        staffid: staffId,
        email: email,
        position: position,
        doleave: leaveFor,
        leavestrt: leaveStart,
        leaveend: leaveEnd,
        leaveType: leaveType,
      });

      console.log("Successfully", response.data);

      // Display success message
      Swal.fire({
        position: "top-end",
        icon: "success",
        title: "Leave added Successfully",
        showConfirmButton: false,
        timer: 1500,
      }).then(() => {
        navigate('/LeaveTable');
      });
    } catch (error) {
      if (error instanceof Yup.ValidationError) {
        const errors = {};
        error.inner.forEach(err => {
          errors[err.path] = err.message;
        });
        setErrorMessage(errors);
      } else {
        console.error('Error', error);
      }
    }
  };

  return (
    <Layout>
      <div className="layout-container5">
        <div className="leave">
          <form className="emailForm">
            <h2>Leave Request Form</h2>
           
            <div>
              <label>Staff ID:</label>
              <input
                onChange={(e) => setStaffId(e.target.value)}
                type="text"
                name="staffId"
                value={staffId}
              />{errorMessage.staffId && <div className="errorMessage">{errorMessage.staffId}</div>}

            </div>
            <div>
              <label>Name:</label>
              <input
                onChange={(e) => setName(e.target.value)}
                type="text"
                name="name"
                value={name}
              />{errorMessage.name && <div className="errorMessage">{errorMessage.name}</div>}

            </div>
            <div>
              <label>Email:</label>
              <input
                onChange={(e) => setEmail(e.target.value)}
                type="email"
                name="email"
                value={email}
              />{errorMessage.email && <div className="errorMessage">{errorMessage.email}</div>}

            </div>
            <div>
              <label>Position:</label>
              <input
                onChange={(e) => setPosition(e.target.value)}
                type="text"
                name="position"
                value={position}
              />{errorMessage.position && <div className="errorMessage">{errorMessage.position}</div>}

            </div>
            <div>
              <label>Details of leave:</label>
              <div>
                <input
                  value="Days"
                  checked={leaveFor === 'Days'}
                  onChange={() => setLeaveFor("Days")}
                  type="radio"
                  id="days"
                />
                <label htmlFor="days">Days</label>
              </div>
              {errorMessage.leaveFor && <div className="errorMessage">{errorMessage.leaveFor}</div>}

              <div>
                <input
                  value="Hours"
                  checked={leaveFor === "Hours"}
                  onChange={() => setLeaveFor("Hours")}
                  type="radio"
                  id="hours"
                />
                <label htmlFor="hours">Hours</label>
              </div>
              {errorMessage.leaveFor && <div className="errorMessage">{errorMessage.leaveFor}</div>}
            </div>
            <div>
              <label>Leave Start:</label>
              <input
                onChange={(e) => setLeaveStart(e.target.value)}
                type="date"
                name="leaveStart"
                value={leaveStart}
              />
              {errorMessage.leaveStart && <div className="errorMessage">{errorMessage.leaveStart}</div>}
            </div>
            <div>
              <label>Leave End:</label>
              <input
                onChange={(e) => setLeaveEnd(e.target.value)}
                type="date"
                name="leaveEnd"
                value={leaveEnd}
              />
              {errorMessage.leaveEnd && <div className="errorMessage">{errorMessage.leaveEnd}</div>}
            </div>
            <div>
              <label>Leave type:</label>
              <div>
                <input
                  value="Sick"
                  checked={leaveType === "Sick"}
                  onChange={() => setLeaveType("Sick")}
                  type="radio"
                  id="sick"
                />
                <label htmlFor="sick">Sick</label>
              </div>
              <div>
                <input
                  value="Vacation"
                  checked={leaveType === "Vacation"}
                  onChange={() => setLeaveType("Vacation")}
                  type="radio"
                  id="vacation"
                />
                <label htmlFor="vacation">Vacation</label>
              </div>
              <div>
                <input
                  value="Quitting"
                  checked={leaveType === "Quitting"}
                  onChange={() => setLeaveType("Quitting")}
                  type="radio"
                  id="quitting"
                />
                <label htmlFor="quitting">Quitting</label>
              </div>
              {errorMessage.leaveType && <div className="errorMessage">{errorMessage.leaveType}</div>}

            </div>


            <button onClick={addLeave} className="subBut" type="button">
              Submit
            </button>
          </form>
        </div>
      </div>
    </Layout>
  );
};

export default Leave;
