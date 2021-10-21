import React from 'react';
import axios, * as others from 'axios';
import DisplayingPictures from "../imgResult/DisplayingPictures";
import classes from './Search.module.css'
import SelectField from 'material-ui/SelectField';
import MenuItem from 'material-ui/MenuItem';
import TextField from 'material-ui/TextField';

const LAST_SEARCH_KEY = 'lastSearch'


class Search extends React.Component {

    constructor(props) {
        super(props)
        this.state = {
            amount: 15,
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
                }&image_type=photo&per_page=${this.state.amount}&safesearch=true`
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
    onAmountChange = (e, index, value) => this.setState({ amount: value })
    render() {
        return (
            <div className={classes.wrap}>
                <input
                    name="searchText"
                    value={this.state.searchText}
                    onChange={this.onTextChange}
                />
                <br />
                <SelectField
                    name="amount"
                    value={this.state.amount}
                    onChange={this.onAmountChange}
                >
                    <MenuItem value={5} primaryText="5" />
                    <MenuItem value={10} primaryText="10" />
                    <MenuItem value={15} primaryText="15" />
                    <MenuItem value={30} primaryText="30" />
                    <MenuItem value={50} primaryText="50" />
                </SelectField>
                <br />
                {this.state.images.length > 0 ? (<DisplayingPictures images={this.state.images}/>) :
                    <div>Nothing to show</div>}
            </div>
        )
    }
}

export default Search;