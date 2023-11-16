// EditUserModal.js
import React, { useRef, useState, useEffect } from "react";
import ReactModal from "react-modal";
import { useAdminUpdateUserMutation } from "../../feature/users/usersApiSlice";
import { useDispatch } from "react-redux";

const EditUserModal = ({ isOpen, closeModal, user }) => {
  const [adminUpdateUser, { isLoading, isSuccess, isError, error }] =
    useAdminUpdateUserMutation();

  const fileInputRef = useRef(null);
  const dispatch = useDispatch();
  const { _id, name, email, address, phone, image } = user;

  const [nameData, setNameData] = useState(name);
  const [phoneData, setPhoneData] = useState(phone);
  const [locationData, setLocationData] = useState(address);
  const [emailData, setEmailData] = useState(email);
  const [imageData, setImageData] = useState(image);

  const handleChangeName = (e) => {
    setNameData(e.target.value);
  };

  const handleChangePhone = (e) => {
    setPhoneData(e.target.value.replace(/\D/g, ""));
  };

  const handleChangeLocation = (e) => {
    setLocationData(e.target.value);
  };

  const handleChangeEmail = (e) => {
    setEmailData(e.target.value);
  };

  const handleClickImage = () => {
    fileInputRef.current.click();
  };

  const isFormValid =
    !isLoading &&
    (nameData !== name ||
      phoneData !== phone ||
      locationData !== address ||
      imageData !== image ||
      emailData !== email);

  const handleChangeImage = (e) => {
    const files = e.target.files;
    console.log(files);
    const filePromises = Array.from(files).map((file) => {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (event) => {
          resolve(event.target.result);
        };
        reader.onerror = (error) => {
          reject(error);
        };
        reader.readAsDataURL(file);
      });
    });

    Promise.all(filePromises)
      .then((dataUrls) => {
        setImageData(dataUrls[0]);
        console.log(dataUrls);
      })
      .catch((error) => {
        console.error("Error converting files to Data URLs:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (isFormValid) {
      await adminUpdateUser({
        id: _id,
        name: nameData,
        email: emailData,
        address: locationData,
        phone: phoneData,
        image: imageData,
      });
      closeModal(true);
    }
  };

  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={closeModal}
      contentLabel="Edit User Modal"
      style={{
        overlay: {
          backgroundColor: "rgba(0, 0, 0, 0.5)",
        },
        content: {
          width: "60%",
          maxWidth: "700px",
          margin: "auto",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 0 10px rgba(0, 0, 0, 0.3)",
        },
      }}
    >
      <div className="ltn__form-box">
        <div className="row mb-50" style={{ marginBottom: "15px" }}>
          <div
            className="ltn-author-introducing col-md-12"
            style={{ border: 0 }}
          >
            <div className="author-img">
              <input
                type="file"
                ref={fileInputRef}
                style={{ display: "none" }}
                accept="image/*"
                onChange={handleChangeImage}
              />
              <img
                src={imageData ? imageData : "/assets/img/default/user.png"}
                alt="Author Image"
                onClick={handleClickImage}
              />
            </div>
          </div>
          <div className="col-md-6">
            <label>Name:</label>
            <input
              type="text"
              name="ltn__name"
              value={nameData}
              onChange={handleChangeName}
            />
          </div>
          <div className="col-md-6">
            <label>Phone(+64): </label>
            <input
              type="text"
              name="ltn__phone"
              value={phoneData}
              onChange={handleChangePhone}
            />
          </div>

          <div className="col-md-6">
            <label>Location:</label>
            <input
              type="text"
              name="ltn__location"
              value={locationData}
              onChange={handleChangeLocation}
            />
          </div>
          <div className="col-md-6">
            <label>Email:</label>
            <input
              type="email"
              name="ltn__email"
              value={emailData}
              placeholder="trunghao2000@gmail.com"
              onChange={handleChangeEmail}
            />
          </div>
        </div>
        <div className="btn-wrapper" style={{ marginTop: "0px" }}>
          <button
            type="submit"
            className="btn theme-btn-1 btn-effect-1 text-uppercase"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Save Changes
          </button>
          <button
            className="btn theme-btn-1 btn-effect-1 text-uppercase"
            onClick={closeModal}
          >
            Close
          </button>
        </div>
      </div>
    </ReactModal>
  );
};

export default EditUserModal;
