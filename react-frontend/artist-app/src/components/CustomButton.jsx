import React from 'react'

function CustomButton ({ description, onClick}){
  return (
    <button className="CustomButton" onClick={onClick}>{description}</button>
  )
}

export default CustomButton;