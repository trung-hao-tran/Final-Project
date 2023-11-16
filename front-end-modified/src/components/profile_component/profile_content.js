/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable jsx-a11y/anchor-is-valid */
/* eslint-disable jsx-a11y/iframe-has-title */
/* eslint-disable jsx-a11y/img-redundant-alt */
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import ReactLoading from "react-loading";

import { useGetCurrentUserMutation } from "../../feature/users/usersApiSlice";
import { setCurrentUser } from "../../feature/users/userSlice";
import toast, { Toaster } from "react-hot-toast";
import MyAccountForm from "./profile-form";
import ProfileTaskItem from "./profile_taskItem";
import AdminUserItem from "./adminUserItem";
import AdminTaskItem from "./adminTaskItem";

const MyAccount = () => {
  const dispatch = useDispatch();
  const userId = useSelector((state) => state.auth.userId);

  const [allTaskList, setAllTaskList] = useState([]);
  const [allUserList, setAllUserList] = useState([]);
  const isAdmin = useSelector((state) => state.users.isAdmin);
  console.log(isAdmin);
  const [isDataChanged, setIsDataChange] = useState(false);
  const [getCurrentUser] = useGetCurrentUserMutation();
  useEffect(() => {
    const fetchCurrentUserObject = async () => {
      try {
        const currentUser = await getCurrentUser(userId);

        if (currentUser.data) {
          dispatch(setCurrentUser(currentUser.data));
        }
      } catch (error) {
        console.log(error);
        toast.error(`Error: ${error}`);
        dispatch(setCurrentUser(null));
      }
    };
    fetchCurrentUserObject();
  }, []);

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/tasks/`)
      .then((response) => response.json())
      .then((data) => {
        setAllTaskList(data);
        console.log("taskList", data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(`Error fetching tasks: ${error}`);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    setLoading(true);
    fetch(`http://localhost:4000/api/user`)
      .then((response) => response.json())
      .then((data) => {
        setAllUserList(data);
        console.log("userList", data);
        setLoading(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(`Error fetching tasks: ${error}`);
        setLoading(false);
      });
    setIsDataChange(false);
  }, [isDataChanged]);

  const [ownedTasks, setOwnedTasks] = useState([]);
  const [doingTasks, setDoingTasks] = useState([]);
  const [adminUserItems, setAdminUserItems] = useState([]);
  const [adminTaskItems, setAdminTaskItems] = useState([]);

  useEffect(() => {
    // Update owned tasks
    const updatedOwnedTasks = allTaskList?.filter(
      (task) => task.user_id === userId
    ).length ? (
      allTaskList
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((task) => <ProfileTaskItem key={task._id} task={task} />)
    ) : (
      <tr>
        <td colSpan="10" style={{ border: "none" }}>
          <div className="ltn__myaccount-tab-content-inner ">
            <p>
              You have no tasks.{" "}
              <Link to="/add-task">Start adding one now</Link>
            </p>
          </div>
        </td>
      </tr>
    );
    setOwnedTasks(updatedOwnedTasks);

    // Update doing tasks
    const updatedDoingTasks = allTaskList?.filter(
      (task) => task.tasker_id === userId
    ).length ? (
      allTaskList
        .filter((task) => task.tasker_id === userId)
        .slice()
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((task) => <ProfileTaskItem key={task._id} task={task} />)
    ) : (
      <tr>
        <td colSpan="10" style={{ border: "none" }}>
          <div className="ltn__myaccount-tab-content-inner ">
            <p>
              You have no tasks. <Link to="/tasks">Start getting one now</Link>
            </p>
          </div>
        </td>
      </tr>
    );
    setDoingTasks(updatedDoingTasks);

    // Update admin user items
    const updatedAdminUserItems = allUserList?.filter(
      (user) => user._id !== userId
    ).length ? (
      allUserList
        .filter((user) => user._id !== userId)
        .sort((a, b) => b.report.length - a.report.length)
        .map((userData) => (
          <AdminUserItem
            user={userData}
            key={userData._id}
            setChange={setIsDataChange}
          />
        ))
    ) : (
      <></>
    );
    setAdminUserItems(updatedAdminUserItems);

    const updatedAdminTaskItems = allTaskList?.length ? (
      allTaskList
        // .sort((a, b) => b.report.length - a.report.length)
        .sort((a, b) => new Date(b.updatedAt) - new Date(a.updatedAt))
        .map((taskData) => (
          <AdminTaskItem
            task={taskData}
            key={taskData._id}
            setChange={setIsDataChange}
          />
        ))
    ) : (
      <></>
    );
    setAdminTaskItems(updatedAdminTaskItems);
  }, [allUserList, allTaskList]);
  const userData = useSelector((state) => state.users.user);
  let publicUrl = process.env.PUBLIC_URL + "/";

  return (
    <>
      {loading ? (
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
        <div className="liton__wishlist-area pb-70">
          <div className="container">
            <div className="row">
              <div className="col-lg-12">
                {/* PRODUCT TAB AREA START */}
                <div className="ltn__product-tab-area">
                  <div className="container">
                    <div className="row">
                      <div className="col-lg-4">
                        <div className="ltn__tab-menu-list mb-50">
                          <div className="nav">
                            <a
                              className="active show"
                              data-bs-toggle="tab"
                              href="#ltn_tab_1_1"
                            >
                              Dashboard <i className="fas fa-home" />
                            </a>
                            <a data-bs-toggle="tab" href="#ltn_tab_1_2">
                              Profiles <i className="fas fa-user" />
                            </a>
                            <a data-bs-toggle="tab" href="#ltn_tab_1_3">
                              My Task <i className="fa-solid fa-list" />
                            </a>
                            <a data-bs-toggle="tab" href="#ltn_tab_1_4">
                              Current Task{" "}
                              <i className="fa-solid fa-briefcase" />
                            </a>
                            {isAdmin ? (
                              <>
                                <a data-bs-toggle="tab" href="#ltn_tab_1_5">
                                  All user <i className="fa-solid fa-users" />
                                </a>
                                <a data-bs-toggle="tab" href="#ltn_tab_1_6">
                                  All Tasks{" "}
                                  <i className="fa-solid fa-list-alt" />
                                </a>
                              </>
                            ) : (
                              <></>
                            )}

                            <a href="">
                              Logout <i className="fas fa-sign-out-alt" />
                            </a>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-8">
                        <div className="tab-content">
                          <div
                            className="tab-pane fade active show"
                            id="ltn_tab_1_1"
                          >
                            <div className="ltn__myaccount-tab-content-inner">
                              <p>
                                Hello <strong>{userData?.name}</strong> ( not{" "}
                                <strong>{userData?.name}</strong>?{" "}
                                <small>
                                  <a href="login.html">Log out</a>
                                </small>{" "}
                                )
                              </p>
                              <p>
                                From your account dashboard you can view your{" "}
                                <span>recent tasks</span> and{" "}
                                <span>
                                  edit your password and account details
                                </span>
                                .
                              </p>
                            </div>
                          </div>

                          {/* Profiles tab */}
                          <div className="tab-pane fade" id="ltn_tab_1_2">
                            <div className="ltn__myaccount-tab-content-inner">
                              <div className="ltn__comment-area mb-50">
                                <div className="ltn-author-introducing clearfix">
                                  <div className="author-img">
                                    <img
                                      src={
                                        userData?.image
                                          ? userData.image
                                          : "/assets/img/default/user.png"
                                      }
                                      alt="Author Image"
                                    />
                                  </div>
                                  <div className="author-info">
                                    <h6>{userData?.role}</h6>
                                    <h2>{userData?.name}</h2>
                                    <div className="footer-address">
                                      <ul>
                                        <li>
                                          <div className="footer-address-icon">
                                            <i className="icon-placeholder" />
                                          </div>
                                          <div className="footer-address-info">
                                            <p>{userData?.address}</p>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="footer-address-icon">
                                            <i className="icon-call" />
                                          </div>
                                          <div className="footer-address-info">
                                            <p>
                                              <a href="tel:+0123-456789">
                                                {userData?.phone}
                                              </a>
                                            </p>
                                          </div>
                                        </li>
                                        <li>
                                          <div className="footer-address-icon">
                                            <i className="icon-mail" />
                                          </div>
                                          <div className="footer-address-info">
                                            <p>
                                              <a href="mailto:trunghao2000@gmail.com">
                                                {userData?.email}
                                              </a>
                                            </p>
                                          </div>
                                        </li>
                                      </ul>
                                    </div>
                                  </div>
                                </div>
                              </div>
                              {userData ? (
                                <>
                                  <div className="ltn-author-introducing clearfix">
                                    <h2>Edit your profile here</h2>
                                    <small>
                                      All field are optional. Any change is
                                      allowed. <br />
                                      Click the image below to change the
                                      profile image. <br />
                                    </small>
                                    <MyAccountForm user={userData} />
                                  </div>
                                </>
                              ) : (
                                <></>
                              )}
                            </div>
                          </div>

                          {/* My task tab */}
                          <div className="tab-pane fade" id="ltn_tab_1_3">
                            <div className="ltn__myaccount-tab-content-inner">
                              <div className="ltn__my-properties-table table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">My Task</th>
                                      <th scope="col" />
                                      <th scope="col">Last Updated</th>
                                      <th scope="col">Actions</th>
                                      <th scope="col">Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>{ownedTasks}</tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          {/* Current Task tab */}
                          <div className="tab-pane fade" id="ltn_tab_1_4">
                            <div className="ltn__myaccount-tab-content-inner">
                              <div className="ltn__my-properties-table table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">Current Tasks</th>
                                      <th scope="col" />
                                      <th scope="col">Last Updated</th>
                                      <th scope="col">Actions</th>
                                      <th scope="col">Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>{doingTasks}</tbody>
                                </table>
                              </div>
                              {/* <div className="ltn__pagination-area text-center">
                            <div className="ltn__pagination">
                              <ul>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-left" />
                                  </Link>
                                </li>
                                <li>
                                  <Link to="#">1</Link>
                                </li>
                                <li className="active">
                                  <Link to="#">2</Link>
                                </li>
                                <li>
                                  <Link to="#">3</Link>
                                </li>
                                <li>
                                  <Link to="#">...</Link>
                                </li>
                                <li>
                                  <Link to="#">10</Link>
                                </li>
                                <li>
                                  <Link to="#">
                                    <i className="fas fa-angle-double-right" />
                                  </Link>
                                </li>
                              </ul>
                            </div>
                          </div> */}
                            </div>
                          </div>

                          {/* All users tab */}
                          <div className="tab-pane fade" id="ltn_tab_1_5">
                            <div className="ltn__myaccount-tab-content-inner">
                              <div className="ltn__my-properties-table table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">All Users</th>
                                      <th scope="col" />
                                      <th scope="col">Role</th>
                                      <th scope="col">Actions</th>
                                      <th scope="col">Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>{adminUserItems}</tbody>
                                </table>
                              </div>
                            </div>
                          </div>

                          {/* All Tasks tab */}
                          <div className="tab-pane fade" id="ltn_tab_1_6">
                            <div className="ltn__myaccount-tab-content-inner">
                              <div className="ltn__my-properties-table table-responsive">
                                <table className="table">
                                  <thead>
                                    <tr>
                                      <th scope="col">All Tasks</th>
                                      <th scope="col" />
                                      <th scope="col">Date added</th>
                                      <th scope="col">Actions</th>
                                      <th scope="col">Delete</th>
                                    </tr>
                                  </thead>
                                  <tbody>{adminTaskItems}</tbody>
                                </table>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
                {/* PRODUCT TAB AREA END */}
              </div>
            </div>
          </div>
          <Toaster />
        </div>
      )}
    </>
  );
};

export default MyAccount;
