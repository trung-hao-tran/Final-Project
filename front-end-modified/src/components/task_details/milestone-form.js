import React, { useState, useEffect } from "react";

const MilestoneForm = (props) => {
  const { toast, endTime, taskId, flag, setFlag, onClose, mileStoneArray } =
    props;

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [date, setDate] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [priority, setPriority] = useState("Not Started");
  const today = new Date().toISOString().slice(0, 16);
  const endTimeData = endTime?.slice(0, 16);

  const handleDateChange = (e) => {
    setDate(e.target.value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleChangePriority = (e) => {
    setPriority(e.target.value);
  };

  // handle valid check for fields

  const [validTitle, setValidTitle] = useState(false);
  const [validDescription, setValidDescription] = useState(false);
  const [validDate, setValidDate] = useState(false);

  useEffect(() => {
    setValidTitle(title.length > 0 && title.length < 50);
  }, [title]);

  useEffect(() => {
    setValidDescription(description.length > 0 && description.length < 500);
  }, [description]);

  useEffect(() => {
    // Check if the endTime is a valid time (you can use a regular expression or a time library)
    setValidDate(new Date(date) instanceof Date && !isNaN(new Date(date)));
  }, [date]);

  const validTitleClass = validTitle ? "" : "form__input--incomplete";
  const validDescriptionClass = validDescription
    ? ""
    : "form__input--incomplete";

  const validDateClass = validDate ? "" : "form__input--incomplete";

  const canSave =
    [validTitle, validDescription, validDate].every(Boolean) && !isLoading;

  // handle submit

  const handleSubmit = async (e) => {
    e.preventDefault();

    const priority = e.target.priority.value;

    const value = {
      title,
      description,
      priority,
      date,
    };

    mileStoneArray.push(value);

    try {
      setIsLoading(true);
      const response = await fetch(
        `http://localhost:4000/api/tasks/${taskId}/milestones`,
        {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify(mileStoneArray),
        }
      );

      if (response.ok) {
        toast.success("Create milestone successfully!");
        setIsLoading(false);
        if (flag) {
          setFlag(true);
        } else {
          setFlag(false);
        }
        onClose();
      } else {
        if (flag) {
          setFlag(true);
        } else {
          setFlag(false);
        }
        toast.error("Request Error");
        setIsLoading(false);
        onClose();
      }
    } catch (error) {
      if (flag) {
        setFlag(true);
      } else {
        setFlag(false);
      }
      toast.error(`Error: ${error}`);
      setIsLoading(false);
      onClose();
    }
  };

  return (
    <div>
      <div className="section-title-area text-center">
        <h1 className="section-title">Add your milestone</h1>
        <p>
          milestone helps you set perfect targets and goals!
          <br />
        </p>
      </div>
      <div className="row">
        <div className="account-login-inner">
          <form action="#" onSubmit={handleSubmit}>
            <input
              className={`form__input ${validTitleClass}`}
              type="text"
              name="title"
              placeholder="Title*"
              onChange={handleTitleChange}
              autoComplete="off"
            />
            <textarea
              className={`form__input ${validDescriptionClass}`}
              name="description"
              placeholder="Description*"
              onChange={handleDescriptionChange}
              defaultValue={""}
            />
            <div className="input-item input-item-date ltn__custom-icon">
              <input
                className={`form__input ${validDateClass}`}
                onChange={handleDateChange}
                type="datetime-local"
                name="date"
                placeholder="date"
                min={today}
                defaultValue={today}
                max={endTimeData}
              />
            </div>
            <div className="input-item">
              <select
                className="nice-select"
                name="priority"
                defaultValue="Not Started"
                onChange={handleChangePriority}
              >
                <option value="None" disabled>
                  Select One
                </option>
                <option value="Not Started">Not Started</option>
                <option value="In Progress">In Progress</option>
                <option value="Completed">Completed</option>
              </select>
            </div>
            <div className="btn-wrapper mt-0">
              <button
                disabled={!canSave}
                className="theme-btn-1 btn btn-block"
                type="submit"
              >
                Add Milestone
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default MilestoneForm;
