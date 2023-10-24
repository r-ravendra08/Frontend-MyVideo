import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button } from "react-bootstrap";
import { loadUser } from "../urls/videoService";
import { useNavigate, useParams } from "react-router-dom";
import { BASE_URL } from "../urls/baseUrl";
import { toast } from "react-toastify";
import swal from 'sweetalert';
const Edit = () => {
    let { id } = useParams();
    let navigate = useNavigate();
    // we want to access the parameters of the current route
    const [user, setUser] = useState({
        id: "",
        title: "",
        tags: "",
        description: ""
    });
    const { title, tags, description } = user;

    const onInputChange = (e) => {
        //spread operator (since we are giving only name field)
        //new update will keep on adding
        setUser({ ...user, [e.target.name]: e.target.value });
        //check in components
    };

    const onSubmit = async (e) => {
        e.preventDefault();
        //backtick character (template character)
        await axios.put(BASE_URL + `/update/${id}`, user).then((res) => {
            // toast.success("user updated successfully!!!")
            // console.log(res.data);
            // toast.success("Video Uploaded with Information!!")
            swal("Updated!", "Video Information Updated!!", "success");
            navigate("/");
        }).catch((error) => {
            // toast.error("cant update user")
            swal("Oops!", "Something went wrong!", "error");
        });



    };
    useEffect(() => {
        loadUser(id).then((resp) => {
            setUser({
                id: resp.data.id,
                title: resp.data.title,
                tags: resp.data.tags,
                description: resp.data.description
            });
        })
    }, [id]);
    





    return (
        <div className="container">
            <div className="row">
                {/*col-md-6 : colums of medium size with 6 span */}
                <div
                    className={"col-md-12 rounded p-3 mt-2 shadow"}>
                    <h2 className={"text-center mt-2"}>Edit User</h2>
                    <form onSubmit={onSubmit}>
                        <div className={"mb-3"}>
                            <label htmlFor={"Names"} className={"form-label"}>
                                Title
                            </label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                placeholder={"Enter your title"}
                                name={"title"}
                                value={title}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <div className={"mb-3"}>
                            <label htmlFor={"Names"} className={"form-label"}>
                                Tags
                            </label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                placeholder={"Enter Tags"}
                                name={"tags"}
                                value={tags}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>

                        <div className={"mb-3"}>
                            <label htmlFor={"desc"} className={"form-label"}>
                                Description
                            </label>
                            <input
                                type={"text"}
                                className={"form-control"}
                                placeholder={"Enter post Description"}
                                name={"description"}
                                value={description}
                                onChange={(e) => onInputChange(e)}
                            />
                        </div>
                        <br />
                        <button type={"submit"} className={"btn btn-success"}>
                            Submit
                        </button>
                    </form>
                </div>
            </div>
            <br/>
            <Button className="p-2" variant="primary"  href="/">
                Back to view
            </Button>
        </div>
    );
}; export default Edit;