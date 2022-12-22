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
        
        var themeToggleDarkIcon = document.getElementById('theme-toggle-dark-icon');
        var themeToggleLightIcon = document.getElementById('theme-toggle-light-icon');
        
        // Change the icons inside the button based on previous settings
        if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
            themeToggleLightIcon.classList.remove('hidden');
        } else {
            themeToggleDarkIcon.classList.remove('hidden');
        }
        
        var themeToggleBtn = document.getElementById('theme-toggle');
        
        themeToggleBtn.addEventListener('click', function() {
        
            // toggle icons inside button
            themeToggleDarkIcon.classList.toggle('hidden');
            themeToggleLightIcon.classList.toggle('hidden');
        
            // if set via local storage previously
            if (localStorage.getItem('color-theme')) {
                if (localStorage.getItem('color-theme') === 'light') {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                } else {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                }
        
            // if NOT set via local storage previously
            } else {
                if (document.documentElement.classList.contains('dark')) {
                    document.documentElement.classList.remove('dark');
                    localStorage.setItem('color-theme', 'light');
                } else {
                    document.documentElement.classList.add('dark');
                    localStorage.setItem('color-theme', 'dark');
                }
            }
            
        });
        
        
        
        //  Hide Banners footer and header
        
        (function () {
            // footer banner
            if (!(window.localStorage.getItem("banner") === "hidden")) {
                 HideBanner.classList.remove("hidden");
            } else {
                HideBanner.classList.add("hidden");
            }
        })();
        
        // call inside html accept button onClick
        function accpeptButton() {
            HideBanner.classList.add("hidden");
            window.localStorage.setItem("banner", "hidden");
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
        