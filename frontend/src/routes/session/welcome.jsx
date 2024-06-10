import './session.css'
import Login from '../../components/login/login'

function Welcome(props) {

  const {propsObject} = props; 
  console.log(propsObject);  
  const title = propsObject.title === null? 'Welcome' : `Welcome to ${propsObject.title}`;
  return (
    <>
    <div className='align-items-center'>
      <p className='view-title text-center'>{title}</p>
    </div>
    </>
  )
}
export default Welcome