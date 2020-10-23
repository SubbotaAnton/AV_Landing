(function (global) {

    let questionnaireResult = [];


    function getQueryVariable(variable) {
        const query = window.location.search.substring(1);
        const vars = query.split('&');
        for (let i = 0; i < vars.length; i++) {
            const pair = vars[i].split('=');
            if (decodeURIComponent(pair[0]) === variable) {
                return decodeURIComponent(pair[1]);
            }
        }
        return null;
    }

    function result() {
        const formResult = getQueryVariable('data')
        if (result) {
            questionnaireResult = formResult.split('.');
        }

        const blockLists = global.LandingCalculator.resultToList(questionnaireResult);
        showBlocks(blockLists);

        const expense = global.LandingCalculator.getTotal(questionnaireResult);
        const months = Math.round(global.LandingCalculator.IPHONE_PRICE / expense * 10) / 10;
        let compare;
        const speed = global.LandingCalculator.getSpeed(expense);
        if (expense < global.LandingCalculator.BASIC_EXPENSE) {
            compare = 'меньше';
        } else {
            compare = 'больше';
        }
        const finalPhrase = `Среднему москвичу на это нужно на ${speed}% ${compare} времени.`

        document.getElementById('eating_iphone').innerHTML = `Вы можете питаться на стоимость Айфона ${months} месяца. ${finalPhrase}`;

        initChart(blockLists);

        const shareText = `Я могу питаться на стоимость Айфона ${months} месяца. ${finalPhrase}`;
        const absoluteURL = 'https%3A%2F%2Fwww.sravni.ru%2Fpromo%2Fazbuka-vkusa%2F';

        // vk share
        document.getElementById('vk_share').innerHTML = VK.Share.button(
            {
                title: shareText,
                image: 'https://www.sravni.ru/wp-content/themes/sravniru/assets/landing/azbuka-vkusa/images/apple.png'
            },
            {
                type: 'custom',
                text: '<div class="vkShare"></div>'
            }
        );

        // fb share
        document.getElementById('fb_share').addEventListener('click', (e) => {
            e.preventDefault();
            const url = `https://www.facebook.com/sharer/sharer.php?u=${absoluteURL}`;
            const options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
            window.open(url,'sharer',options);
        });

        // twitter share
        document.getElementById('twitter_share').addEventListener('click', (e) => {
            e.preventDefault();
            const url = `https://twitter.com/intent/tweet?text=${encodeURI(shareText)}&url=${absoluteURL}`;
            const options = 'toolbar=0,status=0,resizable=1,width=626,height=436';
            window.open(url,'sharer',options);
        });
    }

    function showBlocks(blocks) {
        blocks.forEach((block) => {
            if (global.LandingCalculator.DICTIONARY[block].value) {
                const el = document.getElementById(`foodBlock_${block}`).classList.remove('hidden');
            }
        });
    }

    function initChart(blocks) {
        const ctx = document.getElementById('pieChart');

        const values = blocks.reduce((acc, block) => {
            acc.push(global.LandingCalculator.DICTIONARY[block].value);
            return acc;
        }, []);

        const defaultBGColor = 'rgb(240, 115, 0)';
        const backgroundColors = blocks.reduce((acc, block) => {
            acc.push(global.LandingCalculator.DICTIONARY[block].color || defaultBGColor);
            return acc;
        }, []);

        const labels = blocks.reduce((acc, block) => {
            acc.push(global.LandingCalculator.DICTIONARY[block].description);
            return acc;
        }, []);

        const data = {
            datasets: [{
                data: values,
                backgroundColor: backgroundColors,
            }],
            labels: labels
        };

        const fullExpense = () => {
            const value = Math.round(global.LandingCalculator.getTotal(questionnaireResult)).toString();
            let updatedValue = `${value.slice(0, value.length - 3)} ${value.slice(value.length - 3)}`;
            return `${updatedValue} ₽`;
        }

        new Chart(ctx, {
            type: 'doughnut',
            data,
            options: {
                legend: {
                    display: false
                },
                plugins: {
                    doughnutlabel: {
                        labels: [
                            {
                                text: 'Итого',
                                font: {
                                    size: '12'
                                },
                                color: 'black'
                            },
                            {
                                text: fullExpense(),
                                font: {
                                    size: '24'
                                },
                                color: 'black'
                            },
                            {
                                text: 'в месяц',
                                font: {
                                    size: '12'
                                },
                                color: 'black'
                            }
                        ]
                    }
                }
            }
        });
    }

    result();

}(window));
