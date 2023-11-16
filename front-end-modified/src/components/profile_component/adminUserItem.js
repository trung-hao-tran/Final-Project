import React, { useState } from "react";
import { Link } from "react-router-dom";
import EditUserModal from "./editUserModal";
import DeleteUserModal from "./deleteUserModel";

const AdminUserItem = ({ user, setChange }) => {
  const { _id, name, email, address, image, role } = user;
  console.log(role);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openModal = () => {
    setIsModalOpen(true);
  };

  const closeModal = (isSuccess) => {
    console.log("editing", isSuccess);
    setChange(isSuccess);
    setIsModalOpen(false);
  };

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = (isSuccess) => {
    setChange(isSuccess);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    // Handle deletion, e.g., update state or fetch updated user list
    console.log("User deleted successfully.");
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
        <Link to="#" onClick={openDeleteModal}>
          <i className="fa-solid fa-trash-can" />
          <DeleteUserModal
            isOpen={isDeleteModalOpen}
            closeModal={closeDeleteModal}
            userId={user._id}
            onDelete={handleDelete}
          />
        </Link>
      </td>
    </tr>
  );
};

export default AdminUserItem;
