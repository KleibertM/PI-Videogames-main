import { Link } from "react-router-dom"

const CreateUser = ()=>{
    return(
        <div>
        <form >
        <label htmlFor=""> Name:
             <input type="text" 
             placeholder="Name"/>
         </label>
         <label htmlFor=""> Email:
             <input type="mail" 
             placeholder="Email"/>
         </label>
         <label htmlFor=""> Password:
             <input type="password"
             placeholder="Password"/>
         </label>

         <button type="submit" >Register</button>
            
        </form>
     </div>
    )
}

export default CreateUser