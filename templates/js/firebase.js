 // Your web app's Firebase configuration
 var firebaseConfig = {
    apiKey: "AIzaSyBvjmjsX3MiTZHsfzGJgPL3qmc2CfH-RtQ",
    authDomain: "capstone-99276.firebaseapp.com",
    databaseURL: "https://capstone-99276.firebaseio.com",
    projectId: "capstone-99276",
    storageBucket: "capstone-99276.appspot.com",
    messagingSenderId: "760139438417",
    appId: "1:760139438417:web:3bb80198d614f00d399b70",
    measurementId: "G-70QGBZ5JY6"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);
  firebase.analytics();

  const db = firebase.firestore();

  const allcontacts = document.querySelector('.allContacts');

  //create element and render contacts

//   <div class="oneArt">
//       <h3>NdagijimanaSeba</h3>
//       <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Odio laboriosam eum optio quaerat? Dignissimos cupiditate qui aliquam sapiente doloribus, ducimus explicabo, debitis recusandae iure dolore tenetur sit placeat velit quis.</p>
//       <footer>
//           <a href="mailto:ndase15ba@gmail.com" class="artEdit">Mail Me</a>
//           <a href="" class="artDel">Delete</a>
//       </footer>
//   </div>
  function renderContacts(doc) {
      let coverDiv = document.createElement('div');
      let conth3    = document.createElement('h3');
      let messageP    = document.createElement('p');
      let messageF    = document.createElement('footer');
      let mailButton    = document.createElement('a');
      let delButton    = document.createElement('a');

      coverDiv.setAttribute('data-id', doc.id);
      coverDiv.setAttribute('class', 'oneArt');
      mailButton.setAttribute('href','mailto:'+ doc.data().email);
      mailButton.setAttribute('class','artEdit');
      mailButton.textContent = "Mail me";
      delButton.setAttribute('class','artDel');
      delButton.textContent = 'Delete';
      conth3.textContent = doc.data().firstName;
      messageP.textContent = doc.data().message;

      messageF.appendChild(mailButton);
      messageF.appendChild(delButton);
      coverDiv.appendChild(conth3);
      coverDiv.appendChild(messageP);
      coverDiv.appendChild(messageF);

      allcontacts.appendChild(coverDiv);
  }

  db.collection('contacts').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        renderContacts(doc)
    })
  })