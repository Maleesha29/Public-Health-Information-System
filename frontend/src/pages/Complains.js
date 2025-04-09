import Layout from "../components/Layout";
import "../styles/Complains.css";
import React, { useEffect, useState, useRef, useCallback } from "react";
import { Form, Button, Container, Row, Col } from "react-bootstrap";
import Axios from "axios";
import Swal from "sweetalert2";
import { useNavigate } from 'react-router-dom';
import { GoogleMap, Marker, useJsApiLoader } from "@react-google-maps/api";
import * as Yup from 'yup';
import { motion, useScroll } from 'framer-motion'
import Aos from 'aos';
import 'aos/dist/aos.css'; //anim
import Complainstable from "./Complainstable";

const mapStyle = {
  height: "300px",
  width: "100%",
};


const ComplaintForm = () => {

  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fname: "",
    lname: "",
    mobile: "",
    email: "",
    NIC: "",
    yaddress: "",
    images: [],
    ctype: null,
    cdesc: "",
    date: "",
    area: "",

  });

  const [errorMessage, setErrorMessage] = useState("");

  const validateSchema = Yup.object().shape({
    fname: Yup.string().required('First Name is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    lname: Yup.string().required('Last Name is Required').matches(/^[A-Za-z\s]+$/, 'Name must contain only letters'),
    mobile: Yup.string().matches(/^0\d{9}$/, 'Invalid Contact Number').required('Contact number is Required'),
    email: Yup.string().matches(/^[a-zA-Z0-9._%+-]+@gmail\.com$/, 'Invalid Gmail address').required('Email is Required'),
    NIC: Yup.string().required('NIC is required').matches(/^\d{11}(V|v|\d)$/, 'Invalid NIC Number'),
    yaddress: Yup.string().required('Address is Required').matches(/^[A-Za-z\s,-./0-9]+$/, 'Address must contain only letters and numbers'),
    images: Yup.array().min(1, 'img is required').required('At least one document is required'),
    cdesc: Yup.string().required('Description is Required').matches(/^[A-Za-z\s,"".''0-9]+$/, 'Description must contain only letters & numbers'),
    ctype: Yup.string().required('Complain Type is Required'),
    date: Yup.string().required('Date is Required'),
    area: Yup.string().required('Location is Required').matches(/^[A-Za-z\s,.0-9]+$/, 'Location must contain only letters'),


  });

  const addComplain = async (e) => {

    e.preventDefault();

    try {

      await validateSchema.validate(formData,

        { abortEarly: false }
      );

      console.log(formData);
      // Prepare the request payload
      const formdata = new FormData();
      formdata.append("fname", formData.fname);
      formdata.append("lname", formData.lname);
      formdata.append("mobile", formData.mobile);
      formdata.append("email", formData.email);
      formdata.append("NIC", formData.NIC);
      formdata.append("date", formData.date);
      formdata.append("yaddress", formData.yaddress);
      formdata.append("ctype", formData.ctype);
      formdata.append("cdesc", formData.cdesc);
      formdata.append("area", formData.area);


      // Append each image file to FormData
      if (formData.images && formData.images.length > 0) {
        for (let i = 0; i < formData.images.length; i++) {
          formdata.append("images", formData.images[i]);
        }
      }

      console.log(formdata.get("images"));
      // Make Axios POST request to the backend API endpoint
      const response = await Axios.post(
        "http://localhost:4000/api/addComplain",
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      // Clear the form after successful submission
      setFormData({
        fname: "",
        lname: "",
        mobile: "",
        email: "",
        NIC: "",
        date: "",
        yaddress: "",
        images: [],
        ctype: "",
        cdesc: "",
        area: "",

      });

      console.log("Data stored successfully", response.data);
      Swal.fire({
        title: "Success !",
        text: "Clinic added successfully",
        icon: "success",
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
  const [isLoaded, setisLoaded] = useState(false);

  const autoCompleteRef = useRef();
  const inputRef = useRef();
  const options = {
    componentRestrictions: { country: "lk" },
    fields: ["address_components", "geometry", "icon", "name"],
    types: ["establishment"],
  };
  useEffect(() => {
    appendScript(
      "https://maps.googleapis.com/maps/api/js?key=AIzaSyCsjXDyjZfdOrwQeg8OuYqOecH7pMLflto&libraries=places&callback=initMap"
    );
  }, []);

  const DEFAULT_ZOOM = 5;
  const [map, setMap] = React.useState(null);
  const [markerPosition, setMarkerPosition] = useState({
    lat: 7.8731,
    lng: 80.7718,
  });

  const [defaultLocation, setDefaultLocation] = useState({
    lat: 7.8731,
    lng: 80.7718,
  });

  const onLoad = useCallback((map) => {
    const bounds = new window.google.maps.LatLngBounds({
      lat: 7.8731,
      lng: 80.7718,
    });
    map.fitBounds(bounds);
    setMap(map);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  const appendScript = (scriptToAppend) => {
    const script = document.createElement("script");
    script.src = scriptToAppend;
    script.async = true;
    document.body.appendChild(script);
  };
  const loadmap = () => {
    try {
      autoCompleteRef.current = new window.google.maps.places.Autocomplete(
        inputRef.current,
        options
      );
      setisLoaded(true);
      autoCompleteRef.current.addListener('place_changed', () => {
        let location = ""
        const place = autoCompleteRef.current.getPlace()
        if (place.geometry && place.geometry.location) {
          location = place.geometry.location;
          const latitude = location.lat();
          const longitude = location.lng();
          console.log('Latitude:', latitude);
          console.log('Longitude:', longitude);
        }
        if (place.geometry.viewport || place.geometry.location) {
          // do something
          console.log(place)
        }

        setMarkerPosition({ lat: location.lat(), lng: location.lng() });
        setDefaultLocation({ lat: location.lat(), lng: location.lng() });

      })
    } catch (e) {
      console.log(e);
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files).slice(0, 4);
    console.log(files);
    setFormData((prevData) => ({
      ...prevData,
      images: files,
    }));
  };

  const handelClickOnMap = () => {

  }

  const navtoComplains = async () => {
    navigate('/Complainstable');
  }

  const handleKeyPress = (e) => {
    // Prevent the default behavior if a number key is pressed
    if (/\d/.test(e.key)) {
      e.preventDefault();
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.key)) {
      e.preventDefault();
    }
  }

  const handleKeyPress1 = (e) => {
    // Allow Backspace key
    if (e.key === "Backspace") {
      return;
    }
    // Prevent the default behavior if a letter is pressed
    if (/[a-zA-Z]/.test(e.key)) {
      e.preventDefault();
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.value.length >= 10 && e.key !== "Backspace") {
      e.preventDefault();
    }
  }

  const handleKeyPress2 = (e) => {
    if (e.key === "Backspace") {
      return;
    }
    if (/[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]/.test(e.key)) {
      e.preventDefault();
    }
    if (!/[Vv0-9]/.test(e.key)) {
      e.preventDefault();
    }
    if (e.target.value.length >= 12 && e.key !== "Backspace") {
      e.preventDefault();
    }
  }

  const handleKeyPress3 = (e) => {
    if (e.key === "Backspace") {
      return;
    }
    if (/[!@#$%^&*()_+\=\[\]{};':"\\|<>\/?]/.test(e.key)) {
      e.preventDefault();
    }
  }

  useEffect(() => {
    Aos.init({ duration: 1000 }); // Initialize AOS with your desired options //anim
  }, []);

  return (
    <Layout>


<div data-aos="zoom-in" //anim
        data-aos-anchor-placement="center-bottom">

        <Container>
          <h1>Public Health Complaint Form</h1>

          <Form className="comform">
            <Row>
              <Col>
                <Form.Group controlId="firstName">
                  <Form.Label>First Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="firstName"
                    onKeyDown={handleKeyPress}
                    value={formData.fname}
                    onChange={(e) =>
                      setFormData({ ...formData, fname: e.target.value })
                    }


                  />
                </Form.Group>
                {errorMessage.fname && <div className="text-danger">{errorMessage.fname}</div>}
              </Col>
              <Col>
                <Form.Group controlId="lastName">
                  <Form.Label>Last Name:</Form.Label>
                  <Form.Control
                    type="text"
                    name="lastName"
                    onKeyDown={handleKeyPress}
                    value={formData.lname}
                    onChange={(e) =>
                      setFormData({ ...formData, lname: e.target.value })
                    }

                  />
                </Form.Group>
                {errorMessage.lname && <div className="text-danger">{errorMessage.lname}</div>}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group controlId="mobile">
                  <Form.Label>Mobile:</Form.Label>
                  <Form.Control
                    type="number"
                    name="mobile"
                    onKeyDown={handleKeyPress1}
                    maxLength={10}
                    value={formData.mobile}
                    onChange={(e) =>
                      setFormData({ ...formData, mobile: e.target.value })
                    }

                  />
                </Form.Group>
                {errorMessage.mobile && <div className="text-danger">{errorMessage.mobile}</div>}
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Email:</Form.Label>
                  <Form.Control
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }

                  />
                </Form.Group>
                {errorMessage.email && <div className="text-danger">{errorMessage.email}</div>}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>NIC:</Form.Label>
                  <Form.Control
                    type="text"
                    name="nic"
                    onKeyDown={handleKeyPress2}
                    maxLength={12}
                    value={formData.NIC}
                    onChange={(e) =>
                      setFormData({ ...formData, NIC: e.target.value })
                    }

                  />
                </Form.Group>
                {errorMessage.NIC && <div className="text-danger">{errorMessage.NIC}</div>}
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Address:</Form.Label>
                  <Form.Control
                    type="text"
                    name="address"
                    value={formData.yaddress}
                    onKeyDown={handleKeyPress3}
                    onChange={(e) =>
                      setFormData({ ...formData, yaddress: e.target.value })
                    }

                  />
                </Form.Group>
                {errorMessage.yaddress && <div className="text-danger">{errorMessage.yaddress}</div>}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Date:</Form.Label>
                  <Form.Control
                    type="date"
                    name="date"
                    value={formData.date}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        date: e.target.value.toString(),
                      })
                    }

                  />
                </Form.Group>
                {errorMessage.date && <div className="text-danger">{errorMessage.date}</div>}
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Photo:</Form.Label>
                  <Form.Control
                    type="file"
                    name="photo"
                    onChange={handleImageChange}
                    multiple
                  />
                </Form.Group>
                {errorMessage.images && <div className="text-danger">{errorMessage.images}</div>}
              </Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Complain Type:</Form.Label>
                  <Form.Control
                    as="select"
                    name="complainType"
                    value={formData.ctype}
                    onChange={(e) =>
                      setFormData({ ...formData, ctype: e.target.value })
                    }

                  >
                    <option value="" selected disabled>
                      Select type
                    </option>
                    <option value="Food">Food</option>
                    <option value="Dengue">Dengue</option>
                  </Form.Control>
                </Form.Group>
                {errorMessage.ctype && <div className="text-danger">{errorMessage.ctype}</div>}
              </Col>
              <Col></Col>
            </Row>
            <Row>
              <Col>
                <Form.Group>
                  <Form.Label>Complain Details:</Form.Label>
                  <Form.Control
                    placeholder="NOTE:Include LOCATION with the DESCRIPTION!"
                    as="textarea"
                    rows={4}
                    name="complainDetails"
                    value={formData.cdesc}
                    onChange={(e) =>
                      setFormData({ ...formData, cdesc: e.target.value })
                    }
                    required
                  />
                </Form.Group>
                {errorMessage.cdesc && <div className="text-danger">{errorMessage.cdesc}</div>}
              </Col>
              <Col>
                <Form.Group>
                  <Form.Label>Select Area:</Form.Label>

                  <Form.Control
                    type="text"
                    name="area"
                    value={formData.area}
                    onChange={(e) =>
                      setFormData({ ...formData, area: e.target.value })
                    }

                    ref={inputRef}
                    onFocus={loadmap}
                  />
                  <div >
                    {isLoaded ? (
                      <GoogleMap
                        onLoad={onLoad}
                        center={defaultLocation}
                        zoom={DEFAULT_ZOOM}
                        mapContainerStyle={mapStyle}
                        onClick={handelClickOnMap}
                        onUnmount={onUnmount}
                        options={{ zoomControl: true }}
                      >
                        <Marker position={markerPosition} />
                      </GoogleMap>
                    ) : (
                      <></>
                    )}
                  </div>
                </Form.Group>
                {errorMessage.area && <div className="text-danger">{errorMessage.area}</div>}
              </Col>
            </Row>
            <div className="buttons">
            <Button variant="primary" type="submit" onClick={addComplain}>
              Submit
            </Button>
            </div>
            
          </Form>
          <div className="bat">
            <Button variant="primary" type="button" onClick={()=>navigate('/Complainstable')}>
            View Complains
            </Button>
            </div>
        </Container>
        </div>
    </Layout>
  );
};

export default ComplaintForm;

