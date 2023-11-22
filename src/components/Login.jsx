
import React, { useEffect, useState } from 'react'
import { Container, Card, CardBody, Input, Form, Label, Button, } from 'reactstrap';
import { USER_BASE_URL } from '../urls/baseUrl';
import { Link } from 'react-router-dom';
import { useNavigate, useParams } from "react-router-dom";

export default function Login() {
    let navigate = useNavigate();

    const [data, setData] = useState({

        mobileOrEmail: '',
        password: '',

    })

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (token) {
          // Token is present, redirect to /user
          navigate('/user');
        }
      }, []); // Run the effect only once when the component mounts
    

    useEffect(() => {

    }, [data]);

    const fieldChangeHandle = (event, property) => {
        setData({ ...data, [property]: event.target.value });
    }

    const submitForm = (event) => {
        event.preventDefault();
        
        axios.post(`${USER_BASE_URL}/login`, data).then(
        // axios.post(`https://ats.irix.in:6161/login`, data).then(

            (response) => {
                const token = response.data.token;

                // Store the token in local storage
                localStorage.setItem('token', token);
                console.log("login data saved in local storage::<br/>"+token);
                swal("Logged in", "Login success!!", "success");
                navigate(`/user`);
            }, (error) => {
                console.log(error);
                swal("Oops!", "Something went wrong!!", "error");

            }
        );
        // Clear form after submission
        setData({
            mobileOrEmail: '',
            password: '',
        });

    }

    return (
        <div className='wrapper d-flex align-items-center justify-content-center'>
            <Container className='col-4'>
                <Card className=" shadow-sm border-1  border-radius-2">
                    <CardBody>
                        <h3 className='text-center'><strong >Login</strong></h3><hr />
                        <Form onSubmit={submitForm}>

                            <div>
                                <Label for="mobileOrEmail">Email</Label>
                                <Input type="text" id="mobileOrEmail"
                                    placeholder="Mobile/Email"
                                    className="rounded-2"
                                    name="mobileOrEmail"
                                    onChange={(e) => fieldChangeHandle(e, 'mobileOrEmail')}
                                    value={data.mobileOrEmail}
                                />
                                {/* {errors.email && <small className="text-danger">{errors.email}</small>} */}

                            </div>

                            <div>
                                <Label for="tags">Password</Label>
                                <Input type="text" id="tags"
                                    placeholder="Password"
                                    className="rounded-2"
                                    name="password"
                                    onChange={(e) => fieldChangeHandle(e, 'password')}
                                    value={data.password}
                                />
                                {/* {errors.password && <small className="text-danger">{errors.password}</small>} */}

                            </div>

                            <br />


                            <Container className='text-center p-2'>
                                <Button className="rounded-2" color="primary">Login</Button>
                            </Container>
                        </Form>
                        <div className='text-center'>
                            New User <Link to="/registration">Registration</Link>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </div>


    );
}