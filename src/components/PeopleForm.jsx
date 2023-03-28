import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

import "./PeopleForm.css";

function PeopleForm() {
  const [formData, setFormData] = useState({
    praenomens: [""],
    cognomen: "",
    number: "",
    street: "",
    city: "",
    state: "",
    zip: "",
  });

  const navigate = useNavigate();

  const resetState = () => {
    setFormData({
      praenomens: [""],
      cognomen: "",
      number: "",
      street: "",
      city: "",
      state: "",
      zip: "",
    });
  };

  const { praenomens, cognomen, number, street, city, state, zip } = formData;

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/api/v1/people", formData);
    resetState();
    navigate("/list");
  };

  return (
    <form onSubmit={onSubmit} className="people-form">
      <h1>Create</h1>
      <input
        type="text"
        className="people-input"
        name="praenomens"
        id="praenomens"
        value={praenomens}
        onChange={onChange}
        placeholder="Praenomens"
        required
      />
      <input
        type="text"
        className="people-input"
        name="cognomen"
        id="cognomen"
        value={cognomen}
        onChange={onChange}
        placeholder="Cognomen"
        required
      />
      <input
        type="text"
        className="people-input"
        name="number"
        id="number"
        value={number}
        onChange={onChange}
        placeholder="Number"
        required
      />
      <input
        type="text"
        className="people-input"
        name="street"
        id="street"
        value={street}
        onChange={onChange}
        placeholder="Street"
        required
      />

      <input
        type="text"
        className="people-input"
        name="city"
        id="city"
        value={city}
        onChange={onChange}
        placeholder="City"
        required
      />

      <input
        type="text"
        className="people-input"
        name="state"
        id="state"
        value={state}
        onChange={onChange}
        placeholder="State"
        required
      />

      <input
        type="text"
        className="people-input"
        name="zip"
        id="zip"
        value={zip}
        onChange={onChange}
        placeholder="Zip"
        required
      />
      <button className="people-btn">Submit</button>
    </form>
  );
}

export default PeopleForm;
