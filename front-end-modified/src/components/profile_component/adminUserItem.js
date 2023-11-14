import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditUserModal from "./editUserModal";

const AdminUserItem = ({ user }) => {
  const { _id, name, email, address, image, role } = user;

  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
  };

  let publicUrl = process.env.PUBLIC_URL + "/";
  return (
    <tr>
      <td className="ltn__my-properties-img go-top">
        <Link to={`/user/${_id}`}>
          <img
            src={image ? image : publicUrl + "assets/img/default/user.png"}
            alt="#"
          />
        </Link>
      </td>
      <td>
        <div className="ltn__my-properties-info">
          <h6 className="mb-10 go-top">
            <Link to={`/user/${_id}`}>{name}</Link>
          </h6>
          <small>
            <i className="icon-mail" /> {email}
          </small>
          <br />
          <small>
            <i className="icon-placeholder" />
            {address ? address : "No address found"}
          </small>
        </div>
      </td>
      <td>{role}</td>
      <td>
        <Link onClick={openModal}>Edit</Link>
        <EditUserModal
          isOpen={isModalOpen}
          closeModal={closeModal}
          user={user}
        />
      </td>
      <td>
        <Link to="#">
          <i className="fa-solid fa-trash-can" />
        </Link>
      </td>
    </tr>
  );
};

export default AdminUserItem;
