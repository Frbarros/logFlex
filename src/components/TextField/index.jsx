import { ContainerTextField } from "./styles";

export default function TextField({Obligatory, ...props}){
    return(
        <ContainerTextField>
            <p>{props.title}{Obligatory && <p style={{color: 'red'}}> *</p>}</p>
            <input {...props}></input>
            <div className="erro-container">
            {props.menssage && (
                    <p
                      className='error'
                      tabIndex={35}
                      role="alert"
                      aria-live="assertive"
                      showPasswordIcon
                    >
                      {props.menssage}
                    </p>
            )}

            </div>
           
            
        </ContainerTextField>
    )
}