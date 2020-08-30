import React, { useState, useEffect } from 'react';
import './post.css';
import Avatar from "@material-ui/core/Avatar";
import { db } from './firebase';
// import { Button } from '@material-ui/core';
import firebase from "firebase";

function Post({ pID, username, user, imageURL, caption }) {

    const [_comment, _setComment] = useState('');
    const [_comments, _setComments] = useState([]);


    useEffect(() => {
        let unsubscribe;
        console.log(pID);
        if (pID) {
            unsubscribe = db
                .collection('posts')
                .doc(pID)
                .collection('comments')
                .orderBy('timestamp')
                .onSnapshot((snapshot) => {
                    _setComments(snapshot.docs.map((doc) => doc.data()))
                });

        }
        return () => {
            unsubscribe();
        }
    }, [pID]);

    const postComment = (e) => {
        e.preventDefault();

        db.collection('posts').doc(pID).collection("comments").add({
            text: _comment,
            username: user,
            timestamp: firebase.firestore.FieldValue.serverTimestamp(),

        })

        _setComment('');

    };

    return (
        <div className="post">
            <div className="post__header">
                <Avatar
                    className="post__avatar"
                    alt={username}
                    src="/static/images/avatar/2.jpg"
                />
                <h3>{username}</h3>

            </div>

            <img className="post_image" src={imageURL} alt="" />
            <h4 className="post_text">
                <strong>
                    {username}
                </strong>
                {caption}
            </h4>
            <div className="post__comments">
                {_comments.map((ment) => (
                    <p>
                        <b>{ment.username} {ment.text} </b>
                    </p>
                ))}
            </div>

            <form className="post__commentbox">
                <input
                    type="text"
                    className="post__input"
                    placeholder="Add a comments"
                    value={_comment}
                    onChange={(e) => _setComment(e.target.value)}
                />

                <button
                    disabled={_comment === ''}
                    className="post__button"
                    type="submit"
                    onClick={postComment}
                >
                    Comment
                </button>
            </form>
        </div>
    )
}

export default Post
