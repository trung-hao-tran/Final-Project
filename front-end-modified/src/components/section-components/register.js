import React from "react";
import { Link } from "react-router-dom";
import { useAddNewUserMutation } from "../../feature/users/usersApiSlice";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// const NAME_REGEX = /^[A-z0-9!@#$%]{3,12}$/;
const EMAIL_REGEX = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/
const PWD_REGEX = /^[A-z0-9!@#$%]{6,18}$/;
const PHONE_REGEX = /^[0-9]{10}$/

const Register = () => {
  const [addNewUser, { isLoading, isSuccess, isError, error }] =
    useAddNewUserMutation();

  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [validEmail, setValidEmail] = useState(false);
  const [password, setPassword] = useState("");
  const [validPassword, setValidPassword] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [validConfirmPassword, setValidConfirmPassword] = useState(false);
  const [name, setName] = useState("");
  const [address, setAddress] = useState("");
  const [validAddress, setValidAddress] = useState(false);
  const [phone, setPhone] = useState("");
  const [validPhone, setValidPhone] = useState(false);

  const [validName, setValidName] = useState(false);

  const [hasInteractedName, setHasInteractedName] = useState(false);
  const [hasInteractedEmail, setHasInteractedEmail] = useState(false);
  const [hasInteractedPassword, setHasInteractedPassword] = useState(false);
  const [hasInteractedConfirmPassword, setHasInteractedConfirmPassword] = useState(false);
  const [hasInteractedAddress, setHasInteractedAddress] = useState(false);
  const [hasInteractedPhone, setHasInteractedPhone] = useState(false);

  useEffect(() => {
    setValidEmail(EMAIL_REGEX.test(email));
  }, [email]);

  useEffect(() => {
    setValidPassword(PWD_REGEX.test(password));
  }, [password]);

  useEffect(() => {
    setValidConfirmPassword(confirmPassword && password === confirmPassword);
  }, [confirmPassword]);

  useEffect(() => {
    setValidName(name.length > 0 && name.length < 60);
  }, [name]);

  useEffect(() => {
    setValidAddress(address.trim() !== "");
  }, [address]);

  useEffect(() => {
    setValidPhone(PHONE_REGEX.test(phone));
  }, [phone]);

  useEffect(() => {
    if (isSuccess) {
      setName("");
      setEmail("");
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    }
  }, [isSuccess, navigate]);

  const onEmailChanged = (e) => setEmail(e.target.value);
  const onNameChanged = (e) => setName(e.target.value);
  const onPasswordChanged = (e) => setPassword(e.target.value);
  const onConfirmPasswordChanged = (e) => setConfirmPassword(e.target.value);
  const onAddressChanged = (e) => setAddress(e.target.value);
  const onPhoneChanged = (e) => setPhone(e.target.value);

  const onBlurName = () => setHasInteractedName(true);

  const onBlurEmail = () => setHasInteractedEmail(true);

  const onBlurPassword = () => setHasInteractedPassword(true);

  const onBlurConfirmPassword = () => setHasInteractedConfirmPassword(true);

  const onBlurAddress = () => setHasInteractedAddress(true);
  const onBlurPhone = () => setHasInteractedPhone(true);

  const canSave =
    [validName, validEmail, validPassword, validConfirmPassword, validAddress, validPhone].every(
      Boolean
    ) && !isLoading;
  const onSaveUserClicked = async (e) => {
    e.preventDefault();
    if (canSave) {
      await addNewUser({ name, email, password, address, phone });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";
  const validNameClass =
    hasInteractedName && !validName ? "form__input--incomplete" : "";
  const validEmailClass =
    hasInteractedEmail && !validEmail ? "form__input--incomplete" : "";

  const validPwdClass =
    hasInteractedPassword && !validPassword ? "form__input--incomplete" : "";
  const validConfirmPwdClass =
    hasInteractedConfirmPassword && !validConfirmPassword
      ? "form__input--incomplete"
      : "";

  const validAddressClass =
    hasInteractedAddress && !validAddress ? "form__input--incomplete" : "";
  const validPhoneClass =
    hasInteractedPhone && !validPhone ? "form__input--incomplete" : "";

  return (
    <div className="ltn__login-area pb-110">
      <div className="container">
        <div className="row">
          <div className="col-lg-12">
            <div className="section-title-area text-center">
              <h1 className="section-title">
                Sign up <br />
                Create Your Account
              </h1>
              <p>
                Please enter your information below <br />
              </p>
              <p className={errClass}>{error?.data?.error}</p>
            </div>
          </div>
        </div>
        <div className="row">
          <div className="col-lg-6 offset-lg-3">
            <div className="account-login-inner">
              <form
                onSubmit={onSaveUserClicked}
                className="ltn__form-box contact-form-box"
              >
                <input
                  className={`form__input ${validNameClass}`}
                  value={name}
                  onChange={onNameChanged}
                  type="text"
                  name="name"
                  onBlur={onBlurName}
                  autoComplete="off"
                  placeholder="Name*"
                />
                <input
                  className={`form__input ${validEmailClass}`}
                  value={email}
                  onChange={onEmailChanged}
                  type="email"
                  name="email"
                  onBlur={onBlurEmail}
                  autoComplete="off"
                  placeholder="Email*"
                />
                <input
                  className={`form__input ${validAddressClass}`}
                  value={address}
                  onChange={onAddressChanged}
                  type="text"
                  name="address"
                  onBlur={onBlurAddress}
                  autoComplete="off"
                  placeholder="Address*"
                />
                <input
                  className={`form__input ${validPhoneClass}`}
                  value={phone}
                  onChange={onPhoneChanged}
                  type="text"
                  name="phone"
                  onBlur={onBlurPhone}
                  autoComplete="off"
                  placeholder="Phone*"
                />
                <input
                  className={`form__input ${validPwdClass}`}
                  value={password}
                  onChange={onPasswordChanged}
                  type="password"
                  name="password"
                  onBlur={onBlurPassword}
                  autoComplete="off"
                  placeholder="Password*"
                />
                <input
                  className={`form__input ${validConfirmPwdClass}`}
                  value={confirmPassword}
                  onChange={onConfirmPasswordChanged}
                  type="password"
                  name="confirmpassword"
                  onBlur={onBlurConfirmPassword}
                  autoComplete="off"
                  placeholder="Confirm Password*"
                />
                <div className="btn-wrapper">
                  <button
                    className="theme-btn-1 btn reverse-color btn-block"
                    type="submit"
                    disabled={!canSave}
                  >
                    CREATE ACCOUNT
                  </button>
                </div>
              </form>
              <div className="by-agree text-center">
                <p>By creating an account, you agree to our:</p>
                <p>
                  <a href="#">
                    TERMS OF CONDITIONS &nbsp; &nbsp; | &nbsp; &nbsp; PRIVACY
                    POLICY
                  </a>
                </p>
                <div className="go-to-btn mt-50 go-top">
                  <Link to="/login">ALREADY HAVE AN ACCOUNT ?</Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
