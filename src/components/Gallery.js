import React from 'react';
// import {FormGroup, FormControl,InputGroup, Glyphicon} from 'react-bootstrap';

export default class Gallery extends React.Component{
    render(){
        return (
            <div>
            {
                this.props.items && this.props.items.map((item , i) => {
                    let {title, imageLinks , infoLink} = item.volumeInfo
                    return (
                        <a href={infoLink}
                            target="_blank"
                            rel="noopener noreferrer"
                            key={i} className = "book">
                            
                            {/*eslint-disable-next-line*/} 
                            <img src ={imageLinks !== undefined ? imageLinks.thumbnail : ''} 
                                alt = "book image"
                                className = "bookImage"
                            />
                            <div className = "titleText">{title }</div>
                        </a>
                        
                    );
                })
            }</div>

        );
    }
}