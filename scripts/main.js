(function () {

    const optionToTable = {
        vegetarian: {
            important: [19, 20, 21],
            forbidden: [1, 2, 11, 12, 13],
            usual: [3, 4, 5, 6, 7, 8, 9, 10]
        },
        vegan: {
            important: [19, 20, 21, 22],
            forbidden: [1, 2, 11, 12, 13],
            usual: [3, 4, 5, 6, 7, 8, 9, 10]
        },
        healthyEating: {
            important: [8, 20, 21, 23],
            forbidden: [1],
            usual: [3, 4, 5, 6, 7, 9, 10]
        },
        hardWorker: {
            important: [13],
            forbidden: [],
            usual: [1, 2, 3, 4, 5, 6, 7, 9, 10]
        },
        remoteWork: {
            important: [11, 12],
            forbidden: [1, 2, 3],
            usual: [4, 5, 6, 7, 9, 10]
        },
        baby: {
            important: [15],
            forbidden: [],
            usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        child: {
            important: [16],
            forbidden: [],
            usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        dog: {
            important: [18],
            forbidden: [],
            usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        cat: {
            important: [17],
            forbidden: [],
            usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        forbidden: {
            important: [14],
            forbidden: [],
            usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    }

    const dictionary = {
        1: {
            description: 'мясо',
            value: 8044,
            color: 'rgb(208, 2, 27)'
        },
        2: {
            description: 'рыба',
            value: 4219.5,
            color: 'rgb(80, 121, 226)'
        },
        3: {
            description: 'овощи и зелень',
            value: 1822.2,
            color: 'rgb(3, 189, 91)'
        },
        4: {
            description: 'фрукты и ягода',
            value: 1089,
            color: 'rgb(255,0,31)'
        },
        5: {
            description: 'яйца',
            value: 172.1,
            color: 'rgb(240, 115, 0)'
        },
        6: {
            description: 'молочка',
            value: 4788.8,
            color: 'rgb(155, 155, 155)'
        },
        7: {
            description: 'хлеб',
            value: 1517.5,
            color: 'rgb(160, 67, 0)'
        },
        8: {
            description: 'крупы',
            value: undefined,
            color: 'rgb(245, 166, 35)'
        },
        9: {
            description: 'сладкое',
            value: 1441.2,
            color: 'rgb(161, 0, 155)'
        },
        10: {
            description: 'масло',
            value: 536,
            color: 'rgb(245, 166, 35)'
        },
        11: {
            description: 'консервы',
            value: undefined,
            color: 'rgb(80, 121, 226)'
        },
        12: {
            description: 'заморозка',
            value: 3490.8,
            color: 'rgb(208, 2, 27)'
        },
        13: {
            description: 'готовая еда',
            value: 12090,
            color: 'rgb(3, 189, 91)'
        },
        14: {
            description: 'деликатесы',
            value: 5940,
            color: 'rgb(206,0,87)'
        },
        15: {
            description: 'детские товары 0-3 года',
            value: 17000,
            color: 'rgb(137,198,68)'
        },
        16: {
            description: 'детские товары 3+',
            value: 16579.1,
            color: 'rgb(68,198,198)'
        },
        17: {
            description: 'кошки',
            value: 6063,
            color: 'rgb(0,132,140)'
        },
        18: {
            description: 'собаки',
            value: 4760,
            color: 'rgb(85,85,85)'
        },
        19: {
            description: 'вместо мяса и рыбы',
            value: 6023.6,
            color: 'rgb(120,0,214)'
        },
        20: {
            description: 'зелень',
            value: 3236,
            color: 'rgb(137,198,68)'
        },
        21: {
            description: 'орехи и крупы',
            value: 4291,
            color: 'rgb(245, 166, 35)'
        },
        22: {
            description: 'вместо молока',
            value: 8381,
            color: 'rgb(80,121,226)'
        },
        23: {
            description: 'ЗОЖ',
            value: 12275.25,
            color: 'rgb(137,198,68)'
        },
    }

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
            step3Handlers();
        }, 3000);
    }

    function getTotal() {
        const blockLists = resultToList();
        return blockLists.reduce((acc, block) => {
            return acc + (dictionary[block].value || 0);
        }, 0);
    }

    function step3Handlers() {
        const blockLists = resultToList();
        showBlocks(blockLists);

        document.getElementById('step_3').classList.remove('hidden');
        document.getElementsByTagName('body')[0].classList.remove('mainBackground');
        document.getElementsByTagName('header')[0].classList.add('mainBackground');

        const iphonePrice = 79990;
        const expense = getTotal();
        const basicExpense = 23870;
        const months = Math.round(iphonePrice / expense * 10) / 10;
        let compare;
        let speed;
        if (expense > basicExpense) {
            compare = 'меньше';
            speed = Math.round((expense / basicExpense) * 100 - 100);
        } else {
            compare = 'больше'
            speed = Math.round((basicExpense / expense) * 100 - 100);
        }
        document.getElementById('eating_iphone').innerHTML = `Вы можете питаться на стоимость Айфона ${months} месяца. Это ${compare} на ${speed}%, чем средний москвич`;

        initChart(blockLists);

        const shareText = `Я могу питаться на стоимость Айфона ${months} месяца. Это на ${speed}% ${compare}, чем средний москвич.`;
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
            if (dictionary[block].value) {
                const el = document.getElementById(`foodBlock_${block}`).classList.remove('hidden');
            }
        });
    }

    function resultToList() {
        const list = [];
        const important = [];
        const forbidden = [];
        const usual = [];

        if (questionnaireResult.length === 0) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }

        questionnaireResult.forEach((item) => {
            const record = optionToTable[item];
            record.important.forEach((n) => {
                if (!important.includes(n)) {
                    important.push(n);
                }
            })
            record.forbidden.forEach((n) => {
                if (!forbidden.includes(n)) {
                    forbidden.push(n);
                }
            })
            record.usual.forEach((n) => {
                if (!usual.includes(n)) {
                    usual.push(n);
                }
            })
        })
        for (let i = 0; i < important.length; i++) {
            const value = important[i];
            if (!forbidden.includes(value)) {
                list.push(value);
            }
        }
        for (let i = 0; i < usual.length; i++) {
            const value = usual[i];
            if (!forbidden.includes(value) && !list.includes(value)) {
                list.push(usual[i]);
            }
        }
        return list;
    }

    function initChart(blocks) {
        const ctx = document.getElementById('pieChart');

        const values = blocks.reduce((acc, block) => {
            acc.push(dictionary[block].value);
            return acc;
        }, []);

        const defaultBGColor = 'rgb(240, 115, 0)';
        const backgroundColors = blocks.reduce((acc, block) => {
            acc.push(dictionary[block].color || defaultBGColor);
            return acc;
        }, []);

        const labels = blocks.reduce((acc, block) => {
            acc.push(dictionary[block].description);
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
            const value = Math.round(getTotal()).toString();
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

    step1Handlers();

}());
