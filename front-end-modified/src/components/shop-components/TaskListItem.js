import React from "react";
import { Link } from "react-router-dom";

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

  const publicUrl = process.env.PUBLIC_URL;

  return (
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
              <ul>{isNew && <li className="sale-badg">NEW</li>}</ul>
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
            {domain_knowledge.map((domain) => (
              <li>
                <span>{domain}</span>
              </li>
            ))}
          </ul>
        </div>
        <div className="product-info-bottom">
          <div className="real-estate-agent">
            <div className="agent-img">
              <Link to={`/user/${user_id}`}>
                <img src={publicUrl + "assets/img/blog/author.jpg"} alt="#" />
              </Link>
            </div>
            <div className="agent-brief">
              <h6>
                <Link to={`/user/${user_id}`}>{user_id}</Link>
              </h6>
              {/* <small>Estate Agents</small> */}
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
  );
};

export default TaskListItem;
