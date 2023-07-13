import './App.css';
import { FaUserAlt } from "react-icons/fa";
import Input from './components/Input';
function App() {
  
  const handleSubmit=(e)=>{
    e.preventDefault()
  }
  return (
    <div className="App">
      <div className='login_container'>
        <div>
          <h1 className='sign_up'><FaUserAlt className='sing_up_icon'/><span className='sign_up_text'>Sign Up</span></h1>
        <form onSubmit={handleSubmit}>
          <Input/>
          {/* <button>11</button> */}
        </form>
        </div>
      </div>
    </div>
  );
}

export default App;
