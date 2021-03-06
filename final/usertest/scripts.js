(function() {
    "use strict";
    console.log("reading js");
    alert('Hello, thank you for testing my project! The tests you will be conducting are focused on the progress bar on the left. Here are the three things to check for: 1) Clicking on the year will take you to the appropriate year and adjust the bar accordingly. 2) Progress bar should be adjusted (always) according to the sections we are looking at. 3) Years/sections we have passed should remain yellow, years we have not passed should not be yellow (should change as you scroll back and forth)');
    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function(eachLink) {
        eachLink.addEventListener('click', smoothScroll);
    });

    let l1 = document.getElementById("lab1");
    let l2 = document.getElementById("lab2");
    let l3 = document.getElementById("lab3");
    
    let header = document.getElementById("head").getBoundingClientRect().height;
    let border1 = document.getElementById("first").getBoundingClientRect().height-header;
    let border2 = document.getElementById("second").getBoundingClientRect().height-header;

    console.log("our borders:");
    console.log(header);
    console.log(border1);
    console.log(border2);
        

    function smoothScroll(e) {
        e.preventDefault();
        let id = e.target.id;
        console.log(id);
    
        let cur = window.pageYOffset;
        let originalTop;
        if(id === "lab1") {
            originalTop = 0 - cur;
        }
        else if(id === "lab2") {
            if(cur > border1) {
                originalTop = border1 - cur;
            }
            else{
                originalTop = Math.abs(border1 - cur);
            }
            
        }
        else if(id === "lab3") {
            originalTop = header + border1 + border2 - cur;
        }
        console.log("org " + originalTop);
        window.scrollBy({
            top: originalTop,
            left: 0,
            behavior: 'smooth'
        });
    }

    window.addEventListener('load', function() {
        const posts = document.querySelectorAll('section');
        let postTops = [];
        let pagetop;
        let counter = 1;
        let prevCounter = 1;
        pagetop = window.pageYOffset + header;


        let p1 = document.getElementById('p1');
        let p2 = document.getElementById('p2');

        let realpos = pagetop - header;
        console.log(`real pos load ${realpos}`);

        if(realpos >= 0 && realpos < border1) {
            p1.style.height = `${realpos/2}px`;
            p2.style.height = `0px`;
            l2.style.color = "white";
            l3.style.color = "white";
        }
        else if(realpos >= border1) {
            p1.style.height = `250px`;
            if(realpos == border1) {
                p2.style.height = `0px`;
            }
            else{
                p2.style.height = `${(realpos-border1)/2}px`;
            }
            
            l2.style.color = "yellow";
            if(realpos >= border1+border2) {
                l3.style.color = "yellow";
            }
            else{
                l3.style.color = "white";
            }
        }
        
        console.log(posts[0].getBoundingClientRect().top + window.pageYOffset);

        window.addEventListener('scroll', function() {
            //250 in order to not scroll to the very top of the window, want to be in view of the header always.
            pagetop = window.pageYOffset + 250;
            console.log(`cur pos: ${pagetop}`)
            console.log(counter);

            if (pagetop > postTops[counter]) {
                counter++;
                console.log(`scroll down ${counter}`);
            } else if (counter > 1 && pagetop < postTops[counter - 1]) {
                counter--;
                console.log(`scrolling up ${counter}`);
            }

            let realpos = pagetop - 250;
            // console.log(`real pos: ${realpos}`)

            if(realpos >= 0 && realpos < border1) {
                p1.style.height = `${realpos/2}px`;
                p2.style.height = `0px`;
                l2.style.color = "white";
                l3.style.color = "white";
            }
            else if(realpos >= border1) {
                p1.style.height = `250px`;
                if(realpos == border1) {
                    p2.style.height = `0px`;
                }
                else{
                    p2.style.height = `${(realpos-border1)/2}px`;
                }
                
                l2.style.color = "yellow";
                if(realpos >= border1+border2) {
                    l3.style.color = "yellow";
                }
                else{
                    l3.style.color = "white";
                }
            }

        });

        
    });


    
})();