let phoneNav = document.querySelector('.navlinksForPhone');
let navlinksForPhoneBox = document.querySelector('.navlinksForPhoneBox');

phoneNav.addEventListener('click',()=>{
    let nav1 = document.querySelector('.navS1');
    let nav2 = document.querySelector('.navS2');
    let nav3 = document.querySelector('.navS3');

    nav1.classList.toggle('disNone');
    nav2.classList.toggle('rotate45');
    nav3.classList.toggle('rotate-45');
    
    let navlinksForPhoneBox = document.querySelector('.navlinksForPhoneBox');
    navlinksForPhoneBox.classList.toggle('disFlex');
})


// log in modal

{
    let signButton = document.querySelector('#signin');
    let loginModal = document.querySelector('.loginModal');
    let loginCloser = document.querySelector('#closeL');

    signButton.addEventListener('click',()=>{
        loginModal.style.display="block";
    });
    loginCloser.addEventListener('click',()=>{
        loginModal.style.display="none";
    })
        
    // window.onclick = function (event){
    //     if (event.target == loginModal) {
            
    //         loginModal.style.display="none";
    //     }
    // }
}
// var firebase
// var ref = firebase.database().ref('players');
// console.log(ref)

{
    let x = document.getElementById("demo");
    function getLocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPosition);
    } else {
        x.innerHTML = "Geolocation is not supported by this browser.";
    }
    }

    function showPosition(position) {
    x.innerHTML = "Latitude: " + position.coords.latitude +
    "<br>Longitude: " + position.coords.longitude;
    }
}