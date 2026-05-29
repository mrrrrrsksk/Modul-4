import React, { Component } from 'react';
import './ListPage.css';

class ListPage extends Component {
    state = {
        title: '',
        movies: []
    }

    componentDidMount() {
        const id = this.props.match.params.id;
        fetch(`https://acb-api.algoritmika.org/api/movies/list/${id}`)
            .then(res => res.json())
            .then(data => {
                this.setState({ title: data.title });
                data.movies.forEach(imdbID => {
                    fetch(`https://www.omdbapi.com/?i=${imdbID}&apikey=c8945d44`)
                        .then(res => res.json())
                        .then(movieData => {
                            this.setState({ movies: [...this.state.movies, movieData] });
                        });
                });
            });
    }

    render() {
        return (
            <div className="list-page">
                <h1 className="list-page__title">{this.state.title}</h1>
                <ul>
                    {this.state.movies.map((item) => {
                        return (
                            <li key={item.imdbID}>
                                <a href={`https://www.imdb.com/title/${item.imdbID}/`} target="_blank" rel="noopener noreferrer">
                                    {item.Title} ({item.Year})
                                </a>
                            </li>
                        );
                    })}
                </ul>
            </div>
        );
    }
}

export default ListPage;