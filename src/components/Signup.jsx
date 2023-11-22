import React, { useEffect, useState } from 'react'
import { Container, Card, CardBody, Input, Form, Label, Button, } from 'reactstrap';
import { USER_BASE_URL } from '../urls/baseUrl';
import { Link } from 'react-router-dom';

export default function Signup() {

    const [data, setData] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    })

    const [errors, setErrors] = useState({
        name: '',
        email: '',
        mobile: '',
        password: '',
    })

    useEffect(() => {

    }, [data]);


    const fieldChangeHandle = (event, property) => {
        setData({ ...data, [property]: event.target.value });

        setErrors({ ...errors, [property]: '' });
    }


    const validateForm = () => {
        let valid = true;
        const newErrors = {};

        // Name validation
        if (data.name.trim() === '') {
            newErrors.name = 'Name is required';
            valid = false;
        }

        // Email validation
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
            newErrors.email = 'Invalid email address';
            valid = false;
        }

        // Mobile Number validation
        if (!/^\d{10}$/.test(data.mobile)) {
            newErrors.mobile = 'Invalid mobile number';
            valid = false;
        }

        // Password validation
        if (data.password.length < 6) {
            newErrors.password = 'Password must be at least 6 characters long';
            valid = false;
        }

        setErrors(newErrors);
        return valid;
    }


    const submitForm = (event) => {
        event.preventDefault();

        if (validateForm()) {

            axios.post(`${USER_BASE_URL}/signup`, data).then(
                (response) => {
                    console.log(response);
                    swal("Registered", "Registration success!!", "success");

                }, (error) => {
                    console.log(error);
                    swal("Oops!", "Something went wrong!!", "error");

                }
            );
            // Clear form after submission
            setData({
                name: '',
                email: '',
                mobile: '',
                password: '',
            });
        }
    }
    return (
        <div className='wrapper d-flex align-items-center justify-content-center'>
            <Container className='col-4'>
                <Card className=" shadow-sm border-1  border-radius-2">
                    <CardBody>
                        <h3 className='text-center'><strong >Registration</strong></h3><hr />
                        <Form onSubmit={submitForm}>
                            <div>
                                <Label for="name">Name</Label>
                                <Input type="text" id="name"
                                    placeholder="Name"
                                    className="rounded-2"
                                    name="name"
                                    onChange={(e) => fieldChangeHandle(e, 'name')}
                                    value={data.name}
                                />
                                {errors.name && <small className="text-danger">{errors.name}</small>}

                            </div>
                            <div>
                                <Label for="email">Email</Label>
                                <Input type="text" id="email"
                                    placeholder="Email"
                                    className="rounded-2"
                                    name="email"
                                    onChange={(e) => fieldChangeHandle(e, 'email')}
                                    value={data.email}
                                />
                                {errors.email && <small className="text-danger">{errors.email}</small>}

                            </div>
                            <div>
                                <Label for="mobile">Mobile Number</Label>
                                <Input type="text" id="mobile"
                                    placeholder="Mobile Number"
                                    className="rounded-2"
                                    name="mobile"
                                    onChange={(e) => fieldChangeHandle(e, 'mobile')}
                                    value={data.mobile}
                                />
                                {errors.mobile && <small className="text-danger">{errors.mobile}</small>}

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
                                {errors.password && <small className="text-danger">{errors.password}</small>}

                            </div>

                            <br />


                            <Container className='text-center p-2'>
                                <Button className="rounded-2" color="primary">Register</Button>
                            </Container>
                        </Form>
                        <div className='text-center'>                        
                            Already Account <Link to="/login">Login</Link>
                        </div>
                    </CardBody>
                </Card>
            </Container>
        </div>
    )

}