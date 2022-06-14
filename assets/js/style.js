// nav bar
let navBar = document.getElementById("navbar-icon");

let navOpen = document.getElementById("navOpen");
let closeIcon = document.getElementById("closeIcon");
let HideBanner = document.getElementById("bannerCondition");




navBar.addEventListener("click", function () {
    navOpen.classList.toggle("hidden");
});

closeIcon.addEventListener("click", function () {
    navOpen.classList.toggle("hidden");
});

// dark mode
const checkMoonClickIcon = document.getElementById("moonClickIcon");


function moonClickButton() {
    const themeData = document.documentElement.classList.toggle("dark");


    if (themeData) {
        checkMoonClickIcon.innerHTML = `<svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 12.79C20.8427 14.4922 20.2039 16.1144 19.1582 17.4668C18.1126 18.8192 16.7035 19.8458 15.0957 20.4265C13.4879 21.0073 11.748 21.1181 10.0795 20.7461C8.41101 20.3741 6.88299 19.5345 5.67422 18.3258C4.46545 17.117 3.62593 15.589 3.2539 13.9205C2.88187 12.252 2.99271 10.5121 3.57345 8.9043C4.1542 7.29651 5.18082 5.88737 6.53321 4.84175C7.88559 3.79614 9.50779 3.15731 11.21 3C10.2134 4.34827 9.73384 6.00945 9.85852 7.68141C9.98321 9.35338 10.7039 10.9251 11.8894 12.1106C13.0749 13.2961 14.6466 14.0168 16.3186 14.1415C17.9905 14.2662 19.6517 13.7866 21 12.79V12.79Z" stroke="black" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>`;

        window.localStorage.theme = "dark";
    } else {
        checkMoonClickIcon.innerHTML = `<svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21.5835 21.5833L23.3335 23.3333M14.0002 3.50001V2.33334V3.50001ZM14.0002 25.6667V24.5V25.6667ZM24.5002 14H25.6668H24.5002ZM2.3335 14H3.50016H2.3335ZM21.5835 6.41668L23.3335 4.66668L21.5835 6.41668ZM4.66683 23.3333L6.41683 21.5833L4.66683 23.3333ZM4.66683 4.66668L6.41683 6.41668L4.66683 4.66668Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
    <path d="M14.0002 18.6667C16.5775 18.6667 18.6668 16.5773 18.6668 14C18.6668 11.4227 16.5775 9.33334 14.0002 9.33334C11.4228 9.33334 9.3335 11.4227 9.3335 14C9.3335 16.5773 11.4228 18.6667 14.0002 18.6667Z" stroke="white" stroke-width="2" stroke-linecap="round"/>
    </svg>`;


        window.localStorage.theme = "light";
    }
};

//  Hide Banners footer and header

(function () {
    // footer banner
    if (!(window.localStorage.getItem("banner") === "hidden")) {
         HideBanner.classList.remove("hidden");
    } else {
        HideBanner.classList.add("hidden");
    }
})();

// call inside html accpet button onClick
function accpeptButton() {
    HideBanner.classList.add("hidden");
    window.localStorage.setItem("banner", "hidden");
}




// load comment
const commentSectionLoad=document.getElementById("loadCommentinFastest");
const checkClickonCommentLoad=document.getElementById("clickCommentButton");
if(checkClickonCommentLoad){
    checkClickonCommentLoad.addEventListener('click',() => {
              
    
        if( checkClickonCommentLoad.innerText==='Read comments'){
           
            checkClickonCommentLoad.innerText='Close comment';
        }else{
           
            checkClickonCommentLoad.innerText='Read comments';
        }
        commentSectionLoad.classList.toggle("hidden");
    }
)
}

// editor gallery
(function() {
    const images = document.querySelectorAll('.kg-gallery-image img');
    images.forEach(function (image) {
        const container = image.closest('.kg-gallery-image');
        const width = image.attributes.width.value;
        const height = image.attributes.height.value;
        const ratio = width / height;
        container.style.flex = ratio + ' 1 0%';
    })
})();

