import React from "react";
import { Link } from "react-router-dom";

const ProfileTaskItem = ({ task }) => {
  const { _id, title, images, address, status, updatedAt, milestones } = task;

  const completedMileStone = milestones.filter(
    (milestone) => milestone.status === "Completed"
  );

  const currentDate = new Date();
  const overdueMilestones = milestones.filter(
    (milestone) =>
      milestone.status !== "Completed" && new Date(milestone.date) < currentDate
  );

  let summary = "";
  let summary_style = {};
  if (status === "Not Started") {
    summary_style = { color: "orange" };
  } else if (status === "Completed") {
    summary_style = { color: "green" };
  } else {
    summary = completedMileStone.length + "/" + milestones.length;
    if (overdueMilestones) {
      summary_style = { color: "red" };
    } else {
      summary_style = { color: "green" };
    }
  }
  let publicUrl = process.env.PUBLIC_URL + "/";
  const formattedUpdatedAt = new Date(updatedAt).toLocaleDateString();
  const addressComponents = address.split(",");
  const suburbState =
    addressComponents.length >= 2
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
          <small style={summary_style}>
            {status} {summary}
          </small>
        </div>
      </td>
      <td>{formattedUpdatedAt}</td>
      <td>
        <Link to={`/edit-task/${_id}`}>Edit</Link>
      </td>
      <td>
        <Link to="#">
          <i className="fa-solid fa-trash-can" />
        </Link>
      </td>
    </tr>
  );
};

export default ProfileTaskItem;
