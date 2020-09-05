        // Your web app's Firebase configuration
        var firebaseConfig = {
            apiKey: "AIzaSyDh25jXvYwoKsni_B-5OGhQHv5-8oleKFM",
            authDomain: "portifolio-eb3fa.firebaseapp.com",
            databaseURL: "https://portifolio-eb3fa.firebaseio.com",
            projectId: "portifolio-eb3fa",
            storageBucket: "portifolio-eb3fa.appspot.com",
            messagingSenderId: "669619955074",
            appId: "1:669619955074:web:fc74591609a845f4bb9b9b",
            measurementId: "G-QM0HQJPGWJ"
        };
        // Initialize Firebase
        firebase.initializeApp(firebaseConfig);
        firebase.analytics();
        var userRef = firebase.database().ref('users/');
        // authorRef.set({
        //     horrible:"sebastien",
        //     love: {
        //         amanda: "novel",
        //         Rick: "beautiful"
        //     },
        //     unwanted: {
        //         hello: "world",
        //         print: "hi",
        //         nestedObj: {
        //             important: "to me",
        //             notImportant: "to others"
        //         }
        //     }
        // })