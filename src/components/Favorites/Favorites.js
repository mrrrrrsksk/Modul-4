import React, { Component } from 'react';
import store from '../../redux/store';
import './Favorites.css';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

class Favorites extends Component {
    state = {
        title: 'Yeni Siyahı',
        listId: null,
        isSaved: false
    }

    handleTitleChange = (e) => {
        this.setState({ title: e.target.value });
    }

    saveListHandler = () => {
        const movieIds = this.props.favorites.map(m => m.imdbID);
        
        fetch('https://acb-api.algoritmika.org/api/movies/list', {
            method: 'POST',
            headers: { 'Content-type': 'application/json' },
            body: JSON.stringify({
                title: this.state.title,
                movies: movieIds
            })
        })
        .then(res => res.json())
        .then(data => {
            this.setState({ listId: data.id, isSaved: true });
        });
    }

    render() {
        return (
            <div className="favorites">
                <input 
                    value={this.state.title} 
                    className="favorites__name" 
                    onChange={this.handleTitleChange}
                    disabled={this.state.isSaved}
                />
                <ul className="favorites__list">
                    {this.props.favorites.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                {item.Title} ({item.Year})
                                <button onClick={() => this.props.removeMovie(item.imdbID)} disabled={this.state.isSaved}>X</button>
                            </li>
                        );
                    })}
                </ul>
                
                {!this.state.isSaved ? (
                    <button 
                        type="button" 
                        className="favorites__save"
                        onClick={this.saveListHandler}
                        disabled={this.props.favorites.length === 0}
                    >
                        Siyahını yadda saxla
                    </button>
                ) : (
                    <Link to={`/list/${this.state.listId}`} target="_blank">Siyahıya keçid</Link>
                )}
            </div>
        );
    }
}

const mapStateToProps = (state) => ({ favorites: state.favorites });
const mapDispatchToProps = (dispatch) => ({
    removeMovie: (id) => dispatch({ type: 'REMOVE_FROM_FAVORITES', payload: id })
});

export default connect(mapStateToProps, mapDispatchToProps)(Favorites);