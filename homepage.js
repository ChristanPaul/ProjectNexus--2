import { initializeApp } from "https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js";
import{getAuth,onAuthStateChanged,signOut} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-auth.js"
import{getFirestore,getDoc,doc} from "https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"

 // Your web app's Firebase configuration
 const firebaseConfig = {
    apiKey: "AIzaSyDPyyflYWckIcD9ppifSelEFuTIHMqUyMc",
    authDomain: "signup-b6bc8.firebaseapp.com",
    projectId: "signup-b6bc8",
    storageBucket: "signup-b6bc8.appspot.com",
    messagingSenderId: "635479951947",
    appId: "1:635479951947:web:7d1fd1406a09787356dbce"
  };
 
  // Initialize Firebase
  const app = initializeApp(firebaseConfig);

  const auth=getAuth();
  const db=getFirestore();

  onAuthStateChanged(auth, (user)=>{
    const loggedInUserId=localStorage.getItem('loggedInUserId');
    if(loggedInUserId){
        console.log(user);
        const docRef = doc(db, "users", loggedInUserId);
        getDoc(docRef)
        .then((docSnap)=>{
            if(docSnap.exists()){
                const userData=docSnap.data();
                document.getElementById('loggedUserFName').innerText=userData.firstName;
                document.getElementById('loggedUserEmail').innerText=userData.email;
                document.getElementById('loggedUserLName').innerText=userData.lastName;

            }
            else{
                console.log("no document found matching id")
            }
        })
        .catch((error)=>{
            console.log("Error getting document");
        })
    }
    else{
        console.log("User Id not Found in Local storage")
    }
  })

  const logoutButton=document.getElementById('logout');

  logoutButton.addEventListener('click',()=>{
    localStorage.removeItem('loggedInUserId');
    signOut(auth)
    .then(()=>{
        window.location.href='foodie.html';
    })
    .catch((error)=>{
        console.error('Error Signing out:', error);
    })
  })