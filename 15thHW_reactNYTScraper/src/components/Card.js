import React from "react";

const Card = props => (
    <div className={`card text-${props.align?props.align:"center"}`}>
        {props.heading ? (
            <div className="card-header">
                <h2>{props.heading}</h2>
            </div>) : null}

            <div className="card-body">{props.children}</div>
        </div>
    );

    export default Card;
