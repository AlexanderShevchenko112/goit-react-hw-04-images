import { useState } from 'react';
import PropTypes from 'prop-types';
import css from 'components/searchbar/Searchbar.module.css';
import { FaSearch } from 'react-icons/fa';
const Searchbar = ({ onSubmit }) => {
  const [query, setQuery] = useState('');

  const handleInputChange = event => {
    setQuery(event.target.value);
  };

  const handleSubmit = event => {
    event.preventDefault();
    if (query.trim() === '') {
      return;
    }
    onSubmit(query.trim());
    setQuery('');
  };

  return (
    <header className={css.searchbar}>
      <form className={css.searchForm} onSubmit={handleSubmit}>
        <button className={css.searchFormBtn} type="submit">
          <FaSearch />
        </button>

        <input
          className={css.searchFormInput}
          type="text"
          placeholder="Search images and photos"
          value={query}
          onChange={handleInputChange}
        />
      </form>
    </header>
  );
};

export default Searchbar;

Searchbar.propTypes = {
  onSubmit: PropTypes.func.isRequired,
};
