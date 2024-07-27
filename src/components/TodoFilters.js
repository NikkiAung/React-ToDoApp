import React, { useEffect, useState } from 'react'

const TodoFilters = ({filterFunc}) => {
  const [filter, setFilter] = useState('All');
  useEffect(() => {
    filterFunc(filter);
  }, [filter, filterFunc])
  return (
    <div>
        <div>
            <button className={`button filter-button ${filter === 'All' ? 'filter-button-active' : ''}`} onClick={() =>  setFilter('All')}>
              All
            </button>
            <button className={`button filter-button ${filter === 'Active' ? 'filter-button-active' : ''}`} onClick={() => setFilter('Active')}>Active</button>
            <button className={`button filter-button ${filter === 'Completed' ? 'filter-button-active' : ''}`} onClick={() => setFilter('Completed')}>Completed</button>
        </div>
    </div>
  )
}

export default TodoFilters
