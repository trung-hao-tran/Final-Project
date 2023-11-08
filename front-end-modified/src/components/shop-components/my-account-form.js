/* eslint-disable react/react-in-jsx-scope */
import React, { useState } from "react";

const MyAccountForm = ({ user }) => {
  console.log("userdata in form", user);
  const { name, email, address, phone } = user;

  const [nameData, setNameData] = useState(name);
  const [phoneData, setPhoneData] = useState(phone);
  const [locationData, setLocationData] = useState(address);
  const [emailData, setEmailData] = useState(email);

  const handleChangeName = (e) => {
    setNameData(e.target.value);
  };
  const handleChangePhone = (e) => {
    setPhoneData(e.target.value);
  };
  const handleChangeLocation = (e) => {
    setLocationData(e.target.value);
  };
  const handleChangeEmail = (e) => {
    setEmailData(e.target.value);
  };
  return (
    <>
      <div className="ltn__form-box">
        <div className="row mb-50">
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
            <label>Phone: </label>
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
              <label>Current password (leave blank to leave unchanged):</label>
              <input type="password" name="ltn__name" />
              <label>New password (leave blank to leave unchanged):</label>
              <input type="password" name="ltn__lastname" />
              <label>Confirm new password:</label>
              <input type="password" name="ltn__lastname" />
            </div>
          </div>
        </fieldset>
        <div className="btn-wrapper">
          <button
            type="submit"
            className="btn theme-btn-1 btn-effect-1 text-uppercase"
          >
            Save Changes
          </button>
        </div>
      </div>
    </>
  );
};

export default MyAccountForm;
