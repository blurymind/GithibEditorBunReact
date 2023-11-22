import React, { useRef } from "react";

// import "./select.css"
// todo use for file list
export default ({value, values, onChange, title = "", id}) => {
    const onChangeSelect =(e)=> {
        console.log({e})
        onChange(e.target.value)
    }
    return (
        <div className="select-editable">
             {title}
            <input list={id} name={id} value={value} onChange={onChangeSelect} onPointerDown={()=> onChange("")}/>
            <datalist id={id}>
                <option value=""/>
                {values?.map(value=> <option value={value}/>)}
            </datalist>  
        </div>
    )
}