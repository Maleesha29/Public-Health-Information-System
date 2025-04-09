import React, { useState } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import Layout from "../components/Layout";
import  Axios  from "axios";
import { Alert, Button, Col, Container, Form, Row } from "react-bootstrap";
import Swal from "sweetalert2";
import "../styles/UpdateComplain.css";

const Upcomp = () => {
  const { _id, fname, lname, mobile, email, NIC, yaddress, ctype, cdesc } = useParams();
  const [id_u, setID] = useState(_id);
  const [fname_u, setfname] = useState(fname);
  const [lname_u, setlname] = useState(lname);
  const [mobile_u, setmobile] = useState(mobile);
  const [email_u, setemail] = useState(email);
  const [NIC_u, setNIC] = useState(NIC);
  const [yaddress_u, setaddress] = useState(yaddress);
  const [ctype_u, setctype] = useState(ctype);
  const [cdesc_u, setdesc] = useState(cdesc);
  const [errorMessage, setErrorMessage] = useState('');
  const navigate = useNavigate();

  const updateComp = async (_id, fname, lname, mobile, email, NIC, yaddress, ctype, cdesc) => {
    try {

            const response = await Axios.post('http://localhost:4000/api/updateComplain',{
            _id : _id,
            fname,
            lname,
            mobile,
            email,
            NIC,
            yaddress,
            ctype,
            cdesc
            });
            navigate('/Complainstable');
            console.log("Complain update is successful" , response.data);
        }catch(error){
            console.error('error' , error);
        }
    }

  const update = async () => {

    try {

      await updateComp(id_u, fname_u, lname_u, mobile_u, email_u, NIC_u, yaddress_u, ctype_u, cdesc_u);

      navigate('/Complainstable');
    } catch (error) {
      console.log("Error", error);
    }

  }

  const confirmUpdate = () => {

    if (!fname_u || !lname_u || !mobile_u || !NIC_u || !yaddress_u || !ctype_u || !cdesc_u) {
        setErrorMessage('Please fill in all required fields');
        return;
    }

    Swal.fire({
        title: "Do you want to save the changes?",
        showDenyButton: true,
        showCancelButton: true,
        confirmButtonText: "Save",
        denyButtonText: `Don't save`
    }).then((result) => {
        /* Read more about isConfirmed, isDenied below */
        if (result.isConfirmed) {
            Swal.fire("Saved!", "Complain updated successfully !! ", "success");
            update();
        } else if (result.isDenied) {
            Swal.fire("Changes are not saved", "", "info");
        }
    });
}

  return (<div >
    <Layout>
      <Container>
        <h1>Public Health Complaint Form</h1>
       
        {errorMessage && <Alert variant='danger'>{errorMessage}</Alert>}

        <Form className="comform">
          <Row>
            <Col>
              <Form.Group controlId="firstName">
                <Form.Label>First Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="firstName"
                  value={fname_u}
                  onChange={(e) =>
                    setfname(e.target.value)
                  }


                />
              </Form.Group>
              {/* {errorMessage.fname && <div className="text-danger">{errorMessage.fname}</div>} */}
            </Col>
            <Col>
              <Form.Group controlId="lastName">
                <Form.Label>Last Name:</Form.Label>
                <Form.Control
                  type="text"
                  name="lastName"
                  value={lname_u}
                  onChange={(e) =>
                    setlname(e.target.value)
                  }

                />
              </Form.Group>
              {/* {errorMessage.lname && <div className="text-danger">{errorMessage.lname}</div>} */}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group controlId="mobile">
                <Form.Label>Mobile:</Form.Label>
                <Form.Control
                  type="number"
                  name="mobile"
                  value={mobile_u}
                  onChange={(e) =>
                    setmobile(e.target.value)
                  }

                />
              </Form.Group>
              {/* {errorMessage.mobile && <div className="text-danger">{errorMessage.mobile}</div>} */}
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Email:</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  value={email_u}
                  onChange={(e) =>
                    setemail(e.target.value)
                  }

                />
              </Form.Group>
              {/* {errorMessage.email && <div className="text-danger">{errorMessage.email}</div>} */}
            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>NIC:</Form.Label>
                <Form.Control
                  type="text"
                  name="nic"
                  value={NIC_u}
                  onChange={(e) =>
                    setNIC(e.target.value)
                  }

                />
              </Form.Group>
              {/* {errorMessage.NIC && <div className="text-danger">{errorMessage.NIC}</div>} */}
            </Col>
            <Col>
              <Form.Group>
                <Form.Label>Address:</Form.Label>
                <Form.Control
                  type="text"
                  name="address"
                  value={yaddress_u}
                  onChange={(e) =>
                    setaddress(e.target.value)
                  }

                />
              </Form.Group>
              {/* {errorMessage.yaddress && <div className="text-danger">{errorMessage.yaddress}</div>} */}
            </Col>
          </Row>
          <Row>
            <Col>

            </Col>
            <Col>

            </Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Complain Type:</Form.Label>
                <Form.Control
                  as="select"
                  name="complainType"
                  value={ctype_u}
                  onChange={(e) =>
                    setctype(e.target.value)
                  }

                >
                  <option value="" selected disabled>
                    Select type
                  </option>
                  <option value="Food">Food</option>
                  <option value="Dengue">Dengue</option>
                </Form.Control>
              </Form.Group>
              {/* {errorMessage.ctype && <div className="text-danger">{errorMessage.ctype}</div>} */}
            </Col>
            <Col></Col>
          </Row>
          <Row>
            <Col>
              <Form.Group>
                <Form.Label>Complain Details:</Form.Label>
                <Form.Control
                  as="textarea"
                  rows={4}
                  name="complainDetails"
                  value={cdesc_u}
                  onChange={(e) =>
                    setdesc(e.target.value)
                  }
                  required
                />
              </Form.Group>
              {/* {errorMessage.cdesc && <div className="text-danger">{errorMessage.cdesc}</div>} */}
            </Col>
            <Col>

            </Col>
          </Row>
          <div className="but-container">
          <Button className="but" variant="primary" type="button" onClick={confirmUpdate}>
          Update
          </Button>
          </div>

        </Form>
      </Container>
    </Layout>
  </div>);

}

export default Upcomp;