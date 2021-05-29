import React, { useRef, useState } from 'react';

import {auth, firebaseRef, firestore, storage } from "./../../../firebase/utils"

import { useCollectionData } from 'react-firebase-hooks/firestore';


export const Messenger = () => {
  const dummy = useRef();
  const messagesRef = firestore.collection('messages');
  const [formValueMsg, setFormValueMsg] = useState('');//send text

  const [formValueImg, setFormValueImg] = useState('');//send img
  const query = messagesRef.orderBy('createdAt').limit(25);

  const [messages] = useCollectionData(query, { idField: 'id' });


  const [file, setFile] = useState(null);
  const [url, setURL] = useState("");

  function handleImage(e) {
    setFile(e.target.files[0]);
    setFormValueImg(e.target.files[0].name.toString()) //convert to string for db storage
  }


  const sendMessage = async (e) => { // sent to db
    e.preventDefault();
    
    const { uid, photoURL } = auth.currentUser;

    await messagesRef.add({
      text: formValueMsg,
      fileUrl: formValueImg,
      createdAt: firebaseRef.firestore.FieldValue.serverTimestamp(),
      uid,
      photoURL,
    })

    setFormValueMsg('');
    dummy.current.scrollIntoView({ behavior: 'smooth' });
  
  }

    const sendImage= (e)=> {//sent to storage
    sendMessage(e)
    e.preventDefault();
    setFormValueImg('');
    const uploadTask = storage.ref(`/images/${file.name}`).put(file);
    uploadTask.on("state_changed",
      snapshot =>{},
      error => {
        console.log(error);
      },
      () =>{
        storage
        .ref("images")
        .child(file.name)
        .getDownloadURL()
        .then(url => {
          console.log(url)
        })
      }

      );
  }

  //***what appears in chat from db from typing****
return (
  <div>
    <main>

      { messages && messages.map(msg => <ChatMessage key={msg.id} message={msg} />)}
      
      <span ref={dummy}></span> 

    </main>

    <form onSubmit={sendMessage}>

      <input value={formValueMsg} onChange={(e) => setFormValueMsg(e.target.value)} placeholder="say something" />

      <button type="submit" disabled={!formValueMsg}>Submit</button> 

  
    </form>

    <form onSubmit={sendImage}>
      
      <input type="file" onChange={handleImage} />
      <button type="submit" disabled={!formValueImg}>upload Image</button>
      
    </form>


  </div>
)}




const ChatMessage = (props) => { //pulls stored data into chat onload
  const { text, uid, photoURL,fileUrl } = props.message;

  const [url, setURL] = useState("");

  if (fileUrl){ // stops empty fileurl from passing through
  const pathReference = storage.ref(`/images/${fileUrl}`);
    pathReference.getDownloadURL()
    .then((url) => {
      setURL(url);
    })}
  
    



  const messageClass = uid === auth.currentUser.uid ? 'sent' : 'received';

  return (
    <div className={`message ${messageClass}`}>
      <img src={photoURL || 'https://api.adorable.io/avatars/23/abott@adorable.png'} />
      <p>{text}</p>
      <p>{<img src={url} alt=""/> }</p>
    </div>
  )
}

export default Messenger;

