import { useModel } from "@umijs/max";

export default ()=>{
  const { initialState, setInitialState } = useModel('@@initialState');
  console.log(initialState);
  return (
    <div style={{width:100,height:100,backgroundColor:'black'}}>
      dawdadad
    </div>
  )
}