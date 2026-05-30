import React, { Component } from 'react';
import { connect } from 'react-redux';
import './SearchBox.css';

class SearchBox extends Component {
    state = {
        searchLine: ''
    }

    searchLineChangeHandler = (e) => {
        this.setState({ searchLine: e.target.value });
    }

    searchBoxSubmitHandler = (e) => {
        e.preventDefault();
        fetch(`https://www.omdbapi.com/?s=${this.state.searchLine}&apikey=c8945d44`)
            .then(res => res.json())
            .then(data => {
                if (data.Search) {
                    this.props.setMovies(data.Search);
                } else {
                    alert("Film tapılmadı!");
                }
            })
            .catch(err => console.error(err));
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

const mapDispatchToProps = (dispatch) => ({
    setMovies: (movies) => dispatch({ type: 'SET_MOVIES', payload: movies })
});

export default connect(null, mapDispatchToProps)(SearchBox);