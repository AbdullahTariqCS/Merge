import React, { useState, useRef } from 'react';
import '../../assets/theme.css'
import './selectOption.css'
function Select({ list, position, onSelectValue }) {

  const [filteredList, setFilteredList] = useState([...list, 'clear']);

  const onUpdate = () => {
    const newList = list.filter((item) => item.toLowerCase().includes(inputRef.current.value.toLowerCase()));
    setFilteredList([...newList, 'clear']);
  }
  const inputRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault();
    console.log('onSubit');
    if (filteredList.length == 0)
      return
    if (filteredList[0] === 'clear') {
      onSelectValue('');
      return;
    }
    onSelectValue(filteredList[0]);
  }

  const style = position === undefined ? { position: 'inherit' } : { top: position.y + 'px', left: position.x + 'px' };
  return (
    <div className='m-primary select m-background-dark' style={style}>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" autoFocus autoComplete='off' className="select-input" onChange={() => onUpdate()} />
      </form>

      <div className='select-list'>
        <ul className='pl-0'>
          {filteredList.map((option) => {
            return (<li className='select-list-item m-secondary' style={option === 'clear' ? { color: '#fa6262' } : {}}
              onClick={() => option === 'clear' ? onSelectValue('') : onSelectValue(option)}>{option}</li>)
          })}
        </ul>

      </div>
    </div>
  );
}

export default Select;
