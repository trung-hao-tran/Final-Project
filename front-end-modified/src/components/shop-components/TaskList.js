/* eslint-disable jsx-a11y/anchor-is-valid */
import React, { useState, useEffect } from "react";
import Sidebar from "./TaskSidebar";
import ReactLoading from "react-loading";
import toast from "react-hot-toast";
import TaskListItem from "./TaskListItem";

let rawTasks = [];

const TaskGrid = () => {
  const [loadingTasks, setLoadingTasks] = useState(false);

  useEffect(() => {
    setLoadingTasks(true);
    fetch("http://localhost:4000/api/tasks")
      .then((response) => response.json())
      .then((data) => {
        rawTasks = data;
        setLoadingTasks(false);
      })
      .catch((error) => {
        console.log("error", error);
        toast.error(`Error fetching tasks: ${error}`);
        setLoadingTasks(false);
      });
  }, []);

  const taskItems = rawTasks?.length
    ? rawTasks.map((task) => <TaskListItem key={task} task={task} />)
    : null;

  let publicUrl = process.env.PUBLIC_URL;
  return (
    <>
      {loadingTasks ? (
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
        <div>
          <div className="ltn__product-area ltn__product-gutter">
            <div className="container">
              <div className="row">
                <Sidebar />
                <div className="col-lg-8 order-lg-2 mb-100">
                  <div className="tab-content">
                    <div
                      className="tab-pane fade active show"
                      id="liton_product_list"
                    >
                      <div className="ltn__product-tab-content-inner ltn__product-list-view">
                        <div className="row">
                          <div className="col-lg-12">
                            {/* Search Widget */}
                            <div className="ltn__search-widget mb-30">
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
                            </div>
                          </div>
                          {taskItems}
                        </div>
                      </div>
                    </div>
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
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskGrid;
