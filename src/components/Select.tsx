import React from "react";

import "./select.css"
// todo use for file list
export default ({value, onChange, title = "", id=""}) => {

    const onChangeSelect =(e)=> {

    }
    return (
        <div className="select-editable">
        <select 
        onChange={onChangeSelect}
        // onChange="this.nextElementSibling.value=this.value"
        >
            <option value=""></option>
            <option value="115x175 mm">115x175 mm</option>
            <option value="120x160 mm">120x160 mm</option>
            <option value="120x287 mm">120x287 mm</option>
        </select>
        <input type="text" name="format" value=""/>
        </div>
    )
}