import React, { useState, useEffect } from "react";
// import logo from "./logo.svg";
import "./App.css";
import ImageUpload from './Imageupload';

import Post from './Post';
import { db, auth } from './firebase';

import { Button, Input } from '@material-ui/core'
import './login.css';



// function getModalStyle() {
//     const top = 50;
//     const left = 50;

//     return {
//         top: `${top}%`,
//         left: `${left}%`,
//         transform: `translate(-${top}%, -${left}%)`,
//     };
// }

// const useStyles = makeStyles((theme) => ({
//     paper: {
//         position: 'absolute',
//         width: 400,
//         backgroundColor: theme.palette.background.paper,
//         border: '2px solid #000',
//         boxShadow: theme.shadows[5],
//         padding: theme.spacing(2, 4, 3),
//     },
// }));


function Authentication({ setModel, getModel, getUser, setUser, getUsername, setUsername, email, setEmail, getPassword, setPassword, signIn, signUp }) {

    const swapSignUpModel = () => {
        setModel("container sign-up-mode");

        console.log("contianer sign-up-mode");
    };

    const swapSignInModel = () => {
        setModel("container");
        console.log("contianer");
    };


    return (
        <div className={getModel}>
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
                                value={getPassword}
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
                                value={getUsername}
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
                                value={getPassword}
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
                        <button className="btn transparent" onClick={swapSignUpModel}>
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
                        <button className="btn transparent" onClick={swapSignInModel}>
                            Sign in
                            </button>
                    </div>
                    <img src="./register.svg" className="image" alt="" />
                </div>
            </div>
        </div>
    );
}

function App() {

    // const [openSignUp, setOpenSignUp] = useState(false);
    // const [openSignIn, setOpenSignIn] = useState(false);

    const [classModel, setClassModel] = useState('container');

    const [user, setUser] = useState(null)
    const [posts, setPost] = useState([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');



    // const classes = useStyles();
    // const [modalStyle] = useState(getModalStyle);

    useEffect(() => {
        // console.log(this.props.location.state.user);
        db.collection('posts').orderBy('timestamp', 'desc').onSnapshot(snapshot => {
            setPost(snapshot.docs.map(doc => ({
                id: doc.id,
                post: doc.data()
            })));
        })
    }, []);

    useEffect(() => {
        const unSubcribe = auth.onAuthStateChanged((authUser) => {
            if (authUser) {
                console.log(authUser);
                setUser(authUser);

            } else {
                setUser(null);
            }
        })

        return () => {
            unSubcribe();
        }
    }, [user, username]);

    const signUp = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(email, password)
            .then((authUser) => {
                return authUser.user.updateProfile({
                    displayName: username,
                });
            })
            .catch((error) => alert(error.message));
        // setOpenSignUp(false);
    }

    const signIn = (event) => {
        event.preventDefault();

        auth.signInWithEmailAndPassword(email, password)
            .catch((error) => alert(error.message));

        // setUser(auth);
        // console.log(auth.user.displayName);

        // setOpenSignIn(false);
    }

    return (
        <div>
        {!user ?
            (
                <Authentication setModel={setClassModel} getModel={classModel} getUser={user} setUser={setUser} getUsername={username} setUsername={setUsername} email={email} setEmail={setEmail} getPassword={password} setPassword={setPassword} signIn={signIn} signUp={signUp}
                />
            )
            :
            (
                <div className="app__header">
                    <img
                        className="app__headerImage"
                        src="https://www.instagram.com/static/images/web/mobile_nav_type_logo.png/735145cfe0a4.png"
                        alt=""
                    />
                    <div className="menuBar">
                        {user ?
                            (<Button type="button" onClick={() => auth.signOut()}>Logout</Button>)
                            : (
                                <Authentication classModel={classModel} user={user} email={email} password={password} username={username} />
                            )}
                    </div>
                </div>
            )}
        {user? (
            <div>
                < ImageUpload username={user.displayName} />
            <div className="app_posts">
                {posts.map(({id,post}) => (
                   <Post pID={id} username={post.username} user={user?.displayName} caption={post.caption} imageURL={post.imageUrl} /> 
                ))}
            </div>
            </div>
        ):(<h3>Login ?</h3>)}

    </div >
    );
}

export default App;



// {
//     auth ? ()
//                                     }
// {
//     
// }


                            //      </div >) : (<div></div>)
                            //  }



//         <div className="app" >
//         {user ?
//             (<Button type="button" onClick={() => auth.signOut()}>Logout</Button>)
//             : (
//                 <Authentication setModel={setClassModel} getModel={classModel} getUser={user} setUser={setUser} getUsername={username} setUsername={setUsername} email={email} setEmail={setEmail} getPassword={password} setPassword={setPassword} signIn={signIn} signUp={signUp}
//                 />
//             )}

//         {auth ? (

//         ):(

//         )}



//     </div>