import React from "react";

const SelectMenu = (props) =>{
    const options = props.listas.map((option,index) =>{
        return (
            <option key={index} value={option.valor}>{option.label}</option>
        )
    })
    return (
        <select {...props}>
            {options}
        </select>
    )
}
export default SelectMenu;