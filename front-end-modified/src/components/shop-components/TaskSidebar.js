import React, { useState, useEffect } from "react";

let currentFilter = {};

const Sidebar = () => {
  const [startPrice, setStartPrice] = useState("");
  const [endPrice, setEndPrice] = useState("");
  const [isAllTypeChecked, setIsAllTypeChecked] = useState(true);
  const [isAllDomainChecked, setIsAllDomainChecked] = useState(true);
  const [currentFilter, setCurrentFilter] = useState({
    taskTypes: [],
    domainKnowledge: [],
    startPrice: 0,
    endPrice: 0,
  });

  const handleStartPriceChange = (event) => {
    setStartPrice(event.target.value.replace(/\D/g, ""));
  };

  const handleEndPriceChange = (event) => {
    setEndPrice(event.target.value.replace(/\D/g, ""));
  };

  useEffect(() => {
    setCurrentFilter((prevFilter) => ({
      ...prevFilter,
      startPrice: startPrice !== "" ? parseInt(startPrice) : 0,
      endPrice: endPrice !== "" ? parseInt(endPrice) : 0,
    }));
  }, [startPrice, endPrice]);

  const handleCheckboxChange = (category, value) => {};

  console.log(currentFilter);

  return (
    <div className="col-lg-4  mb-100">
      <aside className="sidebar ltn__shop-sidebar">
        <h3 className="mb-10">Advance Filter</h3>
        <label className="mb-30">
          <small>Filter task that you desired </small>
        </label>
        {/* Advance Information widget */}
        <div className="widget ltn__menu-widget">
          <h4 className="ltn__widget-title">Task Type</h4>
          <ul>
            <li>
              <label className="checkbox-item">
                All types
                <input
                  type="checkbox"
                  name="taskTypes"
                  onChange={handleCheckboxChange("taskTypes", "All types")}
                />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Once time task
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange("taskTypes", "Once")}
                />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Daily Task
                <input type="checkbox" />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Weekly Task
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange("taskTypes", "Weekly")}
                />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Monthly Task
                <input type="checkbox" />
                <span
                  className="checkmark"
                  onChange={handleCheckboxChange("taskTypes", "Monthly")}
                />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Yearly Task
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange("taskTypes", "Yearly")}
                />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
          </ul>
          <hr />
          <h4 className="ltn__widget-title">Domain Knowledge</h4>
          <ul>
            <li>
              <label className="checkbox-item">
                All
                <input
                  type="checkbox"
                  name="domainKnowledge"
                  onChange={handleCheckboxChange(
                    "domainKnowledge",
                    "All types"
                  )}
                />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Mathematics
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange(
                    "domainKnowledge",
                    "Mathematics"
                  )}
                />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Physics
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange("domainKnowledge", "Physics")}
                />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Biology
                <input type="checkbox" />
                <span
                  className="checkmark"
                  onChange={handleCheckboxChange("domainKnowledge", "Biology")}
                />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Language
                <input type="checkbox" />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Computer Science
                <input
                  type="checkbox"
                  onChange={handleCheckboxChange(
                    "domainKnowledge",
                    "Computer Science"
                  )}
                />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Economics
                <input type="checkbox" />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Chemistry
                <input type="checkbox" />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                History
                <input type="checkbox" />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
            <li>
              <label className="checkbox-item">
                Art and Design
                <input type="checkbox" />
                <span className="checkmark" />
              </label>
              <span className="categorey-no"></span>
            </li>
          </ul>
          <hr />
          {/* Price Filter Widget with Input Fields */}
          <h4 className="ltn__widget-title ltn__widget-title-border---">
            Filter by price
          </h4>
          <div className="price_filter">
            <div className="price_slider_amount">
              <input
                type="text"
                className="amount"
                name="startPrice"
                placeholder="Start Price"
                value={startPrice}
                onChange={handleStartPriceChange}
              />

              <input
                type="text"
                className="amount"
                name="endPrice"
                placeholder="End Price"
                value={endPrice}
                onChange={handleEndPriceChange}
              />
            </div>
          </div>
          {/* <hr /> */}
        </div>
      </aside>
    </div>
  );
};

export default Sidebar;
