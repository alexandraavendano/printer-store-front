import {BsSearch} from "react-icons/all";
import React from "react";

export function SearchBar(props){
    return(
        <div className="input-group">
            <div className="input-group rounded">
                <input
                    type="search"
                    className="form-control rounded"
                    placeholder="Search"
                    aria-label="Search"
                    aria-describedby="search-addon"
                    value={props.query}
                    onChange={ (e) => props.setQuery(e.target.value)}/>
                <span className="input-group-text border-0" id="search-addon"> <BsSearch size={15}/> </span>
            </div>
        </div>
    )
}