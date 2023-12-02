import { Container, FormGroup, Card, CardBody, Input, Form, Label, Button, } from 'reactstrap';
import { MAIL_BASE_URL } from '../urls/baseUrl';
import React, { useEffect, useState } from 'react'


const ContactUS = () => {


    const [data, setData] = useState({
        name: '',
        mobile: '',
        recipient: '',
        msgBody: '',
        subject:'',
    })

    const [errors, setErrors] = useState({
        name: '',
        mobile: '',
        recipient: '',
        msgBody: '',
        subject:'',
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
        if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.recipient)) {
            newErrors.recipient = 'Invalid email address';
            valid = false;
        }

        // Mobile Number validation
        if (!/^\d{10}$/.test(data.mobile)) {
            newErrors.mobile = 'Invalid mobile number';
            valid = false;
        }

        if (data.msgBody.trim() === '') {
            newErrors.msgBody = 'Message is required';
            valid = false;
        }
       
       

        setErrors(newErrors);
        return valid;
    }


    const submitForm = (event) => {
        event.preventDefault();

        if (validateForm()) {

            axios.post(`${MAIL_BASE_URL}/sendMail`, data).then(
                (response) => {
                    console.log(response);
                    swal("Sent", "Mail sent successfully!!", "success");

                }, (error) => {
                    console.log(error);
                    swal("Oops!", "Something went wrong!!", "error");

                }
            );
            // Clear form after submission
            setData({
                name: '',
                mobile: '',
                recipient: '',
                msgBody: '',
                subject:'',
            });
        }
    }


    return (
        <>
            <div>
                <Container className='col-4'>
                    <Card className=" shadow-sm border-1  border-radius-2 p-3">
                    <h3 className='text-center'><strong >CONTACT FORM</strong></h3><hr />
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
                                    name="recipient"
                                    onChange={(e) => fieldChangeHandle(e, 'recipient')}
                                    value={data.recipient}
                                />
                                {errors.recipient && <small className="text-danger">{errors.recipient}</small>}

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
                                <Label for="tags">Subject</Label>
                                <Input type="text" id="tags"
                                    placeholder="subject"
                                    className="rounded-2"
                                    name="subject"
                                    onChange={(e) => fieldChangeHandle(e, 'subject')}
                                    value={data.subject}
                                />
                                {errors.subject && <small className="text-danger">{errors.subject}</small>}

                            </div>
                            <div>
                                <Label for="tags">Message</Label>
                                <Input type="text" id="tags"
                                    placeholder="message"
                                    className="rounded-2"
                                    name="msgBody"
                                    onChange={(e) => fieldChangeHandle(e, 'msgBody')}
                                    value={data.msgBody}
                                />
                                {errors.msgBody && <small className="text-danger">{errors.msgBody}</small>}

                            </div>

                            <br />


                            <Container className='text-center p-2'>
                                <Button className="rounded-2" color="primary">Send</Button>
                            </Container>
                        </Form>
                    </Card>
                </Container>
            </div>
        </>
    );

}
export default ContactUS;




