import React from "react";

export default ({value, onChange, title = ""}) => {

    return (
    <div style={{display:"flex", gap: 3}}>
        {title && <span>{title}</span>}
        <input value={value} onChange={e=> onChange(e.target.value)}/>
    </div>
    )
}