import React, { useDebugValue, useEffect, useState } from 'react';
import { useAddNewTaskMutation } from '../../feature/tasks/tasksApiSlice';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {

    const [addNewTask, {
        isLoading,
        isSuccess,
        isError,
        error
    }] = useAddNewTaskMutation()

    const userId = localStorage.getItem("userId")

    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState(null);
    const [address, setAddress] = useState('');
    const [domainKnowledge, setDomainKnowledge] = useState([]);
    const [levelOfKnowledge, setLevelOfKnowledge] = useState('');
    const [deadline, setDeadline] = useState('');
    const [price, setPrice] = useState('');

    const [validTitle, setValidTitle] = useState(false);
    const [validDescription, setValidDescription] = useState(false);
    const [validMedia, setValidMedia] = useState(false);
    const [validAddress, setValidAddress] = useState(false);
    const [validDomainKnowledge, setValidDomainKnowledge] = useState(false);
    const [validLevelOfKnowledge, setValidLevelOfKnowledge] = useState(false);
    const [validDeadline, setValidDeadline] = useState(false);
    const [validPrice, setValidPrice] = useState(false);

    useEffect(() => {
        setValidTitle(title.length > 0);
        // console.log(validTitle)
    }, [title])

    useEffect(() => {
        setValidDescription(description.length > 0);
        // console.log(validDescription)
    }, [description])

    useEffect(() => {
        // Address validation (example: checking if it's not empty)
        setValidAddress(address.trim() !== '');
        // console.log(validAddress)
    }, [address]);

    useEffect(() => {
        // Check if at least one domain knowledge is selected
        setValidDomainKnowledge(domainKnowledge.length > 0);
        // console.log(validDomainKnowledge)
    }, [domainKnowledge]);

    useEffect(() => {
        setValidLevelOfKnowledge(levelOfKnowledge.length > 0)
        console.log(validLevelOfKnowledge)
    }, [levelOfKnowledge])

    useEffect(() => {
        // Check if the deadline is a valid time (you can use a regular expression or a time library)
        setValidDeadline(new Date(deadline) instanceof Date && !isNaN(new Date(deadline)));
        // console.log(validDeadline)
    }, [deadline]);

    useEffect(() => {
        // Check if the price is a valid number
        setValidPrice(!isNaN(price) && parseFloat(price) >= 0); // Ensure it's a non-negative number
        console.log(validPrice)
    }, [price]);

    const handleTitleChange = (e) => {
        setTitle(e.target.value);
    };

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value);
    };

    const handleAddressChange = (e) => {
        setAddress(e.target.value);
    };

    const handleDomainKnowledgeChange = (e) => {
        const { value } = e.target;
        if (domainKnowledge.includes(value)) {
            setDomainKnowledge(domainKnowledge.filter((item) => item !== value));
        } else {
            setDomainKnowledge([...domainKnowledge, value]);
        }
    };

    const handleDeadlineChange = (e) => {
        setDeadline(e.target.value);
    };

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    const handleLevelOfKnowledgeChange = (e) => {
        console.log(e.target.value)
        setLevelOfKnowledge(e.target.value);
    };

    const canSave = [validTitle, validDescription, validAddress, validDomainKnowledge, validLevelOfKnowledge, validDeadline, validPrice].every(Boolean) && !isLoading
    console.log(levelOfKnowledge)
    const onSubmitUserClicked = async (e) => {
        e.preventDefault()
        if (canSave) {
            console.log('Form Data:', {
                title,
                description,
                address,
                domainKnowledge,
                levelOfKnowledge,
                deadline,
                price,
            });
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"

    const validTitleClass = validTitle ? '' : 'form__input--incomplete';
    const validDescriptionClass = validDescription ? '' : 'form__input--incomplete';
    const validAddressClass = validAddress ? '' : 'form__input--incomplete';
    const validLevelOfKnowledgeClass = validLevelOfKnowledge ? '' : 'form__input--incomplete';
    const validDeadlineClass = validDeadline ? '' : 'form__input--incomplete';
    const validPriceClass = validPrice ? '' : 'form__input--incomplete';


    return (
        <div className="ltn__appointment-area pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ltn__appointment-inner">
                            <form action="#">
                                <p className={errClass}>{error?.data?.error}</p>
                                {/* Section 1: Description */}
                                <h2>1. Title and Description</h2>
                                <p>
                                    <small>All fields are mandatory. Media is optional.</small>
                                </p>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-item input-item-name ltn__custom-icon">
                                            <input
                                                className={`form__input ${validTitleClass}`}
                                                type="text"
                                                name="ltn__name"
                                                onChange={handleTitleChange}
                                                placeholder="*Title (mandatory)"
                                                autoComplete='off'
                                            />
                                        </div>
                                        <div className="input-item input-item-textarea ltn__custom-icon">
                                            <textarea
                                                className={`form__input ${validDescriptionClass}`}
                                                name="ltn__message"
                                                placeholder="*Description"
                                                onChange={handleDescriptionChange}
                                                autoComplete='off'
                                                defaultValue={""}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 2: Media */}
                                <h2>2. Media</h2>
                                <div className="row">
                                    <div className="col-md-12">
                                        <input
                                            type="file"
                                            accept=".pdf,.png,.jpg,.jpeg,.svg"
                                            id="myFile"
                                            name="filename"
                                            multiple
                                            className="btn theme-btn-3 mb-10"
                                        />
                                        <p>
                                            <small>* Multiple uploads is allowed.</small><br />
                                            <small>* PDF files upload supported as well.</small><br />
                                            <small>* Images might take longer to be processed.</small>
                                        </p>
                                    </div>
                                </div>

                                {/* Section 3: Location */}
                                <h2>3. Location</h2>
                                <div className="row">
                                    <div className="col-md-12">
                                        <div className="input-item input-item-location-pin ltn__custom-icon ">
                                            <input
                                                className={`form__input ${validAddressClass}`}
                                                onChange={handleAddressChange}
                                                type="text"
                                                name="address"
                                                placeholder="*Address" />
                                        </div>
                                    </div>
                                    <div className="col-lg-12">
                                        <div className="property-details-google-map mb-60">
                                            <iframe
                                                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3394.009971588668!2d151.2302688151586!3d-33.91752522964282!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6b12c9a18df8d1cd%3A0x903482239b8c46c5!2sUniversity%20of%20New%20South%20Wales!5e0!3m2!1sen!2sau!4v1672745266941!5m2!1sen!2sau"
                                                width="100%"
                                                height="100%"
                                                allowFullScreen
                                                aria-hidden="false"
                                                tabIndex={0}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 4: Domain Knowledge */}
                                <h2>4. Domain Knowledge</h2>
                                <h6>Select the Domain Knowledge Required for the Task</h6>
                                <div className="row">
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">Mathematics
                                            <input
                                                type="checkbox"
                                                name="domainKnowledge"
                                                value="Mathematics"
                                                onChange={handleDomainKnowledgeChange} />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">Physics
                                            <input
                                                type="checkbox"
                                                name="domainKnowledge"
                                                value="Physics"
                                                onChange={handleDomainKnowledgeChange} />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">Chemistry
                                            <input
                                                type="checkbox"
                                                name="domainKnowledge"
                                                value="Chemistry"
                                                onChange={handleDomainKnowledgeChange} />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">Biology
                                            <input onChange={handleDomainKnowledgeChange} type="checkbox" name="domainKnowledge" value="Biology" />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">Computer Science
                                            <input onChange={handleDomainKnowledgeChange} type="checkbox" name="domainKnowledge" value="Computer Science" />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">History
                                            <input onChange={handleDomainKnowledgeChange} type="checkbox" name="domainKnowledge" value="History" />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">Languages
                                            <input onChange={handleDomainKnowledgeChange} type="checkbox" name="domainKnowledge" value="Languages" />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">Economics
                                            <input onChange={handleDomainKnowledgeChange} type="checkbox" name="domainKnowledge" value="Economics" />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                    <div className="col-lg-4 col-md-6">
                                        <label className="checkbox-item">Art and Design
                                            <input onChange={handleDomainKnowledgeChange} type="checkbox" name="domainKnowledge" value="Art and Design" />
                                            <span className="checkmark" />
                                        </label>
                                    </div>
                                </div>

                                {/* Section5: Level of Knowledge Required */}
                                <h2>5. Level of Knowledge Required</h2>
                                <h6>Select the Level of Knowledge Required for the Task</h6>
                                <div className="row">
                                    <div className="col-lg-12">
                                        <div className="input-item">
                                            <select name="levelOfKnowledge" value={levelOfKnowledge} className={`nice-select form__input ${validLevelOfKnowledgeClass}`} onChange={handleLevelOfKnowledgeChange}>
                                                <option value="" disabled selected>Select Level</option>
                                                <option value="Elementary Knowledge">Elementary Knowledge</option>
                                                <option value="High School Level">High School Level</option>
                                                <option value="University Level">University Level</option>
                                                {/* Add more options as needed */}
                                            </select>
                                        </div>
                                    </div>
                                </div>


                                {/* Section 6: Deadline */}
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h2>6. Deadline</h2>
                                        <h6>Set the Deadline for the Task</h6>
                                        <div className="input-item input-item-date ltn__custom-icon">
                                            <input className={`form__input ${validDeadlineClass}`} onChange={handleDeadlineChange} type="date" name="deadline" placeholder="Deadline" />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <h2>7. Price</h2>
                                        <h6>Set the Price for the Task</h6>
                                        <div className="input-item input-item-money ltn__custom-icon">
                                            <input type="text" className={`form__input ${validPriceClass}`} onChange={handlePriceChange} name="ltn__name" placeholder="Price in $ (only numbers)" />
                                        </div>
                                    </div>
                                </div>


                                {/* Submit Button */}
                                <div className="btn-wrapper text-center mt-30">
                                    <button
                                        disabled={!canSave}
                                        onClick={onSubmitUserClicked}
                                        className="btn theme-btn-1 btn-effect-1 text-uppercase"
                                        type="submit"
                                    >
                                        Submit Task
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddTask;
