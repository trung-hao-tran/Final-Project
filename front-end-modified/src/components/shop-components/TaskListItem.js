import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ReactLoading from "react-loading";

const MAX_DISPLAY_DOMAIN_TAG = 3;
let user = null;
const TaskListItem = ({ task }) => {
  const {
    _id,
    title,
    images,
    address,
    price,
    status,
    user_id,
    frequency,
    domain_knowledge,
  } = task;

  console.log(task);
  console.log(title);

  const createdDate = new Date(task.createdAt);
  const currentDate = new Date();
  const timeDifference = currentDate - createdDate;
  const daysDifference = timeDifference / (1000 * 3600 * 24);
  const isNew = daysDifference <= 7;

  const domainTags = domain_knowledge
    .slice(0, MAX_DISPLAY_DOMAIN_TAG)
    .map((domain, index) => (
      <li key={index}>
        <span>{domain}</span>
      </li>
    ));

  if (domain_knowledge.length > MAX_DISPLAY_DOMAIN_TAG) {
    domainTags.push(
      <li key="ellipsis">
        <span> . . . </span>
      </li>
    );
  }

  const [loadingUser, setLoadingUser] = useState(false);
  useEffect(() => {
    setLoadingUser(true);
    fetch(`http://localhost:4000/api/user/getuser?userId=${user_id}`)
      .then((response) => response.json())
      .then((data) => {
        user = data;
        console.log(user);
        setLoadingUser(false);
      })
      .catch((error) => {
        console.log("error", error);
        setLoadingUser(false);
      });
  }, []);

  const publicUrl = process.env.PUBLIC_URL;

  return (
    <>
      {loadingUser ? (
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
        <div className="col-lg-12">
          <div className="ltn__product-item ltn__product-item-4 ltn__product-item-5">
            <div className="product-img go-top">
              <Link to={`/tasks/${_id}`}>
                <img
                  src={
                    images && images.length > 0
                      ? images[0]
                      : publicUrl + "assets/img/product-3/1.jpg"
                  }
                  alt="#"
                />
              </Link>
            </div>
            <div className="product-info">
              <div className="product-badge-price">
                <div className="product-badge">
                  <ul>
                    {isNew && <li className="sale-badg">NEW</li>}

                    <li className="sale-badg">{frequency} task</li>
                  </ul>
                </div>
                <div className="product-price">
                  <span>
                    ${price}
                    <label>/ hour</label>
                  </span>
                </div>
              </div>
              <h2 className="product-title go-top">
                <Link to={`/tasks/${_id}`}>{title}</Link>
              </h2>
              <div className="product-img-location go-top">
                <ul>
                  <li>
                    <Link>
                      <i className="flaticon-pin" /> {address}
                    </Link>
                  </li>
                </ul>
              </div>
              <ul className="ltn__list-item-2--- ltn__list-item-2-before--- ltn__plot-brief">
                {domainTags}
              </ul>
            </div>
            <div className="product-info-bottom">
              <div className="real-estate-agent">
                <div className="agent-img">
                  <Link to={`/user/${user_id}`}>
                    <img
                      src={
                        user?.image
                          ? user.image
                          : publicUrl + "/assets/img/default/user.png"
                      }
                      alt="#"
                    />
                  </Link>
                </div>
                <div className="agent-brief">
                  <h6>
                    <Link to={`/user/${user_id}`}>{user?.name}</Link>
                  </h6>
                  <small>{user?.email}</small>
                </div>
              </div>
              {/* <div className="product-hover-action">
            <ul>
              <li>
                <a href="#" title="Quick View" data-bs-toggle="modal" data-bs-target="#quick_view_modal">
                  <i className="flaticon-expand" />
                </a>
              </li>
              <li>
                <a href="#" title="Wishlist" data-bs-toggle="modal" data-bs-target="#liton_wishlist_modal">
                  <i className="flaticon-heart-1" />
                </a>
              </li>
              <li className="go-top">
                <<Link to={`/tasks/${_id}`} title="Product Details">
                  <i className="flaticon-add" />
                </Link>
              </li>
            </ul>
          </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default TaskListItem;
