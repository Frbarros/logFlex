import { useState } from "react";
import { ContainerTextField } from "./styles";
import InputMask from "react-input-mask"

export default function MaskInput(props){

    return(
        <ContainerTextField>
            <p>{props.title}</p>
            <InputMask {...props}/>
            <div className="erro-container">
            {props.message && (
                    <p
                      className='error'
                      tabIndex={35}
                      role="alert"
                      aria-live="assertive"
                    >
                      {props.message}
                    </p>
                  )}

            </div>
        </ContainerTextField>
    )
}