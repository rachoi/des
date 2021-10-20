(function() {
    "use strict";
    console.log("reading js");


    let form = document.querySelector('form');

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

        let overlay = document.getElementById('overlay');
        let normal = document.getElementById('normal');
        let madlib = document.getElementById('madlib');

        //giving text to the div above
        if (emptyFields > 0) {
            madlib.textContent = "Incomplete form, please submit all fields";
        } else {
            madlib.textContent = `Here are the words: ${words[0]}, ${words[1]}, ${words[2]}, ${words[3]}`;
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

})();