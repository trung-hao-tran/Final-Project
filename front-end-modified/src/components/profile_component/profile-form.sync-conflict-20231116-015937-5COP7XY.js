/* eslint-disable react/react-in-jsx-scope */
import React, { useState, useRef, useEffect } from "react";
import { useUpdateUserMutation } from "../../feature/users/usersApiSlice";
import { setCurrentUser } from "../../feature/users/userSlice";
import { useDispatch } from "react-redux";

const MyAccountForm = ({ user, setCurrentData }) => {
  const [updateUser, { isLoading, isSuccess, isError, error }] =
    useUpdateUserMutation();

  const dispatch = useDispatch();

  const fileInputRef = useRef(null);

  console.log("userdata in form", user);
  const { name, email, address, phone, image } = user;
  let publicUrl = process.env.PUBLIC_URL;

  const [nameData, setNameData] = useState(name);
  const [phoneData, setPhoneData] = useState(phone);
  const [locationData, setLocationData] = useState(address);
  const [emailData, setEmailData] = useState(email);
  const [imageData, setImageData] = useState(image);

  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");
  const [validNewPassword, setValidNewPassword] = useState(true);

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

  const handlePasswordChange = (e) => {
    setNewPassword(e.target.value);
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmNewPassword(e.target.value);
  };

  const isPasswordAdded = newPassword !== "" && validNewPassword;

  const isFormValid =
    !isLoading &&
    (nameData !== name ||
      phoneData !== phone ||
      locationData !== address ||
      imageData !== image ||
      emailData !== email ||
      isPasswordAdded);

  useEffect(() => {
    // Validate new password
    setValidNewPassword(newPassword === confirmNewPassword);
  }, [newPassword, confirmNewPassword]);

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
      if (isPasswordAdded) {
        const res = await updateUser({
          name: nameData,
          email: emailData,
          password: newPassword,
          address: locationData,
          phone: phoneData,
          image: imageData,
        });
        dispatch(setCurrentUser(res.data));
      } else {
        const res = await updateUser({
          name: nameData,
          email: emailData,
          address: locationData,
          phone: phoneData,
          image: imageData,
        });
        dispatch(setCurrentUser(res.data));
      }
    }
  };

  useEffect(() => {
    if (isSuccess) {
      setConfirmNewPassword("");
      setNewPassword("");
    }
  }, [isSuccess]);

  return (
    <>
      <div className="ltn__form-box">
        <div className="row mb-50">
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
        <fieldset>
          <legend>Password change</legend>
          <div className="row">
            <div className="col-md-12">
              <label>New password (leave blank to leave unchanged):</label>
              <input
                type="password"
                name="newPassword"
                value={newPassword}
                onChange={handlePasswordChange}
              />
              <label>Confirm new password:</label>
              <input
                type="password"
                name="confirmNewPassword"
                value={confirmNewPassword}
                onChange={handleConfirmPasswordChange}
              />
              {!validNewPassword && (
                <p className="errmsg">Passwords do not match.</p>
              )}
            </div>
          </div>
        </fieldset>
        <div className="btn-wrapper">
          <button
            type="submit"
            className="btn theme-btn-1 btn-effect-1 text-uppercase"
            disabled={!isFormValid}
            onClick={handleSubmit}
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccountForm;
