import React, { Component } from 'react';
import {Header, ImgContainer} from './components';
import {Col, Row, Container} from "./components/grid";
import API from "./utils/API";
import shuffle from 'shuffle-array';

class App extends Component {
    state = {
        score: 0,
        topScore: 0,
        guess: null,
        pics: [],
        alreadyGuessed: []
    };
    componentDidMount() {
        API.getImages(undefined, "50").then(data=> {
            data = data.data.data.filter((pic, i, pics)=>{
                let fHeight = pics[0].images.fixed_width_still.height;
                return pic.images.fixed_width_still.height === fHeight;
            });
            this.setState({pics: data})
        })
    };
    buttonClick(event) {
        event.preventDefault();
        let cont = true;
        const {id} = event.target;
        let {alreadyGuessed, score, topScore, pics, guess} = this.state;
        score++;
        score>topScore && topScore++;
        guess=true;
        for (let x of alreadyGuessed) {
            if (id === x) {
                cont = false;
                break;
            }
        }
        if (cont) {
            alreadyGuessed.push(id);
        } else {
            alreadyGuessed = [];
            score = 0;
            guess = false;
        }
        pics = shuffle(pics);
        this.setState({alreadyGuessed: alreadyGuessed, score: score, topScore: topScore, pics: pics, guess: guess});
    };
    render() {
        let {score, topScore, guess, alreadyGuessed, pics} = this.state;
        return (
            <div className="App">
                <Container fluid={true}>
                    <Header
                        score={score}
                        topScore={topScore}
                        guess={guess}
                    />
                </Container>
                <Container>
                    <Row>
                        {pics
                            .map(pic=>{
                                return (
                                    <Col size="3" key={pic.id}>
                                        <ImgContainer
                                            id={pic.id}
                                            image={pic.images.fixed_width_still.url}
                                            onClick={this.buttonClick.bind(this)}
                                            >

                                            </ImgContainer>
                                            <br/>
                                        </Col>
                                    )
                                })}
                            </Row>
                        </Container>
                    </div>
                );
            }
        }

        export default App;
