import React from 'react';
import { useGlobalContext } from '../context';

const SearchForm = ({ setSearchTerm }) => {
    // const { setSearchTerm } = useGlobalContext(); //i was thinking about useContext or Redux
    const searchValue = React.useRef('');
    const handleSubmit = (e) => {
        e.preventDefault();
    };
    const searchCocktail = () => {
        setSearchTerm(searchValue.current.value);
    };
    React.useEffect(() => {
        searchValue.current.focus();
    }, []);
    return (
        <section className="search">
            <form className="search-form" onSubmit={handleSubmit}>
                <div className="form-control">
                    <label htmlFor="name">search pokemon</label>
                    <input
                        type="text"
                        name="name"
                        id="name"
                        ref={searchValue}
                        onChange={searchCocktail}
                    />
                </div>
            </form>
        </section>
    );
};

export default SearchForm;
