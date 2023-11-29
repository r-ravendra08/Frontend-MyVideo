import { Outlet, Navigate } from 'react-router-dom';
import { isLoggedIn } from './auth';
import { useLocation } from 'react-router-dom';
import { Container, FormGroup, Card, CardBody, Input, Form, Label, Button, } from 'reactstrap';
import { SaveVideoInfo, UplaodVideo } from '../urls/videoService';
import swal from 'sweetalert';
import { useNavigate, useParams } from "react-router-dom";

import 'react-circular-progressbar/dist/styles.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import { Row } from 'react-bootstrap';


import React, { useEffect, useState } from 'react';
import { PROFILE_BASE_URL } from '../urls/baseUrl';






// // let navigate = useNavigate();
// // const [video, setVideo] = useState({

// //     title: "",
// //     tags: "",
// //     description: "",
// //     userId,
// // });
// // const [progress, setProgress] = useState(0)
// // const [videos, setVideos] = useState(null);
// // const [loading, setLoading] = useState(true);
// // const [singleProgress, setSingleProgress] = useState(0);
// // const singleFileOptions = {
// //     onUploadProgress: (progressEvent) => {
// //         const { loaded, total } = progressEvent;
// //         const percentage = Math.floor(((loaded / 1000) * 100) / (total / 1000));
// //         setSingleProgress(percentage);
// //     }
// // }



// // //fields change handle function .
// // const fieldChangeHandle = (event) => {
// //     setVideo({ ...video, [event.target.name]: event.target.value });
// // };
// // //handling file change event  .
// // const handleFileChange = (event) => {
// //     console.log(event.target.files[0]);
// //     setVideos(event.target.files[0]);
// // }

// // //Upload videos function with title,description,tags .
// // const createVideo = (event) => {
// //     event.preventDefault();
// //     console.log(video);
// //     if (video.title.trim() === "") {
// //         // toast.error("please enter title"); 
// //         swal("Oops!", "please enter title!!", "error"); return;

// //     }

// //     if (video.description.trim() === "") {
// //         // toast.error("Enter some description below 500 character");
// //         swal("Oops!", "Enter some description below 500 character!!", "error");

// //         return;
// //     }

// //     if (!videos) {
// //         swal("Oops!", "Please select a video to upload!", "error");
// //         return;
// //     }
// //     //submit call starts here .
// //     SaveVideoInfo(video).then((data) => {
// //         console.log(data);

// //         UplaodVideo(videos, data.id, singleFileOptions).then((data) => {
// //             setLoading(true)
// //             swal("Uploaded!", "Video upload success!!", "success");
// //             console.log(data);
// //             // setVideos(event.target.files[0])
// //             navigate('/'); // Redirect to view page after successful upload

// //         }).catch((error) => {
// //             console.log(error);
// //         });
// //         swal("Uploding!", "Video Uploading...!!", "success");
// //         console.log(video);
// //         setVideo({
// //             userId: "", title: "", description: "", tags: "",
// //         });

// //     }).catch((error) => {
// //         // alert("upload failed")
// //         console.log(error);
// //         swal("Oops!", "upload failed!", "error");

// //     });
// // }






const Privateroute = () => {

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


  const navigate = useNavigate();
  const [userData, setUserData] = useState(null);


  useEffect(() => {
    const fetchData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          // Token is not present, redirect to login page
          navigate('/login');
          return;
        }

        const response = await fetch(`${PROFILE_BASE_URL}/me`, {
          method: 'GET',
          headers: {
            'Authorization': `Bearer ${token}`,
            'Content-Type': 'application/json',
          },
        });

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        setUserData(data); // Set the user data in the state

        console.log(data);
      } catch (error) {
        console.error('Error:', error.message);
      }
    };

    fetchData();
  }, []); 



  return (
    <div>
      {userData ? (
        <div className='row'>
          <Container className='col-4'>
            <Card className=" shadow-sm border-1  border-radius-2 p-3">
              <h2>Welcome, {userData.name}!</h2>
              <p>Email: {userData.email}</p>
              <p>Mobile: {userData.mobile}</p>
            </Card>
          </Container>
          <Container className='col-6'>
            <Card className=" shadow-sm border-1  border-radius-2">
              <CardBody>
                <h3 className='text-center'><strong>UPLOAD VIDEO</strong></h3>
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
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default Privateroute;












