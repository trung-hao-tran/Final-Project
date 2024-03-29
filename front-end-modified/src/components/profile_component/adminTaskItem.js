import React, { useState } from "react";
import { Link } from "react-router-dom";
import DeleteTaskModal from "./deleteTaskModel";

const AdminTaskItem = ({ task, setChange }) => {
  const { _id, title, images, address, updatedAt } = task;

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

  const openDeleteModal = () => {
    setIsDeleteModalOpen(true);
  };

  const closeDeleteModal = (isSuccess) => {
    setChange(isSuccess);
    setIsDeleteModalOpen(false);
  };

  const handleDelete = () => {
    // Handle deletion, e.g., update state or fetch updated user list
    console.log("Task deleted successfully.");
  };

  let publicUrl = process.env.PUBLIC_URL + "/";
  const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString();
  const addressComponents = address?.split(",");
  const suburbState =
    addressComponents?.length >= 2
      ? addressComponents[addressComponents.length - 2].trim()
      : address;
  return (
    <tr>
      <td className="ltn__my-properties-img go-top">
        <Link to={`/tasks/${_id}`}>
          <img
            src={
              images && images.length > 0
                ? images[0]
                : publicUrl + "assets/img/default/task.png"
            }
            alt="#"
          />
        </Link>
      </td>
      <td>
        <div className="ltn__my-properties-info">
          <h6 className="mb-10 go-top">
            <Link to={`/tasks/${_id}`}>{title}</Link>
          </h6>
          <small>
            <i className="icon-placeholder" /> {suburbState}
          </small>
          <br />
        </div>
      </td>
      <td>{formattedUpdatedAt}</td>
      <td>
        <Link to={`/edit-task/${_id}`}>Edit</Link>
      </td>
      <td>
        <Link to="#" onClick={openDeleteModal}>
          <i className="fa-solid fa-trash-can" />
        </Link>
        <DeleteTaskModal
          isOpen={isDeleteModalOpen}
          closeModal={closeDeleteModal}
          taskId={task._id}
          onDelete={handleDelete}
        />
      </td>
    </tr>
  );
};

export default AdminTaskItem;
