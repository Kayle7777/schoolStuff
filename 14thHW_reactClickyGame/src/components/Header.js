import React from 'react';
import {Col, Row} from "./grid";
import "./Header.css";
let styles = {
    backgroundColor: "#20315A",
    color: "white"
}
export const Header = ({guess, score, topScore}) => (

    <div className="jumbotron" style={styles}>
        <Row>
            <Col size="4">
                <h2 className="text-center"><strong> Click Game</strong></h2>
            </Col>
            <Col size="4">
                <h2 className="text-center">{guess?"You guessed correctly!":"You guessed incorrectly."}</h2>
            </Col>
            <Col size="4">
                <h2 className="text-center">Score:{score} | Top Score:{topScore}</h2>
            </Col>
        </Row>
    </div>
);
