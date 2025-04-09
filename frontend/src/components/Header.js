import React, { useEffect, useState } from 'react'
import './Header.css'
import { Link, NavLink, useNavigate } from 'react-router-dom'
import { Dialog, DialogTitle } from '@mui/material';
import Lgportal from '../Auth/Lgportal';
import { FaTimes } from 'react-icons/fa';
import { Button, NavDropdown } from 'react-bootstrap';
import Axios from 'axios';
import Swal from 'sweetalert2';
import Aos from 'aos';
import 'aos/dist/aos.css';


const Header = () => {

    const [open, setopen] = useState(false);
    const navigate = useNavigate();

    const functionPopup = () => {
        setopen(true);
    }

    const closePopup = () => {
        setopen(false);
    }
    

    useEffect(() => {
        Aos.init({ duration: 500 }); // Initialize AOS with your desired options
    }, []);

    const user = localStorage.getItem('token');
    const uname = localStorage.getItem('name');

    const logoutopen = () => {
        Swal.fire({
            title: "Are you sure want to logout?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, Logout me!"
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    title: "Success",
                    text: "Your have been logged out",
                    icon: "success",
                    showConfirmButton: false,
                    timer: 1500
                }).then(() => {
                    logout();
                    window.location.reload();
                })
            }
        });
    }

    const logout = async () => {
        localStorage.removeItem('token');
        navigate('/');
    }

    //logins
    const [error, setError] = useState('');
    const [checkdata, setCheckdata] = useState({
        username: "",
        password: ""
    });

    const checkUser = async (e) => {
        e.preventDefault();

        try {
            const { data: res } = await Axios.post('http://localhost:4000/api/checkLogin', checkdata);

            const { token, name } = res;

            localStorage.setItem('token', token);
            localStorage.setItem('name', name);

            setopen(false);


            Swal.fire({
                position: "top-end",
                icon: "success",
                title: "Login Success",
                showConfirmButton: false,
                timer: 1500
            }).then(() => {
                window.location.reload();
            });

        } catch (error) {

            if (error.response &&
                error.response.status >= 400 &&
                error.response.status <= 500) {
                setError(error.response.data.message)
            }
        }
    }

    if (user) {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary bg-transparent">
                    <div className="container">
                        <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse sidebar" id="navbarTogglerDemo01">
                            <div class="offcanvas-header text-white border-bottom">

                                <Link to="/" className="navbar-brand" ><img src='../../natLogo.png' alt='natlogo' height={50} width={40} /></Link>
                                <Link to="/" className="navbar-brand fs-4 title" >Public Health Information System</Link>
                            </div>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className='nav-item'>
                                    <NavLink to='/' className='nav-link'>Home</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/clinics' className='nav-link'>Clinics</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/staff' className='nav-link'>Staff</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/vaccines' className='nav-link'>Vaccines</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/DengueHomePage' className='nav-link'>Dengue</NavLink>
                                </li>

                                <NavDropdown title="Complains" id="navbarDropdown">
                                    <NavDropdown.Item as={NavLink} to="/ComplainsHome">Complains</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/RaidsHome">Raids</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/Fine-And-court">Fine & Court</NavDropdown.Item>
                                </NavDropdown>
                                <li className='nav-item'>
                                    <NavLink to='/mainMidwife' className='nav-link'>Midwife</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <button className='btn btn-primary loginbtn' onClick={logoutopen}>Welcome  {uname}</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
            </>
        )
    } else {
        return (
            <>
                <nav className="navbar navbar-expand-lg bg-body-tertiary bg-transparent">
                    <div className="container">
                        <button className="navbar-toggler shadow-none border-0" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon" />
                        </button>
                        <div className="collapse navbar-collapse sidebar" id="navbarTogglerDemo01">
                            <div class="offcanvas-header text-white border-bottom">
                                <Link to="/" className="navbar-brand" ><img src='../../natLogo.png' alt='natlogo' height={50} width={40} /></Link>
                                <Link to="/" className="navbar-brand fs-4 title" >Public Health Information System</Link>
                            </div>

                            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
                                <li className='nav-item'>
                                    <NavLink to='/' className='nav-link'>Home</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/clinics' className='nav-link'>Clinics</NavLink>
                                </li>

                                <li className='nav-item'>
                                    <NavLink to='/vaccines' className='nav-link'>Vaccines</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <NavLink to='/DengueHomePage' className='nav-link'>Dengue</NavLink>
                                </li>

                                <NavDropdown title="Complains" id="navbarDropdown">
                                    <NavDropdown.Item as={NavLink} to="/ComplainsHome">Complains</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/RaidsHome">Raids</NavDropdown.Item>
                                    <NavDropdown.Item as={NavLink} to="/Fine-And-court">Fine & Court</NavDropdown.Item>
                                </NavDropdown>
                                <li className='nav-item'>
                                    <NavLink to='/mainMidwife' className='nav-link'>Midwife</NavLink>
                                </li>
                                <li className='nav-item'>
                                    <button className='btn btn-primary loginbtn' onClick={functionPopup}>Login</button>
                                </li>
                            </ul>
                        </div>
                    </div>
                </nav>
                <Dialog open={open} className="dialog-container">
                    <div className="dialog-content">
                        <div>
                            <h2>Staff Login</h2>
                            <br />
                            <div className="input-group">
                                <input
                                    type='text'
                                    value={checkdata.username}
                                    onChange={(e) => setCheckdata({ ...checkdata, username: e.target.value })}
                                    className="input-field"
                                    placeholder=''
                                />
                                <label className="placeholder-label">Username</label>
                            </div>
                            <br />
                            <div className="input-group">
                                <input
                                    type='password'
                                    value={checkdata.password}
                                    onChange={(e) => setCheckdata({ ...checkdata, password: e.target.value })}
                                    className="input-field"
                                    placeholder=''
                                />
                                <label className="placeholder-label">Password</label>
                            </div>
                            <br />

                            {error && <p className="error-message">{error}</p>}
                            <Button type='submit' onClick={checkUser} className="btnlg">Login</Button>

                            <Button type='submit' onClick={closePopup} className="btnlg2">Go Back</Button>
                        </div>
                    </div>
                </Dialog>

            </>
        )
    }
}

export default Header




