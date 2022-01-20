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

    // OPTIONAL: SHOULD CLOSE SIDE DRAWER OR NOT
    props.closeSideDrawer && props.closeSideDrawer();
  };

  return (
    <form onSubmit={submitHanlder} className={classes.form}>
      <div className={classes.subcontainer}>
        <label htmlFor='keyword'></label>
        <input
          ref={keywordInputRef}
          type='text'
          id='keyword'
          placeholder='Search blog'
          required
        />
        <button>
          <MdOutlineSearch />
        </button>
      </div>
      {props.error && <div className={classes.error}>{props.error}</div>}
    </form>
  );
};

export default SearchForm;
