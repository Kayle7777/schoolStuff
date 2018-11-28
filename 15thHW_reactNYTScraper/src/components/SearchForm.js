import React from "react";

const SearchForm = props => {
    return (
        <form onSubmit={props.handleFormSubmit}>
            <div className="form-group text-left">
                <label htmlFor="search">{props.header}</label>
                <input
                    onChange={props.handleInputChange}
                    name={props.name}
                    type="text"
                    className="form-control"
                    placeholder={props.placeholder}
                    id={props.id}
                />
                {props.final ? <br /> : null}
                {props.final ? <input type="submit" value="Submit" className="btn btn-primary" /> : <br />}
            </div>
        </form>
    );
}

export default SearchForm;
