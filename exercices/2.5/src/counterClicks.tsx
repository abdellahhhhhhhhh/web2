import { useState } from 'react'
import './App.css'

    interface PropsMessage {
        title : string;
        message  : string ;
    }
  const  ClickCounter = ({title,message}: PropsMessage) => {
    const [count, setCount] = useState(0)

    return (
      <>
            <div className="card">
                <h1>{title}</h1>
                <button onClick={() => setCount((count) => count + 1)}>
                count is {count}
                </button>
                {count>=10 ? <p>{message}</p> :null}  
            </div>
       
      </>
    );
  };
export default ClickCounter ; 