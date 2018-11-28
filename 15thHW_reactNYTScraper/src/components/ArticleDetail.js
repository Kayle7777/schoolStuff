import React from "react";
import Card from "./Card.js";

const ArticleDetail = props => {
    let docs;
    let tr = Object.keys(props.data).length === 0
    if (!tr) {
        docs = props.data.map(article=> {
            const { headline, snippet, web_url, _id } = article;
            return (
                <Card
                    key={_id}
                    heading={false}
                    align="left"
                >
                    <div>
                        <h2>{headline.main}</h2>
                        <p>{snippet}</p>
                        <button className="btn btn-primary"><a className="text-danger font-weight-bold" href={web_url}>Link</a></button>
                    </div>
                </Card>
            )
        })
    }
    return (
        <Card
            key="nytHeading"
            heading="New York Times Articles"
        >
        {docs}
        </Card>
        )
}
export default ArticleDetail;
