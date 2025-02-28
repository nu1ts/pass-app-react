import React from 'react';
import SearchInput from '../../components/search/SearchInput';
import { useInput } from '../../hooks/useInput';
import './index.scss';
const UsersPage = () => {
    const search = useInput('', {});
    return (
        <>
            <div className='users-page'>
                <div className='inner-wrapper'>
                    <div className='search-filter'>
                        {/* <SearchInput
                            value={search.value}
                            onChange={(e) => {
                                search.onChange(e);
                            }}
                        /> */}
                    </div>
                    <div className='users-wrapper'></div>
                </div>
            </div>
        </>
    );
};

export default UsersPage;
