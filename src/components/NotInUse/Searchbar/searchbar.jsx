import React from "react";
import "./searchbar.css";

function Searchbar(props) {
  return (
    <form method="get" action="https://cse.google.com/cse/publicurl">
      <div className="d-flex searchbar">
        <input
          className="search_input"
          type="text"
          id="q"
          name="q"
          alt="Search Text"
          maxLength="256"
          placeholder="Search"
          autoComplete="off"
        />
        <input type="hidden" id="cx" name="cx" value={props.value} />
      </div>
    </form>
  );
}

export default Searchbar;
