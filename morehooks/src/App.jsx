import { useReducer, useRef } from "react";
import "./App.css";

function reducerFn(state, action){
  if (action.type === "Add-item" ){
    return [...state, {text:action.payload , Hidden: false}];
  }else if (action.type === "mappedArr"){
    return [...action.payload]
  }else{
    return state;
  }
}

function App(){
  const [state, dispatch] = useReducer(reducerFn, [])
  const nam = useRef();

  const Toggle = (data) =>{
    let FullArr = state.map((element ,i)=>{
      if (i === data){
        return {
          text: element.text,
          Hidden: !element.Hidden,
        }
      }else{
        return element;
      }
    })
    dispatch({
      type:"mappedArr",
      payload: FullArr,
    })
  }
  return (
    <div>

      <div>
        <input type="text" 
        ref={nam} 
        onKeyDown={(e)=>{
          if (e.key == "Enter"){
            dispatch({
              type:"Add-item",
              payload: e.target.value
            })
          }
        }}
        />
      </div>

      <div>
        {state.map(function(element,i){
          return (
            <div key={i} id="all">
              <h3>{element.Hidden==true? "Text is Hidden": element.text}</h3>
              <button onClick={()=>{
                Toggle(i)
              }}> Toggle </button>
            </div>
          )
        })}
      </div>
      
      <div>
        <button className="btn" onClick={() => { nam.current.focus() }}> {' '} Get Back Writing </button>
      </div>

    </div>
  )
}
export default App;