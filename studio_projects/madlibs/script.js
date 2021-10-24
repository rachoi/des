(function() {
    "use strict";
    console.log("reading js");


    let form = document.querySelector('form');

    let overlay = document.getElementById('overlay');
    let normal = document.getElementById('normal');
    let madlib = document.getElementById('madlib');

    function processData(formData) {
        let words = [];
        let emptyFields = 0;

        for (let field of formData) {
            if (field.value) {
                words.push(field.value);
                field.value = "";
            } else {
                emptyFields++;
            }

        }

        

        //giving text to the div above
        if (emptyFields > 0) {
            madlib.textContent = "Incomplete form, please submit all fields";
        } else {
            madlib.textContent = 
            `
            Hey ${words[0]}!

            So I heard you like the ${words[1]}? Well I think the bongos are better! You also like the ${words[2]}? 
            Well the keyboard is also better than that! I also heard your favorite song was ${words[3]} by ${words[4]}. I bet I could make it sound better
            on the bongos. 
            `;
        }

        normal.classList.remove('showing');
        normal.classList.add('hidden');


        overlay.classList.remove('hidden');
        overlay.classList.add('showing');

    }


    form.addEventListener('submit', function(e) {
        e.preventDefault();
        let formData = document.querySelectorAll("input[type=text]");
        processData(formData);
    })


    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            overlay.classList.remove('showing');
            normal.classList.remove('hidden');

            overlay.classList.add('hidden');
            normal.classList.add('showing');

        }
    });

    let exitBtn = document.getElementById("exit");
    exitBtn.addEventListener('click', function(e) {
        e.preventDefault();

        overlay.classList.remove('showing');
        normal.classList.remove('hidden');

        overlay.classList.add('hidden');
        normal.classList.add('showing');
    });

})();