(function() {
    "use strict";
    console.log("reading js");

    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function(eachLink) {
        eachLink.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();

        const targetId = e.target.getAttribute('href');
        const targetAnchor = document.querySelector(targetId);
        const originalTop = (targetAnchor.getBoundingClientRect().top) - 200;
        window.scrollBy({
            top: originalTop,
            left: 0,
            behavior: 'smooth'
        });
        console.log(originalTop);
    }

    window.addEventListener('load', function() {
        const posts = document.querySelectorAll('section');
        let postTops = [];
        let pagetop;
        let counter = 1;
        let prevCounter = 1;
        let doneResizing;

        console.log(posts[0].getBoundingClientRect().top + window.pageYOffset);

        // posts.forEach(function(post) {
        //     postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
        // })

        // console.log(postTops);

        resetPagePosition();

        window.addEventListener('scroll', function() {
            //250 in order to not scroll to the very top of the window, want to be in view of the header always.
            pagetop = window.pageYOffset + 250;
            console.log(counter);
            if (pagetop > postTops[counter]) {
                counter++;
                console.log(`scroll down ${counter}`);
            } else if (counter > 1 && pagetop < postTops[counter - 1]) {
                counter--;
                console.log(`scrolling up ${counter}`);
            }


            // const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
            let thisLink;
            let prog;
            if(counter == 1) {
                thisLink = document.getElementById("sec1");
            }
            else if(counter == 2) {
                thisLink = document.getElementById("sec2");
                prog = document.getElementById("prog1");
            }
            else if(counter == 3) {
                thisLink = document.getElementById("sec3");
                prog = document.getElementById("prog2");
            }

            if(prevCounter > counter) {
                if(counter == 1) {
                    thisLink = document.getElementById("sec2");
                    prog = document.getElementById("prog1");
                }
                else if(counter == 2) {
                    thisLink = document.getElementById("sec3");
                    prog = document.getElementById("prog2");
                }
                thisLink.removeAttribute('class');
                prog.classList.remove('selected');
            }
            else{
                if(counter >= 2) {
                    thisLink.className = 'selected';
                    prog.classList.add('selected');
                }
            }
            
            prevCounter = counter;
        });

        window.addEventListener('resize', function() {
            clearTimeout(doneResizing);

            navLinks.forEach(function(eachLink) {
                eachLink.removeAttribute('class');
            });

            doneResizing = setTimeout(function() {

                resetPagePosition();

            }, 500);
        });

        function resetPagePosition() {
            postTops = [];
            posts.forEach(function(post) {
                postTops.push(Math.floor(post.getBoundingClientRect().top) + window.pageYOffset);
            });

            const pagePosition = window.pageYOffset + 250;
            let counter = 0;
            postTops.forEach(function(post) {
                if (pagePosition > post) {
                    counter++;
                }
            })

            navLinks.forEach(function(eachLink) {
                eachLink.removeAttribute('class');
            });
            
            const thisLink = document.querySelector(`nav ul li:nth-child(1) a`);
            thisLink.className = 'selected';
            let prog = document.getElementById("prog1");
            let prog2 = document.getElementById("prog2");
            prog.classList.remove("selected");
            prog2.classList.remove("selected");
            window.scroll(0, 0);
            
        }
    });


    
})();