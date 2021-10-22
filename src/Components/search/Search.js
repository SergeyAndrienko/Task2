import React from 'react';
import axios, * as others from 'axios';
import DisplayingPictures from "../imgResult/DisplayingPictures";
import classes from './Search.module.css'

const LAST_SEARCH_KEY = 'lastSearch'


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 9,
            searchText: this.getSearchTextValue(),
            apiUrl: 'https://pixabay.com/api/',
            apiKey: '23946839-0d144e5a6c2f0db8655bce751',
            images: []

        }
    }

    getSearchTextValue = () => {
        const lastSearch = localStorage.getItem(LAST_SEARCH_KEY)
        return this.isSearchInputValid(lastSearch) ? lastSearch : '';
    }

    componentDidMount() {
        this.fetchImages()
    }

    fetchImages = () => {
        if (this.isSearchInputValid(this.state.searchText)) {
            axios.get(
                `${this.state.apiUrl}/?key=${this.state.apiKey}&q=${
                    this.state.searchText
                }&image_type=photo&per_page=${this.state.amount}`
            )
                .then(res => this.setState({ images: res.data.hits }))
                .catch(err => console.log(err));
        } else {
            this.setState({images: []})
        }

    }
    isSearchInputValid = (str) => {
        return !(!str || /^\s*$/.test(str))
    }

    onTextChange = (event) => {
        const val = event.target.value;
        this.setState({searchText: val}, () => {
            localStorage.setItem(LAST_SEARCH_KEY, this.state.searchText);
            this.fetchImages()
        });
    };
    onAmountChange = () => {this.setState({ amount: this.state.amount + 9 }, ()=>{
        this.fetchImages()
    })
        }
    render() {
        return (
            <div className={classes.wrap}>
                <div>
                <input
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                />
                    {this.state.images.length > 0 ? (<div><DisplayingPictures images={this.state.images}/>  <button className={classes.btn} onClick={()=>this.onAmountChange(this.state.amount)}>More</button></div> ) :
                    <div>Nothing to show</div>}
                </div>

            </div>

        )
    }
}

export default Search;