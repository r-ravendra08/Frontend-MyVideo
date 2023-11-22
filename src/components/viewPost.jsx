import React, { useState, useEffect } from "react";
import { BASE_URL } from "../urls/baseUrl";
import { Col, Row, Card, Container, Button } from "react-bootstrap";
import { GetAllVideos, DeletePostService } from "../urls/videoService";
import { useCollapse } from "react-collapsed";
import { Link } from "react-router-dom";
import Navbar from "./Header";
import swal from 'sweetalert';
import Header from "./Header";


const ViewPost = () => {

  const [expandedStates, setExpandedStates] = useState({});

  const [isExpanded] = useState(false);
  useCollapse({ isExpanded });

  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  //Gatting All videos .

  const getAllVideos = async () => {
    try {
      const response = await GetAllVideos();
      setPosts(response.data);
      console.log(response.data);
      console.log(response);
      setLoading(true);
    } catch (error) {
      // alert(error.message);
      swal("Oops!", error.message, "error");

    }
  };
  useEffect(() => {
    getAllVideos();
  }, []);

  const handleDelete = (id) => {
    swal({
      title: "Are you sure?",
      text: "Once deleted, you will not be able to recover this post!",
      icon: "warning",
      buttons: true,
      dangerMode: true,
    })
      .then((willDelete) => {
        if (willDelete) {
          DeletePostService(id);
          swal("Poof! Your post has been deleted!", {
            icon: "success",
          });
          window.location.reload(); // Reload the page after deletion
        } else {
          swal("Your post is safe!");
        }
      });
  }


  const handleExpand = (postId) => {
    setExpandedStates(prevStates => ({
      ...prevStates,
      [postId]: !prevStates[postId]
    }));
  };

  return (

    <div>
      <Container>
        <Row>
          {loading && posts.map((post) => (
            <Col key={post.id} sm={4} className="mb-4"> {/* Specify sm={4} for small screens */}
              <Card className="h-100">
                <Card.Header><Card.Title>{post.title}</Card.Title></Card.Header>
                <Card.Body>
                  <div style={{ maxWidth: "100%" }}>
                    <video controls width="380" height="150">
                      <source
                        src={`${BASE_URL}/play/${post.id}`} // Use template literals for string interpolation
                        type="video/mp4"
                        alt=""
                      />
                    </video>
                  </div>
                  <Card.Subtitle>
                    <Card.Text>
                      <strong style={{ color: "blue" }}>{post.tags}</strong>
                    </Card.Text>
                  </Card.Subtitle>

                  <div style={{ padding: "12px" }}>
                    <p className="text-left">
                      {expandedStates[post.id]
                        ? post.description
                        : `${post.description.slice(0, 30)}...`}
                    </p>
                    <Link
                      size="xs"
                      variant="white"
                      onClick={() => handleExpand(post.id)}
                    >
                      {expandedStates[post.id] ? "Read less" : "Read more"}
                    </Link>
                  </div>
                  <div>
                    <Button
                      className="btn-light"
                      style={{ marginRight: "5px" }}
                      onClick={() => handleDelete(post.id)}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/9790/9790368.png"
                        width="30px"
                        height="30px"
                        alt="Delete"
                      />
                    </Button>
                    <Link
                      className="btn btn-outline-light mx-2"
                      to={`/edit/${post.id}`}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/10336/10336582.png"
                        width="30px"
                        height="30px"
                        alt="Edit"
                      />
                    </Link>

                    <Link
                      className="btn btn-light mx-2"
                      to={`/viewone/${post.id}`}
                    >
                      <img
                        src="https://cdn-icons-png.flaticon.com/512/2901/2901214.png"
                        width="30px"
                        height="30px"
                        alt="View"
                      />
                    </Link>
                  </div>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default ViewPost;