import React from "react";

let styles = {
    backgroundColor: "#20315A",
    color: "white"
}
const Header = props => (
    <div className="jumbotron" style={styles}>
        <h1 className="text-center"><strong><i className="fa fa-newspaper-o"></i> New York Times Search</strong></h1>
    </div>
);

export default Header;
