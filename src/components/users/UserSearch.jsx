import { useState, useContext } from 'react';
import GithubContext from '../../context/github/GithubContext';
import AlertContext from '../../context/alert/AlertContext';
import { searchUsers, clearUsers } from '../../context/github/GithubActions';

function UserSearch() {
    const [text, setText] = useState('');

    const { users, dispatch } = useContext(GithubContext);
    const { setAlert } = useContext(AlertContext);

    const onChange = (e) => setText(e.target.value);
    const onSubmit = async (e) => {
        e.preventDefault();
        if (text === '') {
            setAlert('Please enter something', 'error');
        } else {
            dispatch({ type: 'SET_LOADING' });
            const users = await searchUsers(text);
            dispatch({ type: 'FETCH_USERS', payload: users });
            setText('');
        }
    };

    return (
        <div className='grid grid-cols-1 xl:grid-cols-2 lg:grid-cols-2 md:grid-cols-2 mb-8 gap-8'>
            <div>
                <form className='form-control' onSubmit={onSubmit}>
                    <div className='relative'>
                        <input
                            type='text'
                            className='w-full pr-40 bg-gray-200 input input-lg text-black'
                            placeholder='Search Users'
                            value={text}
                            onChange={onChange}
                        />
                        <button
                            className='absolute right-0 top-0 round-l-none w-36 btn btn-lg'
                            type='submit'>
                            Search
                        </button>
                    </div>
                </form>
            </div>
            {users.length > 0 && (
                <div>
                    <button
                        className='btn btn-ghost btn-lg'
                        onClick={() => dispatch({ type: 'CLEAR_USERS' })}>
                        Clear
                    </button>
                </div>
            )}
        </div>
    );
}

export default UserSearch;
