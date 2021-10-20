import React from 'react';
import axios, * as others from 'axios';
import DisplayingPictures from "../imgResult/DisplayingPictures";
import classes from './Search.module.css'

class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            searchText: '',
            apiUrl: 'https://pixabay.com/api/',
            apiKey: '23946839-0d144e5a6c2f0db8655bce751',
            images: []
        }
    }

    onTextChange = (event) => {
        const val = event.target.value
        this.setState({searchText: val}, () => {
            if (val === '') {
                this.setState({images: []})
            } else {
                axios.get(`${this.state.apiUrl}/?key=${this.state.apiKey}&q=${this.state.searchText}&image_type:photo&
            safesearch=true`).then(res => this.setState({images: res.data.hits})).catch(error => console.log(error));
            }

        });
    };

    render() {
        console.log(this.state.images)
        return (
            <div className={classes.wrap}>
                <input
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}

                />
                {this.state.images.length > 0 ? (<DisplayingPictures images={this.state.images}/>) :
                    <div>Nothing to show</div>}

            </div>
        )
    }
}


export default Search;