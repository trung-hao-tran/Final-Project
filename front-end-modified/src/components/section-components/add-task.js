import React, { useDebugValue, useEffect, useState } from "react";
import { useAddNewTaskMutation } from "../../feature/tasks/tasksApiSlice";
import { useNavigate } from "react-router-dom";
import {
  useJsApiLoader,
  GoogleMap,
  Marker,
  Autocomplete,
} from "@react-google-maps/api";

const mapOptions = {
  componentRestrictions: { country: "au" },
};

const begin = { lat: -33.9175, lng: 151.2303 }; // UNSW coordinates
const libraries = ["places"];
const AddTask = () => {
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyAlmLd3YzM-XIYXoShEWcvTy6OhyJaDzb8",
    libraries: libraries,
  });

  const [addNewTask, { isLoading, isSuccess, isError, error }] =
    useAddNewTaskMutation();

  const today = new Date().toISOString().slice(0, 16);

  const navigate = useNavigate();
  const [searchResult, setSearchResult] = useState("");
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [media, setMedia] = useState([]);
  const [address, setAddress] = useState("");
  const [domainKnowledge, setDomainKnowledge] = useState([]);
  const [frequency, setFrequency] = useState("Daily");
  const [endTime, setEndTime] = useState("");
  const [startTime, setStartTime] = useState(today);
  const [price, setPrice] = useState("");
  const [map, setMap] = useState(/** @type google.maps.Map */ (null));
  const [currentPlace, setCurrentPlace] = useState(begin);

  const [validTitle, setValidTitle] = useState(false);
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [validDescription, setValidDescription] = useState(false);
  const [validMedia, setValidMedia] = useState(false);
  const [validAddress, setValidAddress] = useState(false);
  const [validDomainKnowledge, setValidDomainKnowledge] = useState(false);
  const [validEndTime, setValidEndTime] = useState(false);
  const [validStartTime, setValidStartTime] = useState(false);
  const [validPrice, setValidPrice] = useState(false);

  useEffect(() => {
    setValidTitle(title.length > 0);
  }, [title]);

  useEffect(() => {
    setValidDescription(description.length > 0);
  }, [description]);

  useEffect(() => {
    // Address validation (example: checking if it's not empty)
    setValidAddress(address.trim() !== "");
  }, [address]);

  useEffect(() => {
    // Check if at least one domain knowledge is selected
    setValidDomainKnowledge(domainKnowledge.length > 0);
  }, [domainKnowledge]);

  useEffect(() => {
    // Check if the endTime is a valid time (you can use a regular expression or a time library)
    setValidEndTime(
      new Date(endTime) instanceof Date && !isNaN(new Date(endTime))
    );
  }, [endTime]);

  useEffect(() => {
    // Check if the endTime is a valid time (you can use a regular expression or a time library)
    setValidStartTime(
      new Date(startTime) instanceof Date && !isNaN(new Date(startTime))
    );
  }, [startTime]);

  useEffect(() => {
    // Check if the price is a valid number
    setValidPrice(!isNaN(price) && parseFloat(price) >= 0); // Ensure it's a non-negative number
  }, [price]);

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handleAddressChange = (e) => {
    setAddress(e.target.value);

    console.log(e.target.value);
    console.log("isLoaded", isLoaded);
    if (isLoaded) {
      // Geocode the new address to get its coordinates
      const geocoder = new window.google.maps.Geocoder();
      geocoder.geocode({ address: address }, (results, status) => {
        if (status === "OK" && results.length > 0) {
          setCurrentPlace(results[0].geometry.location);

          // Update the map's center and set the zoom to 15
          if (map) {
            map.panTo(results[0].geometry.location);
            map.setZoom(15);
          }
        }
      });
    }
  };

  function onLoad(autocomplete) {
    setSearchResult(autocomplete);
  }

  function onPlaceChanged() {
    if (searchResult != null) {
      //variable to store the result
      const place = searchResult.getPlace();
      //variable to store the name from place details result
      const name = place.formatted_address;
      //variable to store the status from place details result
      if (isLoaded) {
        console.log(name);
        // Geocode the new address to get its coordinates
        const geocoder = new window.google.maps.Geocoder();
        geocoder.geocode({ address: name }, (results, status) => {
          if (status === "OK" && results.length > 0) {
            setCurrentPlace(results[0].geometry.location);

            // Update the map's center and set the zoom to 15
            if (map) {
              map.panTo(results[0].geometry.location);
              map.setZoom(15);
            }
          }
        });
      }
      setAddress(name);
    }
  }

  const handleFileChange = (e) => {
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
        setMedia(dataUrls);
        console.log(dataUrls);
      })
      .catch((error) => {
        console.error("Error converting files to Data URLs:", error);
      });

    setSelectedFiles(files);
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
    setFrequency(e.target.value);
  };

  const handleEndTimeChange = (e) => {
    setEndTime(e.target.value);
  };

  const handleStartTimeChange = (e) => {
    setStartTime(e.target.value);
  };

  const handlePriceChange = (e) => {
    setPrice(e.target.value);
  };

  useEffect(() => {
    if (isSuccess) {
      setTitle("");
      setDescription("");
      setAddress("");
      setDomainKnowledge([]);
      setStartTime("");
      setEndTime("");
      setMedia(null);
      setPrice("");
      setFrequency("None");
      navigate("/");
    }
  }, [isSuccess, navigate]);

  const canSave =
    [
      validTitle,
      validDescription,
      validAddress,
      validDomainKnowledge,
      validEndTime,
      validPrice,
      validStartTime,
    ].every(Boolean) && !isLoading;
  const onSubmitUserClicked = async (e) => {
    e.preventDefault();
    const frequency = e.target.frequency.value;
    if (canSave) {
      const time = {
        start: startTime,
        end: endTime,
      };
      await addNewTask({
        title,
        description,
        address,
        domain_knowledge: domainKnowledge,
        images: media,
        frequency,
        time,
        price,
      });
    }
  };

  const errClass = isError ? "errmsg" : "offscreen";

  const validTitleClass = validTitle ? "" : "form__input--incomplete";
  const validDescriptionClass = validDescription
    ? ""
    : "form__input--incomplete";
  const validAddressClass = validAddress ? "" : "form__input--incomplete";
  const validEndTimeClass = validEndTime ? "" : "form__input--incomplete";
  const validStartTimeClass = validStartTime ? "" : "form__input--incomplete";
  const validPriceClass = validPrice ? "" : "form__input--incomplete";

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
                        autoComplete="off"
                      />
                    </div>
                    <div className="input-item input-item-textarea ltn__custom-icon">
                      <textarea
                        className={`form__input ${validDescriptionClass}`}
                        name="ltn__message"
                        placeholder="*Description"
                        onChange={handleDescriptionChange}
                        autoComplete="off"
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
                      accept="image/*"
                      id="files"
                      name="filename"
                      multiple
                      className="btn theme-btn-3 mb-10"
                      onChange={handleFileChange}
                    />
                    <p>
                      <small>* Multiple uploads is allowed.</small>
                      <br />
                      <small>* PDF files upload supported as well.</small>
                      <br />
                      <small>* Images might take longer to be processed.</small>
                    </p>
                  </div>
                </div>

                {/* Section 3: Location */}
                <h2>3. Location</h2>
                <div className="row">
                  <div className="col-md-12">
                    <div className="input-item input-item-location-pin ltn__custom-icon ">
                      {isLoaded ? (
                        <Autocomplete
                          options={mapOptions}
                          onPlaceChanged={onPlaceChanged}
                          onLoad={onLoad}
                        >
                          <input
                            className={`form__input ${validAddressClass}`}
                            // onChange={handleAddressChange}
                            type="text"
                            name="address"
                            placeholder="*Address"
                          />
                        </Autocomplete>
                      ) : (
                        <input
                          className={`form__input ${validAddressClass}`}
                          onChange={handleAddressChange}
                          type="text"
                          name="address"
                          placeholder="*Address"
                        />
                      )}
                    </div>
                  </div>
                  <div className="col-lg-12">
                    <div className="property-details-google-map mb-60">
                      {isLoaded ? (
                        <GoogleMap
                          center={currentPlace}
                          zoom={15}
                          mapContainerStyle={{ width: "100%", height: "100%" }}
                          options={{
                            zoomControl: false,
                            streetViewControl: false,
                            mapTypeControl: false,
                            fullscreenControl: false,
                          }}
                          onLoad={(map) => setMap(map)}
                        >
                          <Marker position={currentPlace} />
                        </GoogleMap>
                      ) : (
                        <div>Map is loading</div>
                      )}
                    </div>
                  </div>
                </div>

                {/* Section 4: Domain Knowledge */}
                <h2>4. Domain Knowledge</h2>
                <h6>Select the Domain Knowledge Required for the Task</h6>
                <div className="row">
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      Mathematics
                      <input
                        type="checkbox"
                        name="domainKnowledge"
                        value="Mathematics"
                        onChange={handleDomainKnowledgeChange}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      Physics
                      <input
                        type="checkbox"
                        name="domainKnowledge"
                        value="Physics"
                        onChange={handleDomainKnowledgeChange}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      Chemistry
                      <input
                        type="checkbox"
                        name="domainKnowledge"
                        value="Chemistry"
                        onChange={handleDomainKnowledgeChange}
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      Biology
                      <input
                        onChange={handleDomainKnowledgeChange}
                        type="checkbox"
                        name="domainKnowledge"
                        value="Biology"
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      Computer Science
                      <input
                        onChange={handleDomainKnowledgeChange}
                        type="checkbox"
                        name="domainKnowledge"
                        value="Computer Science"
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      History
                      <input
                        onChange={handleDomainKnowledgeChange}
                        type="checkbox"
                        name="domainKnowledge"
                        value="History"
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      Languages
                      <input
                        onChange={handleDomainKnowledgeChange}
                        type="checkbox"
                        name="domainKnowledge"
                        value="Languages"
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      Economics
                      <input
                        onChange={handleDomainKnowledgeChange}
                        type="checkbox"
                        name="domainKnowledge"
                        value="Economics"
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                  <div className="col-lg-4 col-md-6">
                    <label className="checkbox-item">
                      Art and Design
                      <input
                        onChange={handleDomainKnowledgeChange}
                        type="checkbox"
                        name="domainKnowledge"
                        value="Art and Design"
                      />
                      <span className="checkmark" />
                    </label>
                  </div>
                </div>
                <br></br>

                {/* Section 6: EndTime */}
                <div className="row">
                  <h2>5. Time</h2>
                  <div className="col-lg-6">
                    <h6>Set the start time for the Task</h6>
                    <div className="input-item input-item-date ltn__custom-icon">
                      <input
                        className={`form__input ${validStartTimeClass}`}
                        onChange={handleStartTimeChange}
                        type="datetime-local"
                        name="startTime"
                        placeholder="startTime"
                        min={today}
                        defaultValue={today}
                      />
                    </div>
                  </div>
                  <div className="col-lg-6">
                    <h6>Set the end time for the Task</h6>
                    <div className="input-item input-item-date ltn__custom-icon">
                      <input
                        className={`form__input ${validEndTimeClass}`}
                        onChange={handleEndTimeChange}
                        type="datetime-local"
                        name="endTime"
                        placeholder="EndTime"
                        min={startTime}
                      />
                    </div>
                  </div>
                </div>

                {/* Section 6: Task Frequency */}
                <div className="row">
                  <div className="col-lg-6">
                    <h2>6. Task Frequency</h2>
                    <h6>Select the Task Frequency</h6>
                    <div className="input-item">
                      <select
                        className="nice-select"
                        onChange={handleFrequencyChange}
                        name="frequency"
                        defaultValue="Daily"
                      >
                        <option value="None" disabled>
                          Select One
                        </option>
                        <option value="Daily">Daily</option>
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
                      <input
                        type="text"
                        className={`form__input ${validPriceClass}`}
                        onChange={handlePriceChange}
                        name="ltn__name"
                        placeholder="Price in $ (only numbers)"
                        autoComplete="off"
                      />
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
