import React, { useState } from "react";
import axios from "axios";

import "./Person.css";

function Person({ id, firstName, lastName, address, setToggleHelper }) {
  const [editState, setEditState] = useState(false);
  const [editFormData, setEditFormData] = useState({
    praenomens: [firstName],
    cognomen: lastName,
    number: address.number,
    street: address.street,
    city: address.city,
    state: address.state,
    zip: address.zip,
  });

  const { praenomens, cognomen, number, street, city, state, zip } =
    editFormData;

  const onChange = (e) => {
    if (e.target.name === "praenomens") {
      setEditFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value.split(),
      }));
    } else {
      setEditFormData((p) => ({
        ...p,
        [e.target.name]: e.target.value,
      }));
    }
  };

  const editStateHelper = () => {
    setEditState(!editState);
    setEditFormData({
      praenomens: [firstName],
      cognomen: lastName,
      number: address.number,
      street: address.street,
      city: address.city,
      state: address.state,
      zip: address.zip,
    });
  };

  const onSubmit = async (e, id) => {
    e.preventDefault();
    await axios.patch(
      `http://localhost:8080/api/v1/people/${id}`,
      editFormData
    );
    editStateHelper();
    setToggleHelper();
  };

  const deleteHandler = async (id) => {
    await axios.delete(`http://localhost:8080/api/v1/people/${id}`);
    setToggleHelper();
  };

  return (
    <div className="card">
      {!editState ? (
        <>
          <h3>
            {id}: {firstName} {lastName}
          </h3>
          <p>
            {address.number} {address.street}
          </p>
          <p>
            {address.city} {address.state} {address.zip}
          </p>
          <div>
            <button
              onClick={editStateHelper}
              className="btn"
              style={{ marginRight: "10px" }}
            >
              Edit
            </button>
            <button className="dngr" onClick={() => deleteHandler(id)}>
              Delete
            </button>
          </div>
        </>
      ) : (
        <form>
          <input
            type="text"
            name="praenomens"
            id="praenomens"
            value={praenomens}
            onChange={onChange}
            placeholder="Praenomens"
          />
          <input
            type="text"
            name="cognomen"
            id="cognomen"
            value={cognomen}
            onChange={onChange}
            placeholder="Cognomen"
          />
          <input
            type="text"
            name="number"
            id="number"
            value={number}
            onChange={onChange}
            placeholder="Number"
          />
          <input
            type="text"
            name="street"
            id="street"
            value={street}
            onChange={onChange}
            placeholder="street"
          />
          <input
            type="text"
            name="city"
            id="city"
            value={city}
            onChange={onChange}
            placeholder="city"
          />
          <input
            type="text"
            name="state"
            id="state"
            value={state}
            onChange={onChange}
            placeholder="State"
          />
          <input
            type="text"
            name="zip"
            id="zip"
            value={zip}
            onChange={onChange}
            placeholder="Zip"
          />
          <button className="btn" onClick={(e) => onSubmit(e, id)}>
            Submit Edit
          </button>
          <button className="dngr" onClick={() => editStateHelper()}>
            Cancel
          </button>
        </form>
      )}
    </div>
  );
}

export default Person;
