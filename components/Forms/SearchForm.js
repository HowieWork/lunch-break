import { useRef } from 'react';
import { MdOutlineSearch } from 'react-icons/md';

import classes from './SearchForm.module.css';

const SearchForm = (props) => {
  const keywordInputRef = useRef();

  const submitHanlder = (event) => {
    event.preventDefault();

    const keyword = keywordInputRef.current.value;

    props.onSearch(keyword);

    keywordInputRef.current.value = '';
  };

  return (
    <form onSubmit={submitHanlder}>
      <label htmlFor='keyword'></label>
      <input
        ref={keywordInputRef}
        type='text'
        id='keyword'
        placeholder='Search blog'
        required
      />
      <button>
        <MdOutlineSearch size='1.6rem' />
      </button>
      {props.error && <div>{props.error}</div>}
    </form>
  );
};

export default SearchForm;
