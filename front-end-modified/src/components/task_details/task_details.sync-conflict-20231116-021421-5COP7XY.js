import React, { Component, useState, useEffect } from "react";
import { Link, useNavigate, useParams, useHistory } from "react-router-dom";
import Sidebar from "./sidebar";
import { dispatch, useSelector } from "react-redux";
import ReactLoading from "react-loading";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";
import toast, { Toaster } from "react-hot-toast";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Modal from "react-modal";
import MilestoneForm from "./milestone-form";
import MileStoneEditForm from "./milestone-edit-form";
const customStylesModal = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
    width: "50%",
    height: "75%",
    overflowY: "scroll",
    zIndex: 4,
  },
  overlay: {
    // If you want to style the overlay
    backgroundColor: "rgba(0, 0, 0, 0.5)", // Example for a semi-transparent overlay
    zIndex: 4, // Should be slightly less than the modal content
  },
};

function TaskDetails() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTaskDetails] = useState({});
  const [loadingTask, setLoadingTask] = useState(false);
  const [user, setUser] = useState({}); //store user info

  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);
  const token = useSelector((state) => state.auth.token);
  const userId = useSelector((state) => state.auth.userId);
  console.log("isAuthenticated", isAuthenticated);
  console.log("token", token);
  console.log("userId", userId);
  const begin = { lat: -33.9175, lng: 151.2303 };
  const libraries = ["places"];
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAlmLd3YzM-XIYXoShEWcvTy6OhyJaDzb8",
    libraries: libraries,
  });
  const [bid, setBid] = useState("");
  const [description, setDescription] = useState("");
  const [loadingBid, setLoadingBid] = useState(false);

  const [openModal, setOpenModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);
  const [currentMilestoneIndex, setCurrentMilestoneIndex] = useState(null);

  const [loadingDelete, setLoadingDelete] = useState(false);

  // set flag for re-fetch API
  const [flag, setFlag] = useState(false);

  let subtitle;
  Modal.setAppElement("#quarter");
  function afterOpenModal() {
    // references are now sync'd and can be accessed.
    subtitle.style.color = "#f00";
  }

  const handleOpenEditModal = (milestoneData, index) => {
    document.body.style.overflow = "hidden";
    setOpenEditModal(true);
    setCurrentMilestoneIndex(index);
  };

  const handleCloseEditModal = () => {
    document.body.style.overflow = "unset";
    setOpenEditModal(false);
    setCurrentMilestoneIndex(null);
  };

  const handleOpenModal = () => {
    document.body.style.overflow = "hidden";
    setOpenModal(true);
  };

  const handleCloseModal = () => {
    document.body.style.overflow = "unset";
    setOpenModal(false);
  };

  useEffect(() => {
    // Cleanup function to reset body overflow when the component unmounts
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const handleChangeBid = (e) => {
    const value = e.target.value;
    // Allow only numeric input
    if (/^\d*$/.test(value) && value.length < 10) {
      setBid(value);
    }
  };

  const handleChangeDescription = (e) => {
    const value = e.target.value;
    if (value.length < 250) {
      setDescription(value);
    }
  };

  const handleSubmitBid = async () => {
    const value = {
      bid: bid,
      description: description,
      user_id: userId,
      task_id: id,
    };

    try {
      setLoadingBid(true);
      const response = await fetch("http://localhost:4000/api/bid", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(value),
      });
      console.log("response", response);
      if (response.ok) {
        toast.success(
          "Submitted Bid Successfully! Task Owner will be notified and contact you soon!"
        );
        setLoadingBid(false);
      } else {
        toast.error("Request Error");
        setLoadingBid(false);
      }
    } catch (error) {
      toast.error(`Error: ${error}`);
      setLoadingBid(false);
    }
  };

  const [currentPlace, setCurrentPlace] = useState(begin);

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "#ff5a3c !important" }} // Customize your arrow style here
        onClick={onClick}
      />
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={className}
        style={{ ...style, display: "block", color: "#ff5a3c" }} // Customize your arrow style here
        onClick={onClick}
      />
    );
  }
  const settings = {
    dots: false, // Show dot indicators
    infinite: true, // Infinite looping
    speed: 500, // Transition speed
    slidesToShow: 1, // Number of slides to show at a time
    slidesToScroll: 1, // Number of slides to scroll at a time
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  const handleNavigateLogin = () => {
    console.log("triggered");
    const currentUrl = window.location.pathname;
    localStorage.setItem("tempUrl", currentUrl);

    navigate("/login");
  };

  // setTaskDetails(data);
  useEffect(() => {
    setLoadingTask(true);
    fetch(`http://localhost:4000/api/tasks/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setTaskDetails(data);

        //request user id
        fetch(`http://localhost:4000/api/user/getuser?userId=${data.user_id}`)
          .then((response) => response.json())
          .then((userData) => {
            setUser(userData);
          })
          .catch((error) => {
            console.log("error", error);
            toast.error(`Error fetching user: ${error}`);
          });
        setLoadingTask(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(`Error fetching tasks: ${error}`);
        setLoadingTask(false);
      });
  }, [id, flag]);

  useEffect(() => {
    if (isLoaded && task.address) {
      // Geocode the new address to get its coordinates
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: task?.address }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          setCurrentPlace(results[0].geometry.location);

          // Update the map's center and set the zoom to 15
          if (map) {
            map.panTo(results[0].geometry.location);
            map.setZoom(19);
          }
        }
      });
    }
  }, [task, isLoaded]);

  let publicUrl = process.env.PUBLIC_URL + "/";
  const handleDeleteMilestone = async (mileStoneId) => {
    console.log("mileStone index", mileStoneId);
    console.log("value before delete", task.milestones);
    const value = task.milestones.splice(mileStoneId, 1);

    try {
      setLoadingDelete(true);
      const response = await fetch(
        `http://localhost:4000/api/tasks/${id}/milestones`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(value),
        }
      );

      if (response.ok) {
        setLoadingDelete(false);
        if (flag) {
          setFlag(true);
        } else {
          setFlag(false);
        }
      } else {
        if (flag) {
          setFlag(true);
        } else {
          setFlag(false);
        }
        toast.error("Request Error");
        setLoadingDelete(false);
      }
    } catch (error) {
      if (flag) {
        setFlag(true);
      } else {
        setFlag(false);
      }
      toast.error(`Error: ${error}`);
      setLoadingDelete(false);
    }
  };
  return (
    <>
      {loadingTask ? (
        <>
          <div
            style={{
              display: "flex", // Enables Flexbox
              justifyContent: "center", // Centers items on the main axis (horizontally)
              alignItems: "center", // Centers items on the cross axis (vertically)
              marginBottom: 35,
            }}
          >
            <ReactLoading
              type={"bars"}
              color={"#ff5a3c"}
              height={100}
              width={100}
            />
          </div>
        </>
      ) : (
        <div className="ltn__shop-details-area pb-10">
          <div className="container">
            <div className="row">
              <div className="col-lg-8 col-md-12">
                <div className="ltn__shop-details-inner ltn__page-details-inner mb-60">
                  <div className="ltn__blog-meta">
                    <ul>
                      {new Date() - new Date(task.createdAt) <=
                        7 * 24 * 60 * 60 * 1000 && (
                        <li className="ltn__blog-category">
                          <Link to="#">New</Link>
                        </li>
                      )}
                      {task?.status === "Not Started" ? (
                        <li className="ltn__blog-category">
                          <Link className="bg-orange" to="#">
                            Open
                          </Link>
                        </li>
                      ) : (
                        <li className="ltn__blog-category">
                          <Link className="bg-orange" to="#">
                            In Progress
                          </Link>
                        </li>
                      )}
                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt" />
                        Start Date:{" "}
                        {new Date(task?.time?.start).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                            hour: "2-digit",
                            minute: "2-digit",
                          }
                        )}
                      </li>
                      <li className="ltn__blog-date">
                        <i className="far fa-calendar-alt" />
                        End Date:{" "}
                        {new Date(task?.time?.end).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </li>
                    </ul>
                  </div>
                  <h1>{task?.title}</h1>
                  <label>
                    <span className="ltn__secondary-color">
                      <i className="flaticon-pin" />
                    </span>{" "}
                    {task?.address}
                  </label>
                  <h4 className="title-2">Description</h4>
                  <p>{task?.description}</p>

                  <h4 className="title-2">Domain Knowledge</h4>
                  <div className="property-detail-feature-list clearfix mb-45">
                    <ul>
                      {task?.domain_knowledge?.map((item, index) => (
                        <li key={index}>
                          <div className="property-detail-feature-list-item">
                            <i className="flaticon-book" />
                            <div>
                              <h6>
                                {item === "Computer Science"
                                  ? "Comp Sci"
                                  : item}
                              </h6>
                            </div>
                          </div>
                        </li>
                      ))}
                    </ul>
                  </div>
                  <h4 className="title-2"> Image Description</h4>
                  <div className="ltn__property-details-gallery mb-30">
                    <Slider {...settings}>
                      {task?.images?.map((imageByte, index) => (
                        <div className="col-md-12" key={index}>
                          <img
                            key={index}
                            width={650}
                            height={650}
                            className="mb-30"
                            src={imageByte}
                            alt="Image"
                          />
                        </div>
                      ))}
                      {/* <a
                          href={publicUrl + "assets/img/others/14.jpg"}
                          data-rel="lightcase:myCollection"
                        >
                          <img
                            className="mb-30"
                            src={publicUrl + "assets/img/others/14.jpg"}
                            alt="Image"
                          />
                        </a> */}
                    </Slider>
                  </div>

                  <h4 className="title-2">Location</h4>
                  <div className="property-details-google-map mb-60">
                    {isLoaded ? (
                      <GoogleMap
                        center={currentPlace}
                        zoom={17}
                        mapContainerStyle={{ width: "100%", height: "100%" }}
                        options={{
                          zoomControl: false,
                          streetViewControl: false,
                          mapTypeControl: false,
                          fullscreenControl: false,
                        }}
                        onLoad={(map) => setMap(map)}
                      >
                        <Marker position={currentPlace} />
                      </GoogleMap>
                    ) : (
                      <div>Map is loading</div>
                    )}
                  </div>

                  <h4 className="title-2">Task Detail</h4>
                  <div className="property-detail-info-list section-bg-1 clearfix mb-60">
                    <ul>
                      <li>
                        <label>Price:</label> <span>{task?.price}</span>
                      </li>
                      <li>
                        <label>Priority: </label> <span>{task?.priority}</span>
                      </li>
                      <li>
                        <label>Status:</label> <span>{task?.status}</span>
                      </li>
                      <li>
                        <label>Frequency:</label> <span>{task?.frequency}</span>
                      </li>
                    </ul>
                  </div>
                  <div className="row mb-30">
                    <div className="col-lg-6">
                      <h4 className="title-2">Task Milestone</h4>
                    </div>
                    <div className="col-lg-6">
                      <div style={{ textAlign: "right", marginTop: 30 }}>
                        <button onClick={handleOpenModal}>Add Milestone</button>
                      </div>
                    </div>
                  </div>

                  {/* APARTMENTS PLAN AREA START */}
                  <div className="ltn__apartments-plan-area product-details-apartments-plan mb-60">
                    <div className="ltn__tab-menu ltn__tab-menu-3 ltn__tab-menu-top-right-- text-uppercase--- text-center---">
                      <div className="nav">
                        {task?.milestones?.map((v, index) => (
                          <a
                            key={index}
                            data-bs-toggle="tab"
                            className={index + 1 === 1 ? "active show" : null}
                            href={`#liton_tab_3_${index + 1}`}
                          >
                            {`Milestone ${index + 1}`}
                          </a>
                        ))}
                      </div>
                    </div>
                    <div className="tab-content">
                      {task?.milestones?.map((v, index) => (
                        <div
                          className={
                            index + 1 === 1
                              ? `tab-pane fade active show `
                              : `tab-pane fade`
                          }
                          id={`liton_tab_3_${index + 1}`}
                          key={index}
                        >
                          <div className="ltn__apartments-tab-content-inner">
                            <div className="row">
                              <div className="row">
                                <div className="col-lg-6">
                                  <div className="apartments-plan-info ltn__secondary-bg--- text-color-white---">
                                    <h2>{v?.title}</h2>
                                    <p>{v?.description}</p>
                                  </div>
                                </div>
                                <div className="col-lg-6">
                                  <div
                                    style={{
                                      marginTop: 35,
                                      textAlign: "right",
                                    }}
                                  >
                                    <button
                                      onClick={() =>
                                        handleOpenEditModal(v, index)
                                      }
                                      style={{ marginRight: 10 }}
                                    >
                                      Edit this milestone
                                    </button>

                                    {task.milestones.length < 2 ? (
                                      <></>
                                    ) : (
                                      <button
                                        disabled={loadingDelete}
                                        onClick={() =>
                                          handleDeleteMilestone(index)
                                        }
                                      >
                                        {" "}
                                        Delete this milestone
                                      </button>
                                    )}
                                  </div>
                                </div>
                              </div>
                              <div className="col-lg-12">
                                <div className="product-details-apartments-info-list  section-bg-1">
                                  <div className="row">
                                    <div className="col-lg-12">
                                      <div className="apartments-info-list apartments-info-list-color mt-40---">
                                        <ul>
                                          <li>
                                            <label>Priority</label>{" "}
                                            <span>{v?.priority}</span>
                                          </li>
                                          <li>
                                            <label>Status</label>{" "}
                                            <span>{v?.status}</span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                    <div className="col-lg-12">
                                      <div className="apartments-info-list apartments-info-list-color mt-40---">
                                        <ul>
                                          <li>
                                            <label>Due Date and time</label>{" "}
                                            <span>
                                              {new Date(
                                                v?.date
                                              ).toLocaleDateString("en-US", {
                                                year: "numeric",
                                                month: "long",
                                                day: "numeric",
                                                hour: "2-digit",
                                                minute: "2-digit",
                                              })}
                                            </span>
                                          </li>
                                        </ul>
                                      </div>
                                    </div>
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* APARTMENTS PLAN AREA END */}
                  <div className="ltn__shop-details-tab-content-inner--- ltn__shop-details-tab-inner-2 ltn__product-details-review-inner mb-60">
                    <h4 className="title-2">Comments</h4>
                    <div className="product-ratting">
                      <ul>
                        <li>
                          <a href="#">
                            <i className="fas fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-star" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="fas fa-star-half-alt" />
                          </a>
                        </li>
                        <li>
                          <a href="#">
                            <i className="far fa-star" />
                          </a>
                        </li>
                        <li className="review-total">
                          {" "}
                          <a href="#"> ( 95 Reviews )</a>
                        </li>
                      </ul>
                    </div>
                    <hr />
                    {/* comment-area */}
                    <div className="ltn__comment-area mb-30">
                      <div className="ltn__comment-inner">
                        <ul>
                          <li>
                            <div className="ltn__comment-item clearfix">
                              <div className="ltn__commenter-img">
                                <img
                                  src={
                                    publicUrl + "assets/img/testimonial/1.jpg"
                                  }
                                  alt="Image"
                                />
                              </div>
                              <div className="ltn__commenter-comment">
                                <h6>
                                  <a href="#">Adam Smit</a>
                                </h6>
                                <div className="product-ratting">
                                  <ul>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star-half-alt" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="far fa-star" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit. Doloribus, omnis fugit
                                  corporis iste magnam ratione.
                                </p>
                                <span className="ltn__comment-reply-btn">
                                  September 3, 2020
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="ltn__comment-item clearfix">
                              <div className="ltn__commenter-img">
                                <img
                                  src={
                                    publicUrl + "assets/img/testimonial/3.jpg"
                                  }
                                  alt="Image"
                                />
                              </div>
                              <div className="ltn__commenter-comment">
                                <h6>
                                  <a href="#">Adam Smit</a>
                                </h6>
                                <div className="product-ratting">
                                  <ul>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star-half-alt" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="far fa-star" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit. Doloribus, omnis fugit
                                  corporis iste magnam ratione.
                                </p>
                                <span className="ltn__comment-reply-btn">
                                  September 2, 2020
                                </span>
                              </div>
                            </div>
                          </li>
                          <li>
                            <div className="ltn__comment-item clearfix">
                              <div className="ltn__commenter-img">
                                <img
                                  src={
                                    publicUrl + "assets/img/testimonial/2.jpg"
                                  }
                                  alt="Image"
                                />
                              </div>
                              <div className="ltn__commenter-comment">
                                <h6>
                                  <a href="#">Adam Smit</a>
                                </h6>
                                <div className="product-ratting">
                                  <ul>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="fas fa-star-half-alt" />
                                      </a>
                                    </li>
                                    <li>
                                      <a href="#">
                                        <i className="far fa-star" />
                                      </a>
                                    </li>
                                  </ul>
                                </div>
                                <p>
                                  Lorem ipsum dolor sit amet, consectetur
                                  adipisicing elit. Doloribus, omnis fugit
                                  corporis iste magnam ratione.
                                </p>
                                <span className="ltn__comment-reply-btn">
                                  September 2, 2020
                                </span>
                              </div>
                            </div>
                          </li>
                        </ul>
                      </div>
                    </div>
                    {/* comment-reply */}
                    <div className="ltn__comment-reply-area ltn__form-box mb-30">
                      <form action="#">
                        <h4>Add a Review</h4>
                        <div className="mb-30">
                          <div className="add-a-review">
                            <h6>Your Ratings:</h6>
                            <div className="product-ratting">
                              <ul>
                                <li>
                                  <a href="#">
                                    <i className="fas fa-star" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fas fa-star" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fas fa-star" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fas fa-star" />
                                  </a>
                                </li>
                                <li>
                                  <a href="#">
                                    <i className="fas fa-star" />
                                  </a>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        <div className="input-item input-item-textarea ltn__custom-icon">
                          <textarea
                            placeholder="Type your comments...."
                            defaultValue={""}
                          />
                        </div>

                        <label className="mb-0">
                          <input type="checkbox" name="agree" /> Save my name,
                          email, and website in this browser for the next time I
                          comment.
                        </label>
                        <div className="btn-wrapper">
                          <button
                            className="btn theme-btn-1 btn-effect-1 text-uppercase"
                            type="submit"
                          >
                            Submit
                          </button>
                        </div>
                      </form>
                    </div>
                  </div>
                </div>
              </div>
              <div className="col-lg-4">
                <aside className="sidebar ltn__shop-sidebar ltn__right-sidebar---">
                  {/* Author Widget */}
                  <div className="widget ltn__author-widget">
                    <div className="ltn__author-widget-inner text-center">
                      {/* <img
                        src={publicUrl + "assets/img/team/4.jpg"}
                        alt="Image"
                      /> */}
                      <h5>{user?.name}</h5>
                      <small>{user?.email}</small>

                      <br />

                      <p>Telephone Number: {user?.phone}</p>
                      <p>Address: {user?.address}</p>

                      <div className="ltn__social-media">
                        <ul>
                          <li>
                            <a href="#" title="Facebook">
                              <i className="fab fa-facebook-f" />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Twitter">
                              <i className="fab fa-twitter" />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Linkedin">
                              <i className="fab fa-linkedin" />
                            </a>
                          </li>
                          <li>
                            <a href="#" title="Youtube">
                              <i className="fab fa-youtube" />
                            </a>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </div>
                  {/* Search Widget
                  <div className="widget ltn__search-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Search Objects
                    </h4>
                    <form action="#">
                      <input
                        type="text"
                        name="search"
                        placeholder="Search your keyword..."
                      />
                      <button type="submit">
                        <i className="fas fa-search" />
                      </button>
                    </form>
                  </div> */}
                  {/* Form Widget */}
                  <div className="widget ltn__form-widget">
                    <h4 className="ltn__widget-title ltn__widget-title-border-2">
                      Bid your task
                    </h4>

                    {isAuthenticated ? (
                      <>
                        <input
                          type="text"
                          name="bid"
                          inputMode="numeric"
                          placeholder="Bid your price (in AUD)*"
                          value={bid}
                          onChange={handleChangeBid}
                        />

                        <textarea
                          name="yourmessage"
                          placeholder="Write description..."
                          value={description}
                          onChange={handleChangeDescription}
                        />

                        <button
                          onClick={handleSubmitBid}
                          className="btn theme-btn-1"
                          disabled={
                            loadingBid ||
                            bid.length < 1 ||
                            description.length < 1
                          }
                        >
                          Send Bid
                        </button>
                      </>
                    ) : (
                      <>
                        <p>You are not currently logged in</p>
                        <p>
                          Please
                          <button
                            style={{
                              background: "transparent",
                            }}
                            onClick={handleNavigateLogin}
                          >
                            <Link>
                              <strong> log in</strong>
                            </Link>{" "}
                          </button>
                          to bid for task!
                        </p>
                      </>
                    )}
                  </div>
                </aside>
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      )}
      <Modal
        isOpen={openModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseModal}
        style={customStylesModal}
        ariaHideApp={false}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Milestone</h2>
        <MilestoneForm
          flag={flag}
          onClose={handleCloseModal}
          setFlag={setFlag}
          endTime={task?.time?.end}
          taskId={id}
          toast={toast}
          mileStoneArray={task.milestones}
        />
      </Modal>

      <Modal
        isOpen={openEditModal}
        onAfterOpen={afterOpenModal}
        onRequestClose={handleCloseEditModal}
        style={customStylesModal}
        ariaHideApp={false}
      >
        <h2 ref={(_subtitle) => (subtitle = _subtitle)}>Milestone</h2>
        <MileStoneEditForm
          flag={flag}
          onClose={handleCloseEditModal}
          setFlag={setFlag}
          endTime={task?.time?.end}
          taskId={id}
          toast={toast}
          mileStoneArray={task.milestones}
          index={currentMilestoneIndex}
        />
      </Modal>
    </>
  );
}

export default TaskDetails;
