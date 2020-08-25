let phoneNav = document.querySelector('.navlinksForPhone');
phoneNav.addEventListener('click',()=>{
    let nav1 = document.querySelector('.navS1');
    let nav2 = document.querySelector('.navS2');
    let nav3 = document.querySelector('.navS3');

    nav1.classList.toggle('disNone');
    nav2.classList.toggle('rotate45');
    nav3.classList.toggle('rotate-45');
    
})