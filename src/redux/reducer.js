const initialState = {
    movies: [],
    favorites: []
};

function reducer(state = initialState, action) {
    switch (action.type) {
        case 'SET_MOVIES':
            return {
                ...state,
                movies: action.payload
            };

        case 'ADD_TO_FAVORITES':
            const movie = action.payload;
            const exists = state.favorites.find((m) => m.imdbID === movie.imdbID);
            if (exists) {
                return state;
            }
            return {
                ...state,
                favorites: [...state.favorites, movie]
            };

        case 'REMOVE_FROM_FAVORITES':
            return {
                ...state,
                favorites: state.favorites.filter((m) => m.imdbID !== action.payload)
            };

        default:
            return state;
    }
}

export default reducer;