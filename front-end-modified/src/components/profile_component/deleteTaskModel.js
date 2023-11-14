// DeleteUserModal.js
import React from "react";
import ReactModal from "react-modal";
import { useAdminDeleteTaskMutation } from "../../feature/tasks/tasksApiSlice";

const DeleteTaskModal = ({ isOpen, closeModal, taskId }) => {
  const [adminDeleteTask] = useAdminDeleteTaskMutation();
  console.log("taskId", taskId);

  const handleDeleteTask = async () => {
    try {
      await adminDeleteTask({ id: taskId });
      closeModal(true);
    } catch (error) {
      // Handle error, display a message, etc.
      closeModal(false);
      console.error("Error deleting user:", error);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Delete User Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          zIndex: "10000",
        },
        content: {
          width: "60%",
          height: "30%",
          maxWidth: "500px", // Adjust the max-width as needed
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <div className="col-md-12">
        <h2>Delete User</h2>
        <p>Are you sure you want to delete this task?</p>
      </div>

      {/* Delete button */}
      <div className="btn-wrapper" style={{ textAlign: "center" }}>
        <button
          className="btn theme-btn-1 btn-effect-1 text-uppercase"
          onClick={handleDeleteTask}
        >
          Delete
        </button>
        {/* Cancel button */}
        <button
          className="btn theme-btn-1 btn-effect-1 text-uppercase"
          onClick={closeModal}
        >
          Cancel
        </button>
      </div>
    </ReactModal>
  );
};

export default DeleteTaskModal;
