(function (global) {

    const frequentOptions = [1.2, 1.3, 1.4, 1.5, 1.7, 1.9, 2, 2.2, 2.6, 2.7, 2.8, 3.2];

    const questionnaireResult = [];

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

            for (let i = 0; i < checkboxes.length; i++) {
                const item = checkboxes[i];
                if (item.checked) {
                    questionnaireResult.push(item.getAttribute('name'));
                }
            }

            document.getElementById('step_1').classList.add('hidden');
            step2Handlers();
        }
    }

    function step2Handlers() {
        document.getElementById('step_2').classList.remove('hidden');
        window.setTimeout(() => {
            document.getElementById('step_2').classList.add('hidden');
            const expense = global.LandingCalculator.getTotal(questionnaireResult);
            const months = Math.round(global.LandingCalculator.IPHONE_PRICE / expense * 10) / 10;
            const data = questionnaireResult.join('.')
            if (frequentOptions.includes(months)) {
                const htmlPostfix = months.toString().split('.').join('_');
                document.location = `./result_${htmlPostfix}.html?data=${data}`;
            } else {
                document.location = `./result.html?data=${data}`;
            }
        }, 3000);
    }

    step1Handlers();

}(window));
