"use client";

import React from "react";
import { formatDate } from "@/utils/convert-function";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { toast } from "react-toastify";

function Modal({ label, data, onChange, onChangeDate, onSave, onClose }) {
  // ------------------------------ Handle function ------------------------------
  const checkSubmit = () => {
    if (!data.title || !data.organization) {
      toast.error("Please fill in title and organization required fields.");
      return;
    }
    onSave();
  };

  // ------------------------------ Render UI------------------------------
  return (
    <div className="my-modal">
      <div className="my-modal-inner">
        <div className="my-modal-header">
          <h3>
            <strong>{label}</strong>
          </h3>
        </div>

        <div className="my-modal-content">
          <div className="my-modal-content-inner">
            <form action="#" className="default-form">
              <div className="row">
                {/* <!-- Input --> */}
                <div className="form-group col-12">
                  <label>Title</label>
                  <input
                    type="text"
                    value={data.title || ""}
                    onChange={onChange}
                    name="title"
                    placeholder="Job title, e.g., Senior UI/UX Designer"
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-12">
                  <label>Organization</label>
                  <input
                    type="text"
                    value={data.organization || ""}
                    name="organization"
                    onChange={onChange}
                    placeholder="Enterprise name, e.g., Google"
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                  <label style={{ width: "100%" }}>Start Time</label>
                  <DatePicker
                    label="Start Time"
                    selected={data.startTime ? new Date(data.startTime) : null}
                    placeholderText="Select start date"
                    onChange={(newValue) => onChangeDate("startTime", newValue)}
                    className="custom-datepicker"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onCalendarOpen={(e) => {
                      const input =
                        document.querySelector(".custom-datepicker");
                      if (input) {
                        input.scrollIntoView({
                          behavior: "smooth",
                          block: "start", // cuộn sao cho input nằm trên modal
                        });
                      }
                    }}
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-lg-6 col-md-12">
                  <label style={{ width: "100%" }}>End Time</label>
                  <DatePicker
                    label="Start Time"
                    selected={data.endTime ? new Date(data.endTime) : null}
                    placeholderText="Select end date"
                    onChange={(newValue) => onChangeDate("endTime", newValue)}
                    className="custom-datepicker"
                    showMonthDropdown
                    showYearDropdown
                    dropdownMode="select"
                    onCalendarOpen={(e) => {
                      const input =
                        document.querySelector(".custom-datepicker");
                      if (input) {
                        input.scrollIntoView({
                          behavior: "smooth",
                          block: "start", // cuộn sao cho input nằm trên modal
                        });
                      }
                    }}
                  />
                </div>

                {/* <!-- Textarea --> */}
                <div className="form-group col-lg-12 col-md-12">
                  <label>Description</label>
                  <textarea
                    name="text"
                    onChange={onChange}
                    value={data.text || ""}
                    placeholder="Enter your description about this!"
                  ></textarea>
                </div>
              </div>
            </form>
          </div>
        </div>

        <div className="my-modal-footer">
          <button onClick={checkSubmit} className="btn btn-primary">
            Save
          </button>
          <button onClick={onClose} className="btn btn-secondary">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default Modal;
