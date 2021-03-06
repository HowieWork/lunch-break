import { useRef } from 'react';

import classes from './FilterForm.module.css';

const FilterForm = (props) => {
  const yearInputRef = useRef();
  const monthInputRef = useRef();

  const submitHanlder = (event) => {
    event.preventDefault();

    const year = yearInputRef.current.value;
    const month = monthInputRef.current.value;

    props.onFilter(year, month);

    yearInputRef.current.value = '';
    monthInputRef.current.value = '';

    // OPTIONAL: SHOULD CLOSE SIDE DRAWER OR NOT
    props.closeSideDrawer && props.closeSideDrawer();
  };

  return (
    <form onSubmit={submitHanlder} className={classes.form}>
      <div className={classes.control}>
        <label htmlFor='year'>Year</label>
        <select id='year' ref={yearInputRef} defaultValue='' required>
          <option value='' disabled hidden>
            Year
          </option>
          <option value='2020'>2020</option>
          <option value='2021'>2021</option>
          <option value='2022'>2022</option>
        </select>
      </div>
      <div className={classes.control}>
        <label htmlFor='month'>Month</label>
        <select id='month' ref={monthInputRef} defaultValue='' required>
          <option value='' disabled hidden>
            Month
          </option>
          <option value='1'>January</option>
          <option value='2'>February</option>
          <option value='3'>March</option>
          <option value='4'>April</option>
          <option value='5'>May</option>
          <option value='6'>June</option>
          <option value='7'>July</option>
          <option value='8'>August</option>
          <option value='9'>September</option>
          <option value='10'>October</option>
          <option value='11'>Novemeber</option>
          <option value='12'>December</option>
        </select>
      </div>
      <div className={classes.control}>
        <label className='opacity-zero'>HIDE</label>
        <button>Find</button>
      </div>
    </form>
  );
};

export default FilterForm;
