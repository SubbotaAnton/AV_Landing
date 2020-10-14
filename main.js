(function() {

    function step1Handlers() {
        const checkboxes = document.getElementsByClassName('questionCheckbox');

        for (let i = 0; i < checkboxes.length; i++) {
            checkboxes[i].addEventListener('click', onCheckBoxClick, false);
        }

        function onCheckBoxClick(event) {
            const isChecked = event.target.checked;
            let node = event.target;
            while (node && !node.classList.contains('option')) {
                node = node.parentNode;
            }
            if (isChecked) {
                node.classList.add('optionChecked');
            } else {
                node.classList.remove('optionChecked');
            }
        }

        const options = document.getElementsByClassName('option');

        for (let i = 0; i < options.length; i++) {
            options[i].addEventListener('click', onOptionClick, false);
        }

        function onOptionClick(event) {
            if (event.target.classList.contains('option')) {
                event.preventDefault();
                event.target.querySelectorAll('input[type="checkbox"]')[0].click();
            }
        }

        const submit = document.getElementById('submit');

        submit.addEventListener('click', onSubmit, false);

        function onSubmit(event) {
            event.preventDefault();

            let isValid = false;

            for (let i = 0; i < checkboxes.length; i++) {
                isValid = isValid || checkboxes[i].checked;
            }

            if (isValid) {
                document.getElementById('step_1').classList.add('hidden');
                step2Handlers();
            } else {
                alert('Пожалуйста, выберите хотя бы один пункт');
            }
        }
    }

    function step2Handlers() {
        document.getElementById('step_2').classList.remove('hidden');
        window.setTimeout(() => {
            document.getElementById('step_2').classList.add('hidden');
            step3Handlers();
        }, 3000);
    }

    function step3Handlers() {
        document.getElementById('step_3').classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.remove('mainBackground');
        document.getElementsByTagName('header')[0].classList.add('mainBackground');


        const months = 2;
        const speed = 66;
        document.getElementById('eating_iphone').innerHTML = `Вы проедаете Айфон за ${months} месяца. Это быстрее на ${speed}%, чем средний москвич`
    }

    step1Handlers();

}());
