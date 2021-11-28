(function() {
    "use strict";
    console.log("reading js");

    const navLinks = document.querySelectorAll('nav ul li a');

    navLinks.forEach(function(eachLink) {
        eachLink.addEventListener('click', smoothScroll);
    });

    function smoothScroll(e) {
        e.preventDefault();
        let id = e.target.id;
        console.log(id);
        const targetId = e.target.getAttribute('href');
        const targetAnchor = document.querySelector(targetId);
        let originalTop = (targetAnchor.getBoundingClientRect().top);
        console.log(`before ${originalTop}`);
        if(id === "lab1") {
            originalTop -= 200;
        }
        else if(id === "lab2") {
            originalTop -= 90;
        }
        else if(id === "lab3") {
            originalTop -= 90;
        }
        window.scrollBy({
            top: originalTop,
            left: 0,
            behavior: 'smooth'
        });
        // console.log(originalTop);
        // let originalTop;
        
        // window.scrollBy({
        //     top: originalTop,
        //     left: 0,
        //     behavior: 'smooth'
        // });
        console.log(originalTop);
    }

    window.addEventListener('load', function() {
        const posts = document.querySelectorAll('section');
        let postTops = [];
        let pagetop;
        let counter = 1;
        let prevCounter = 1;
        pagetop = window.pageYOffset + 250;


        let p1 = document.getElementById('p1');
        let p2 = document.getElementById('p2');

        let realpos = pagetop - 250;
        console.log(`real pos load ${realpos}`);
        
        let l1 = document.getElementById("lab1");
        let l2 = document.getElementById("lab2");
        let l3 = document.getElementById("lab3");


        if(realpos >= 0 && realpos < 515) {
            p1.style.height = `${realpos/2}px`;
            p2.style.height = `0px`;
            l2.style.color = "white";
            l3.style.color = "white";
        }
        else if(realpos >= 515) {
            p1.style.height = `250px`;
            if(realpos == 0) {
                p2.style.height = `0px`;
            }
            else{
                p2.style.height = `${(realpos-432)/2}px`;
            }
            
            l2.style.color = "yellow";
            if(realpos >= 950) {
                l3.style.color = "yellow";
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

            if(realpos >= 0 && realpos < 515) {
                p1.style.height = `${realpos/2}px`;
                p2.style.height = `0px`;
                l2.style.color = "white";
                l3.style.color = "white";
            }
            else if(realpos > 515) {
                p1.style.height = `250px`;
                if(realpos == 0) {
                    p2.style.height = `0px`;
                }
                else{
                    p2.style.height = `${(realpos-432)/2}px`;
                }
                l2.style.color = "yellow";
                if(realpos >= 950) {
                    l3.style.color = "yellow";
                }
                else{
                    l3.style.color = "white";
                }
                
            }



            // const thisLink = document.querySelector(`nav ul li:nth-child(${counter}) a`);
            let thisLink;
            let prog;
            if(counter == 1) {
                thisLink = document.getElementById("first");
            }
            else if(counter == 2) {
                thisLink = document.getElementById("second");
                prog = document.getElementById("sec1");
            }
            else if(counter == 3) {
                thisLink = document.getElementById("third");
                prog = document.getElementById("sec2");
            }

            if(prevCounter > counter) {
                if(counter == 1) {
                    thisLink = document.getElementById("second");
                    prog = document.getElementById("prog1");
                }
                else if(counter == 2) {
                    thisLink = document.getElementById("third");
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

        
    });


    
})();