import React, { Component } from 'react';
import './SearchBox.css';
import store from '../../redux/store';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }

    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        const apiKey = 'c8945d44';
        fetch(`https://www.omdbapi.com/?s=${this.state.searchLine}&apikey=${apiKey}`)
            .then(res => res.json())
            .then(data => {
                if (data.Search) {
                    store.dispatch({
                        type: 'SET_MOVIES',
                        payload: data.Search
                    });
                }
            })
            .catch(err => console.log(err));
    }

    render() {
        const { searchLine } = this.state;
        return (
            <div className="search-box">
                <form className="search-box__form" onSubmit={this.searchBoxSubmitHandler}>
                    <label className="search-box__form-label">
                        Filmi adına görə axtarın:
                        <input
                            value={searchLine}
                            type="text"
                            className="search-box__form-input"
                            placeholder="Məsələn, Godfather"
                            onChange={this.searchLineChangeHandler}
                        />
                    </label>
                    <button
                        type="submit"
                        className="search-box__form-submit"
                        disabled={!searchLine}
                    >
                        Axtar
                    </button>
                </form>
            </div>
        );
    }
}

export default SearchBox;