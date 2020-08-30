import React, { useState } from 'react';

import { Button } from '@material-ui/core';
import { storage, db } from './firebase';
import firebase from "firebase";

import './imageUpload.css';

function Imageupload({username}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);
    const [progress, setProgress] = useState(0);
    // const [url, setUrl] = useState('');


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0]);
        }
    };

    const handdleUpload = (e) => {
        const uploadTask = storage.ref('images/'+image.name).put(image);

        uploadTask.on(
            "state_changed", (snapshot) => {
                const progress = Math.round(
                    (snapshot.bytesTransferred / snapshot.totalBytes) * 100
                );
                setProgress(progress);
            },
            (error) => {
                console.log(error);
                alert(error);
            }, () => {
                storage.ref("images")
                    .child(image.name)
                    .getDownloadURL()
                    .then(url=>{
                        db.collection("posts").add({
                            timestamp:firebase.firestore.FieldValue.serverTimestamp(),
                            caption:caption,
                            imageUrl:url,
                            username:username  
                        });
                        setProgress(0);
                        setCaption('');
                        setImage(null);
                    });
            }
        )
    };


    return (
        <div className="imageupload">
            <progress
                className="imageupload__progress"
                value={progress}
                max="100"
                
            >

            </progress>
            <textarea
                type="text"
                placeholder='Enter a caption ...'
                value={caption}
                onChange={event => setCaption(event.target.value)}
            ></textarea>
            <input
                type="file"
                onChange={handleChange}
            />
            <Button
                onClick={handdleUpload}
            >
                Upload
            </Button>
        </div>
    )
}

export default Imageupload
