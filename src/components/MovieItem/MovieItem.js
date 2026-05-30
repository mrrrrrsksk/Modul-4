import React, { Component } from 'react';
import { connect } from 'react-redux';
import './MovieItem.css';

class MovieItem extends Component {
    render() {
        const { Title, Year, Poster, imdbID, addMovie, favorites } = this.props;
        const isFavorite = favorites.find(m => m.imdbID === imdbID);

        return (
            <article className="movie-item">
                <img className="movie-item__poster" src={Poster} alt={Title} />
                <div className="movie-item__info">
                    <h3 className="movie-item__title">{Title} ({Year})</h3>
                    <button 
                        type="button" 
                        className="movie-item__add-button"
                        onClick={() => addMovie({ Title, Year, imdbID })}
                        disabled={isFavorite}
                    >
                        {isFavorite ? 'Siyahıdadır' : 'Siyahıya əlavə et'}
                    </button>
                </div>
            </article>
        );
    }
}

const mapStateToProps = (state) => ({
    favorites: state.favorites
});

const mapDispatchToProps = (dispatch) => ({
    addMovie: (movie) => dispatch({ type: 'ADD_TO_FAVORITES', payload: movie })
});

export default connect(mapStateToProps, mapDispatchToProps)(MovieItem);