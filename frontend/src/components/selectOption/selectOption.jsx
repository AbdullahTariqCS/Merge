import React, { useState, useRef} from 'react';
import '../../assets/theme.css'
import './selectOption.css'
function Select({list, position, onSelectValue}) {

  const [filteredList, setFilteredList] = useState(list);

  const onUpdate = () => {
    const newList =  list.filter((item) => item.toLowerCase().includes(inputRef.current.value.toLowerCase()));
    setFilteredList(newList);
  }
  const inputRef = useRef(null);
  const onSubmit = (e) => {
    e.preventDefault(); 
    console.log('onSubit');
    if(filteredList.length == 0)
      return 
    onSelectValue(filteredList[0]);
  } 
  
  const style = position === undefined ? {position: 'inherit'} : {top: position.y + 'px', left: position.x + 'px'};
  return (
    <div className='m-primary select m-background-dark' style={style}>
      <form onSubmit={onSubmit}>
        <input ref={inputRef} type="text" autoFocus autoComplete='off' className="select-input" onChange={() => onUpdate()} />
      </form>

      <div className='select-list'>
        <ul className='pl-0'>
          {filteredList.map((option) => {
            return (<li className='select-list-item m-secondary' onClick={() => onSelectValue(option)}>{option}</li>)
          })}
        </ul>

      </div>
    </div>
  );
}

export default Select;
