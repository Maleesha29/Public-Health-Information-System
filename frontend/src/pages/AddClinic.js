import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import { FaUser } from 'react-icons/fa'
import { Button, Form, Alert } from 'react-bootstrap'
import '../styles/addClinics.css'
import Axios from 'axios'
import Swal from 'sweetalert2'
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';
import Aos from 'aos';
import 'aos/dist/aos.css';

const AddClinic = () => {

    const navigate = useNavigate();

    const [ctype, setCtype] = useState('');
    const [date, setDate] = useState('');
    const [venue, setVenue] = useState('');
    const [errorMessage, setErrorMessage] = useState('');


    const uname = localStorage.getItem('name');

    const validateSchema = Yup.object().shape({
        ctype: Yup.string().required('Clinic type is required').oneOf(['Dengue', 'Dental'], 'Invalid Clinic Type'),
        date: Yup.string()
            .required('Date is Required')
            .test('future-date', 'Clinic date must not be a past date', (value) => {
                const selectedDate = new Date(value);
                const currentDate = new Date();
                return selectedDate > currentDate;
            }),
        venue: Yup.string().required('Venue is required').matches(/^[A-Za-z\s,./0-9]+$/, 'Name must contain only letters and numbers'),
    })

    useEffect(() => {
        Aos.init({ duration: 1000 }); // Initialize AOS with your desired options
    }, []);

    const addClnics = async () => {
        try {
            await validateSchema.validate(
                {
                    ctype,
                    date,
                    venue,
                },
                { abortEarly: false }
            );

            const response = await Axios.post('http://localhost:4000/api/addClinic', {

                ctype: ctype,
                date: date,
                venue: venue,
                uname: uname
            });

            console.log("Clinic adding is successful", response.data);
            Swal.fire({
                title: "Success!",
                text: "CLinic was added successfully!",
                icon: "success",
                showConfirmButton: false,
                timer: 2000
            });
            setCtype('');
            setDate('');

            setVenue('');
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
    }

    const navtoClinics = async () => {
        navigate('/adminClinics');
    }

    const navtoGenrep = async () => {
        navigate('/genPatientReport')
    }

    return (
        <div className='contflex' data-aos="fade-up">
            <hr className='hline' />
            <div className='clcontainer'>
                <div className='cl1' >
                    <FaUser />
                    <p><b>Dr {uname}</b></p>
                </div>
                <div className='frm'>
                    <h2 >Add a Clinic appointment </h2>
                    <br />
                    <div className='rdgrp'>
                        <div className='rdbtn'>
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault1"
                                value='Dengue'
                                checked={ctype === 'Dengue'}
                                onChange={e => setCtype(e.target.value)} />
                            <label class="form-check-label" for="flexRadioDefault1">
                                Dengue
                            </label>
                        </div>
                        <div className='rdbtn'>
                            <input class="form-check-input" type="radio" name="flexRadioDefault" id="flexRadioDefault2"
                                value='Dental'
                                checked={ctype === 'Dental'}
                                onChange={e => setCtype(e.target.value)} />
                            <label class="form-check-label" for="flexRadioDefault2">
                                Dental
                            </label>
                        </div>
                    </div>
                    {errorMessage.ctype && <div className="d-flex justify-content-center text-danger">{errorMessage.ctype}</div>}
                    <br />
                    <div className='slcbtn'>
                        <p>Select date and Time:</p>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type='datetime-local'
                                    value={date}
                                    onChange={e => setDate(e.target.value.toString())} />
                            </Form.Group>
                        </Form>

                    </div>
                    {errorMessage.date && <div className="d-flex justify-content-center text-danger">{errorMessage.date}</div>}
                    <br />
                    <div className='slcbtn'>
                        <p>Venue:</p>
                        <Form>
                            <Form.Group>
                                <Form.Control
                                    type='text'
                                    value={venue}
                                    onChange={e => setVenue(e.target.value)}
                                />
                            </Form.Group>
                        </Form>
                    </div>
                    {errorMessage.venue && <div className="d-flex justify-content-center text-danger">{errorMessage.venue}</div>}
                    <br />
                    <Button onClick={addClnics}>Submit</Button>
                    <br />
                    <hr />
                    <br />
                    <Button onClick={navtoClinics}>View clinics</Button>
                    <Button className='btn' onClick={navtoGenrep}>Generate report</Button>
                </div>
            </div>
        </div>
    )
}

export default AddClinic;


/**<div class='containC'>
                <div class='slider-frameC'>
                    <div class='slider-imgC'>
                        <div class='img-containerC'>
                            <img src={teeth} alt='clinic' width={500} height={500} />
                        </div>

                    </div>
                </div>
            </div> */