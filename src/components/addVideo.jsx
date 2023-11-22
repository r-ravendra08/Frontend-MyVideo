import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { Container, Card, CardBody, Input, Form, Label, Button, } from 'reactstrap';
import { SaveVideoInfo, UplaodVideo } from '../urls/videoService';
import { ProgressBar } from 'react-bootstrap';
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";



import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';


const AddVideo = () => {
    let navigate = useNavigate();
    const [video, setVideo] = useState({
        title: "",
        tags: "",
        description: "",
    });
    const [progress, setProgress] = useState(0)
    const [videos, setVideos] = useState(null);
    const [loading, setLoading] = useState(true);
    const [singleProgress, setSingleProgress] = useState(0);
    const singleFileOptions = {
        onUploadProgress: (progressEvent) => {
            const { loaded, total } = progressEvent;
            const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
            setSingleProgress(percentage);
        }
    }



    //fields change handle function .
    const fieldChangeHandle = (event) => {
        setVideo({ ...video, [event.target.name]: event.target.value });
    };
    //handling file change event  .
    const handleFileChange = (event) => {
        console.log(event.target.files[0]);
        setVideos(event.target.files[0]);
    }

    //Upload videos function with title,description,tags .
    const createVideo = (event) => {
        event.preventDefault();
        console.log(video);
        if (video.title.trim() === "") {
            // toast.error("please enter title"); 
            swal("Oops!", "please enter title!!", "error"); return;

        }

        if (video.description.trim() === "") {
            // toast.error("Enter some description below 500 character");
            swal("Oops!", "Enter some description below 500 character!!", "error");

            return;
        }

        if (!videos) {
            swal("Oops!", "Please select a video to upload!", "error");
            return;
        }
        //submit call starts here .
        SaveVideoInfo(video).then((data) => {
            console.log(data);

            UplaodVideo(videos, data.id, singleFileOptions).then((data) => {
                setLoading(true)
                swal("Uploaded!", "Video upload success!!", "success");
                console.log(data);
                // setVideos(event.target.files[0])
                navigate('/'); // Redirect to view page after successful upload

            }).catch((error) => {
                console.log(error);
            });
            swal("Uploding!", "Video Uploading...!!", "success");
            console.log(video);
            setVideo({
                title: "", description: "", tags: "",
            });

        }).catch((error) => {
            // alert("upload failed")
            console.log(error);
            swal("Oops!", "upload failed!", "error");

        });
    }
    return (
        <div className='wrapper d-flex align-items-center justify-content-center'>
            <Container className='col-4'>
                <Card className=" shadow-sm border-1  border-radius-2">
                    <CardBody>
                        <h3><strong>Form for Uploading Video</strong></h3>
                        <Form onSubmit={createVideo}>
                            <div>
                                <Label for="title">Video Title</Label>
                                <Input type="text" id="title"
                                    placeholder="Enter title here"
                                    className="rounded-2"
                                    name="title"
                                    onChange={fieldChangeHandle}
                                />
                            </div>
                            <div>
                                <Label for="tags">Video Tags</Label>
                                <Input type="text" id="tags"
                                    placeholder="Mention tags here..."
                                    className="rounded-2"
                                    name="tags"
                                    onChange={fieldChangeHandle}
                                />
                            </div>
                            <div>
                                <Label for="description">Video Description</Label>
                                <Input type="text" id="description"
                                    placeholder="Write video descreption..."
                                    className="rounded-2"
                                    name="description"
                                    onChange={fieldChangeHandle}
                                />
                            </div>
                            <div>
                                <Label for="video">Select video to post</Label>
                                <Input id="videoName" type="file" accept="video/mp4,video/x-m4v,video/*"

                                    onChange={handleFileChange} />
                            </div><br />
                            <div style={{ width: 70, height: 70 }}>
                                <CircularProgressbar

                                    strokeWidth={10}
                                    value={singleProgress}
                                    text={`${singleProgress}%`}
                                    styles={buildStyles({
                                        rotation: 0.25,
                                        strokeLinecap: 'butt',
                                        textSize: '15px',
                                        size: "40px",
                                        pathTransitionDuration: 0.5,
                                        pathColor: `rgba(255, 136, 136, ${singleProgress / 100})`,
                                        textColor: '#f88',
                                        trailColor: '#d6d6d6',
                                        backgroundColor: '#3e98c7',
                                        height: "10px"
                                    })}
                                />
                            </div>

                            <Container className='text-center p-2'>
                                <Button className="rounded-2 mb-2 " color="primary">Upload Video</Button>
                            </Container>
                        </Form>
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default AddVideo