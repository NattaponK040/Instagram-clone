import React, { useEffect, useState } from "react";
import { auth } from './firebase';
import './login.css';

function Authen() {

    const [classModel, setClassModel] = useState('container');
    const [user, setUser] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');


    const swapSignUpModel = () => {
       setClassModel("container sign-up-mode");
    };

    const swapSignInModel = () => {
        setClassModel("container");
    };

    useEffect(() => {
        const unSubcribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser);

            }
            else {
                setUser(null);
            }
        });

        return () => {
            unSubcribe();
        };
    }, [user, username]);

    const signUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            }).catch((error) => alert(error.message));

        this.setState = ({
            password: "",
            user: null,
            username: "",
        });
        swapSignInModel();
    };

    const signIn = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .then((homePage) => { }
            )
            .catch((error) => alert(error.message));
    };

    return (
        <div className={classModel}>
            <div className="forms-container">
                <div className="signin-signup">
                    <form className="sign-in-form">
                        <h2 className="title">Sign in</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn solid" type="submit" onClick={signIn}>Sign Up</button>

                    </form>
                    <form className="sign-up-form">
                        <h2 className="title">Sign up</h2>
                        <div className="input-field">
                            <i className="fas fa-user"></i>
                            <input
                                type="text"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-envelope"></i>
                            <input
                                type="text"
                                placeholder="Email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)} />
                        </div>
                        <div className="input-field">
                            <i className="fas fa-lock"></i>
                            <input
                                type="password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)} />
                        </div>
                        <button className="btn solid" type="submit" onClick={signUp}>Sign Up</button>

                    </form>
                </div>
            </div>

            <div className="panels-container">
                <div className="panel left-panel">
                    <div className="content">
                        <h3>New here ?</h3>
                        <p>
                            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Debitis,
                            ex ratione. Aliquid!
                            </p>
                        <button className="btn transparent" onClick={swapSignUpModel()}>
                            Sign up
                            </button>
                    </div>
                    <img src="./log.svg" className="image" alt="" />
                </div>
                <div className="panel right-panel">
                    <div className="content">
                        <h3>One of us ?</h3>
                        <p>
                            Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum
                            laboriosam ad deleniti.
                            </p>
                        <button className="btn transparent" onClick={swapSignInModel()}>
                            Sign in
                            </button>
                    </div>
                    <img src="./register.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );
}


export default Authen;
// export default Authntication;