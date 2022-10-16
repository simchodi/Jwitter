import React, { useState } from "react";
import { authService } from "firebaseConfig";

const Auth = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [newAccount, setNewAccount] = useState(true);
    const onChange = (e) => {
        const {target:{name, value}} = e;
        console.log(value);
        if(name==="email"){
            setEmail(value);
        }else if(name==="password"){
            setPassword(value);
        }
    }
    const onSubmit = async (e) => {
        try{
            e.preventDefault();
            let data;
            if(newAccount){
                // create Account
                console.log("new Account!");
                data = await authService.createUserWithEmailAndPassword(email, password);
            }else{
                // log in
                console.log("not new Account! Just Login");
                data = await authService.signInWithEmailAndPassword(email, password);
            }
            console.log(data);
        }catch(e){
            console.log(e);
        }
    }
    return(
        <div>
            <form action="" onSubmit={onSubmit}>
                <input type="text" name="email" placeholder="email" value={email} onChange={onChange} required/>
                <input type="password" name="password" placeholder="password" value={password} onChange={onChange} required/>
                <input type="submit" value={newAccount ? "Create New Account" : "Log In"} />
            </form>
            <div>
                <button>Continue with Goolge</button>
                <button>Continue with Github</button>
            </div>
        </div>
    )
}
export default Auth;