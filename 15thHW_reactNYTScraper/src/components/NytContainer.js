import React, { Component } from "react";
import Container from "./Container";
import Row from "./Row";
import Col from "./Col";
import Card from "./Card";
import Header from "./Header";
import SearchForm from "./SearchForm";
import ArticleDetail from "./ArticleDetail";
import API from "../utils/API";

class NytContainer extends Component {
    state = {
        result: {},
        searchTerm: "",
        numRecords: 5,
        startYear: false,
        endYear: false,
        typingTimeout: 0
    };

    searchArticles = query => {
        return API.search(query);
    };

    handleInputChange = (event) => {
        let {id, value} = event.target;
        let {typingTimeout} = this.state;
        switch (id) {
            case "numRecords": {
                value = parseInt(value)
                if (!value) {
                    value = 5;
                }
                break;
            }
            case "endYear":
            case "startYear": {
                if (value.length !== 4 || !parseInt(value) || value === "") {
                    value = false;
                }
                break;
            }
            default: {
                break;
            }
        }
        if (typingTimeout) {
            clearTimeout(this.state.typingTimeout);
        };
        this.setState({
            [id]: value,
            typingTimeout: setTimeout(()=>{
                this.handleFormSubmit(event, true);
            }, 500)
        });
    }

    handleFormSubmit = async (event, fast = false) => {
        let {startYear, endYear, numRecords, searchTerm, typingTimeout} = this.state;
        if (typingTimeout) {
            clearTimeout(typingTimeout);
        };
        if (!fast) {
            event.preventDefault();
        };
        searchTerm = searchTerm===""?"Washington Post":searchTerm;
        let query = `?q=${searchTerm}${startYear?"?begin_date=" + startYear:""}${endYear?"?end_date=" + endYear:""}`;
        let data;
        try {
            data = await this.searchArticles(query)
        } catch (error) {
            console.log(error);
            return;
        }
        this.setState( { result: data ? data.data.response.docs.slice(0, numRecords): {}} );
    }

    render() {
        return (
            <Container>
                <Row>
                    <Col size="md-12"><Header /></Col>
                    <Col size="md-4">
                        <Card heading="Search">
                            <SearchForm
                                value={this.state.searchTerm}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                header="Article search query:"
                                placeholder="ex: Washington Post"
                                id="searchTerm"
                            />
                            <SearchForm
                                value={this.state.numRecords}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                header="Limit by number of records:"
                                placeholder="Leave blank for Default 5"
                                id="numRecords"
                            />
                            <SearchForm
                                value={this.state.startYear}
                                default={false}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                header="Limit search by start year:"
                                placeholder="Leave blank for none"
                                id="startYear"
                            />
                            <SearchForm
                                value={this.state.endYear}
                                default={false}
                                handleInputChange={this.handleInputChange}
                                handleFormSubmit={this.handleFormSubmit}
                                header="Limit search by end year:"
                                placeholder="Leave blank for none"
                                id="endYear"
                                final={true}
                            />
                        </Card>
                    </Col>
                    <Col size="md-8">
                        <ArticleDetail
                            data={this.state.result?this.state.result:false}
                        />
                    </Col>
                </Row>
            </Container>
        );
    }
}

export default NytContainer;
