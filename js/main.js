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