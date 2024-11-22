import { useState } from 'react'
import './App.css'

    interface PropsMessage {
        title : string;
        message  : string ;
        messageMouse : string;
    }
  const  ClickCounter = ({title,message,messageMouse}: PropsMessage) => {
    const [count, setCount] = useState(0)
    const [isOver,setIsOver] = useState(false);

    return (
      <>
            <div className="card">
                <h1>{title}</h1>
                {isOver ?  <p>{messageMouse}</p> : null}
                <button
                 onClick={() => setCount((count) => count + 1)}
                 onMouseEnter={()=> setIsOver(true)}
                 onMouseLeave={()=> setIsOver(false)}
                 >
                count is {count}
                </button >
                {count>=10 ? <p>{message}</p> :null}  
            </div>
       
      </>
    );
  };
export default ClickCounter ; 