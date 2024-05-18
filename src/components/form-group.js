import React from "react";

const  FormGroup = (props)=> {
    return(
        <div className="form-group">
            <label htmlFor={props.htmlfor}>{props.label}</label>
            {props.children}
        </div>
    )
}

export default FormGroup;