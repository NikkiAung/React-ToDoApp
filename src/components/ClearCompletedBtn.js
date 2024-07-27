import React from 'react'

const ClearCompletedBtn = ({clearTodo}) => {
  return (
    <div>
        <div>
            <button className="button" onClick={clearTodo}>Clear completed</button>
        </div>
    </div>
  )
}

export default ClearCompletedBtn
