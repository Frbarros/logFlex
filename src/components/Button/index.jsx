
import { Container } from './styles';

export default function Button(props) {
    const {width, height} = props

    const buttonStyle = {
        width:width || 'auto', 
        height:height || 'auto',
    }


    return (



        <Container>
            <button disabled={props.disabled} className='btn' style={buttonStyle} {...props} type="submit">{props.title}</button>
        </Container>
    )
}