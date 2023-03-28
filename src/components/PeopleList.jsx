import React, { Fragment, useEffect, useState } from "react";
import axios from "axios";
import Person from "./Person";

import "./PeopleList.css";

function PeopleList(props) {
  const [peopleList, setPeopleList] = useState([]);
  const [toggle, setToggle] = useState(false);
  const [page, setPage] = useState(0);
  const [size, setSize] = useState(3);
  const [totalPages, setTotalPages] = useState(0);
  const [searchTerm, setSearchTerm] = useState("");

  const url = searchTerm
    ? `http://localhost:8080/api/v1/people`
    : `http://localhost:8080/api/v1/people?page=${page}&size=${size}`;

  const setToggleHelper = () => {
    setToggle(!toggle);
  };

  useEffect(() => {
    async function getData() {
      const res = await axios.get(url);
      const data = res.data;
      setPeopleList(data.content);
      setTotalPages(data.totalPages);
    }
    getData();
  }, [url, toggle]);

  const pageChangeHandler = (e, newPage) => {
    setPage(newPage);
  };

  const pageSizeChangeHandler = (e) => {
    setSize(parseInt(e.target.value, 10));
    setPage(0);
  };

  const handleSearchInputChange = (e) => {
    setSearchTerm(e.target.value);
    setPage(0);
  };

  const filteredPeopleList = peopleList.filter((person) => {
    const params = `${person.personalName.givenNames[0].value} ${person.personalName.surname.value} ${person.address.number} ${person.address.street} ${person.address.city} ${person.address.state} ${person.address.zip}`;
    return params.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i);

  const clearSearchInput = () => {
    setSearchTerm("");
  };

  return (
    <>
      <div className="subHeader">
        <div className="pagination">
          Show{" "}
          <select value={size} onChange={pageSizeChangeHandler}>
            <option value={3}>3</option>
            <option value={5}>5</option>
            <option value={10}>10</option>
          </select>{" "}
          People
        </div>
        <div className="search">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={handleSearchInputChange}
          />
          <button className="clear-button" onClick={clearSearchInput}>
            Clear
          </button>
        </div>
      </div>
      {filteredPeopleList.map((person) => {
        return (
          <Person
            key={person.id}
            id={person.id}
            firstName={person.personalName.givenNames[0].value}
            lastName={person.personalName.surname.value}
            address={person.address}
            setToggleHelper={setToggleHelper}
          />
        );
      })}
      <div className="paginationNumber">
        <button
          disabled={page === 0}
          onClick={(e) => pageChangeHandler(e, page - 1)}
        >
          Prev
        </button>
        {pageNumbers.map((pageNumber) => (
          <p
            key={pageNumber}
            className={pageNumber === page ? "active number" : "number"}
            onClick={
              pageNumber !== page
                ? (e) => pageChangeHandler(e, pageNumber)
                : null
            }
          >
            {pageNumber + 1}
          </p>
        ))}
        <button
          disabled={page === totalPages - 1}
          onClick={(e) => pageChangeHandler(e, page + 1)}
        >
          Next
        </button>
      </div>
    </>
  );
}

export default PeopleList;
