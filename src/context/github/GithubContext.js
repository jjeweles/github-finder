import { createContext, useReducer } from 'react';
import githubReducer from './GithubReducer';

const GithubContext = createContext();

export const GithubProvider = ({ children }) => {
    const initialState = {
        users: [],
        user: {},
        repos: [],
        loading: false,
    };

    const [state, dispatch] = useReducer(githubReducer, initialState);

    // get initial users for testing
    // const fetchUsers = async () => {
    //     setLoading();

    //     const res = await fetch(`${GITHUB_URL}/users`, {
    //         headers: {
    //             Authorization: `token ${GITHUB_TOKEN}`,
    //         },
    //     });
    //     const data = await res.json();
    //     dispatch({
    //         type: 'FETCH_USERS',
    //         payload: data,
    //     });
    // };

    // const clearUsers = () => {
    //     dispatch({
    //         type: 'CLEAR_USERS',
    //     });
    // };

    // set loading moved to actions
    // const setLoading = () => dispatch({ type: 'SET_LOADING' });

    return (
        <GithubContext.Provider
            value={{
                ...state,
                dispatch,
            }}>
            {children}
        </GithubContext.Provider>
    );
};

export default GithubContext;
