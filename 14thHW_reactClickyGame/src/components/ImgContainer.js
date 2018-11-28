import React from 'react';
import {Card} from './';
export const ImgContainer = ({image, onClick, id}) => (
    <Card>
        <button onClick={onClick}><img id={id} alt="" src={image}/></button>
    </Card>
)
