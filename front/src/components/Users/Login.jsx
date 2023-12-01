import { useEffect, useState } from "react";
import { useNavigate } from 'react-router-dom';
import CreateUser from "./CreateUser";
const LoginUSer = () => {
    const [access, setAccess] = useState(false)
    const [userData, setUserData]= useState({
        email: '',
        password: ''
    })

    const navigate = useNavigate();
    // const location = useLocation()

    const [errors, setErrors] = useState({})

    const regexEmail2 = /\S+@\S+\.\S+/;
    const validate = ()=>{
        if(regexEmail2.test(userData.email)){
            setErrors('')
        } else {
            setErrors("Please enter a valid email")
        }
        if (!userData.password) {
            setErrors('Write the password.')
        }
    }

    useEffect(()=>{
        validate()
    }, [userData])


    const login = async (userData) => {
        try {
            const { email, password } = userData;
            const URL = 'http://localhost:3001/user/';
            const responde = await axios(URL + `?email=${email}&password=${password}`)
            const data = responde.data;
            if (data) {
                const { access } = data;
                setAccess(access);
            };
        } catch (error) {
            throw Error(error.message)
        }
    }
    return (
        <div>
            <form onSubmit={login}>
                <label htmlFor=""> Email:
                    <input type="mail"
                        placeholder="Email" />
                </label>
                <label htmlFor=""> Password:
                    <input type="password"
                        placeholder="Password" />
                </label>

                <button type="submit" >Login</button>
            </form>
                <p>Register</p>
            <div>
                <CreateUser />
            </div>
        </div>
    )
}

export default LoginUSer