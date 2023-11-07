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
    const today = new Date().toISOString().slice(0, 16);

    const navigate = useNavigate()
    const [title, setTitle] = useState('');
    const [description, setDescription] = useState('');
    const [media, setMedia] = useState(null);
    const [address, setAddress] = useState('');
    const [domainKnowledge, setDomainKnowledge] = useState([]);
    const [frequency, setFrequency] = useState('Daily');
    const [endTime, setEndTime] = useState('');
    const [startTime, setStartTime] = useState(today);
    const [price, setPrice] = useState('');

    const [validTitle, setValidTitle] = useState(false);
    const [validDescription, setValidDescription] = useState(false);
    const [validMedia, setValidMedia] = useState(false);
    const [validAddress, setValidAddress] = useState(false);
    const [validDomainKnowledge, setValidDomainKnowledge] = useState(false);
    const [validEndTime, setValidEndTime] = useState(false);
    const [validStartTime, setValidStartTime] = useState(false);
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
        // Check if the endTime is a valid time (you can use a regular expression or a time library)
        setValidEndTime(new Date(endTime) instanceof Date && !isNaN(new Date(endTime)));
        // console.log(validEndTime)
    }, [endTime]);

    useEffect(() => {
        // Check if the endTime is a valid time (you can use a regular expression or a time library)
        setValidStartTime(new Date(startTime) instanceof Date && !isNaN(new Date(startTime)));
        // console.log(validEndTime)
    }, [startTime]);

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

    const handleFrequencyChange = (e) => {
        console.log(e.target.value)
        setFrequency(e.target.value);
    };

    const handleEndTimeChange = (e) => {
        setEndTime(e.target.value);
    };

    const handleStartTimeChange = (e) => {
        setStartTime(e.target.value);
    }

    const handlePriceChange = (e) => {
        setPrice(e.target.value);
    };

    useEffect(() => {
        if (isSuccess) {
            setTitle("");
            setDescription("");
            setAddress("")
            setDomainKnowledge([]);
            setStartTime("")
            setEndTime("")
            setMedia(null)
            setPrice("")
            setFrequency("None");
            navigate("/");
        }
    }, [isSuccess, navigate]);

    const canSave = [validTitle, validDescription, validAddress, validDomainKnowledge, validEndTime, validPrice, validStartTime].every(Boolean) && !isLoading
    console.log(canSave)
    const onSubmitUserClicked = async (e) => {
        e.preventDefault()
        const frequency = e.target.frequency.value
        if (canSave) {
            const time = {
                start: startTime,
                end: endTime
            }
            await addNewTask({
                title,
                description,
                address,
                domainKnowledge,
                frequency,
                time,
                price,
            });
        }
    }

    const errClass = isError ? "errmsg" : "offscreen"

    const validTitleClass = validTitle ? '' : 'form__input--incomplete';
    const validDescriptionClass = validDescription ? '' : 'form__input--incomplete';
    const validAddressClass = validAddress ? '' : 'form__input--incomplete';
    const validEndTimeClass = validEndTime ? '' : 'form__input--incomplete';
    const validStartTimeClass = validStartTime ? '' : 'form__input--incomplete';
    const validPriceClass = validPrice ? '' : 'form__input--incomplete';


    return (
        <div className="ltn__appointment-area pb-120">
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="ltn__appointment-inner">
                            <form action="#" onSubmit={onSubmitUserClicked}>
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
                                                placeholder="*Address"
                                                autoComplete='off' />
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
                                </div><br></br>



                                {/* Section 6: EndTime */}
                                <div className="row">
                                    <h2>5. Time</h2>
                                    <div className="col-lg-6">
                                        <h6>Set the start time for the Task</h6>
                                        <div className="input-item input-item-date ltn__custom-icon">
                                            <input className={`form__input ${validStartTimeClass}`} onChange={handleStartTimeChange} type="datetime-local" name="startTime" placeholder="startTime" min={today} defaultValue={today} />
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <h6>Set the EndTime for the Task</h6>
                                        <div className="input-item input-item-date ltn__custom-icon">
                                            <input className={`form__input ${validEndTimeClass}`} onChange={handleEndTimeChange} type="datetime-local" name="endTime" placeholder="EndTime" min={startTime} />
                                        </div>
                                    </div>
                                </div>

                                {/* Section 6: Task Frequency */}
                                <div className="row">
                                    <div className="col-lg-6">
                                        <h2>6. Task Frequency</h2>
                                        <h6>Select the Task Frequency</h6>
                                        <div className="input-item">
                                            <select className='nice-select' value={frequency} onChange={handleFrequencyChange}
                                                name='frequency' defaultValue="Daily">
                                                <option value="None" disabled>Select One</option>
                                                <option value="Daily" >Daily</option>
                                                <option value="Weekly">Weekly</option>
                                                <option value="Monthly">Monthly</option>
                                                <option value="Yearly">Yearly</option>
                                                {/* Add more options as needed */}
                                            </select>
                                        </div>
                                    </div>
                                    <div className="col-lg-6">
                                        <h2>7. Price</h2>
                                        <h6>Set the Price for the Task</h6>
                                        <div className="input-item input-item-money ltn__custom-icon">
                                            <input type="text" className={`form__input ${validPriceClass}`} onChange={handlePriceChange} name="ltn__name" placeholder="Price in $ (only numbers)" autoComplete='off' />
                                        </div>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <div className="btn-wrapper text-center mt-30">
                                    <button
                                        disabled={!canSave}
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
