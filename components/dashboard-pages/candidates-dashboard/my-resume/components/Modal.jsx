"use client";

import React from "react";
import { formatDate } from "@/utils/convert-function";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

function Modal({ label, data, onChange, onChangeDate, onSave, onClose }) {
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
                    value={data.industry || ""}
                    onChange={onChange}
                    name="industry"
                    placeholder="Job title, e.g., Senior UI/UX Designer"
                  />
                </div>

                {/* <!-- Input --> */}
                <div className="form-group col-12">
                  <label>Business</label>
                  <input
                    type="text"
                    value={data.business || ""}
                    name="business"
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
          <button onClick={onSave} className="btn btn-primary">
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
