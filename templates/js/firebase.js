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

  db.collection('contacts').get().then((snapshot)=>{
    snapshot.docs.forEach(doc =>{
        console.log(doc.data())
    })
  })