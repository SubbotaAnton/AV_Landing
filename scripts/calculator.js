(function (global) {

    const OPTION_TO_TABLE = {
        'a': {
            important: [19, 20, 21],
                forbidden: [1, 2, 11, 12, 13],
                usual: [3, 4, 5, 6, 7, 8, 9, 10]
        },
        'b': {
            important: [19, 20, 21, 22],
                forbidden: [1, 2, 5, 6, 11, 12, 13],
                usual: [3, 4, 7, 8, 9, 10]
        },
        'c': {
            important: [8, 20, 21, 23],
                forbidden: [1],
                usual: [3, 4, 5, 6, 7, 9, 10]
        },
        'd': {
            important: [13],
                forbidden: [],
                usual: [1, 2, 3, 4, 5, 6, 7, 9, 10]
        },
        'e': {
            important: [11, 12],
                forbidden: [1, 2, 3],
                usual: [4, 5, 6, 7, 9, 10]
        },
        'f': {
            important: [15],
                forbidden: [],
                usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        'g': {
            important: [16],
                forbidden: [],
                usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        'h': {
            important: [18],
                forbidden: [],
                usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        'i': {
            important: [17],
                forbidden: [],
                usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        },
        'j': {
            important: [14],
                forbidden: [],
                usual: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
        }
    };

    const DICTIONARY = {
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
    };

    const resultToList = (questionnaireResult) => {
        const list = [];
        const important = [];
        const forbidden = [];
        const usual = [];

        if (questionnaireResult.length === 0) {
            return [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
        }

        questionnaireResult.forEach((item) => {
            const record = OPTION_TO_TABLE[item];
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
    };

    const getTotal = (questionnaireResult) => {
        const blockLists = resultToList(questionnaireResult);
        return blockLists.reduce((acc, block) => {
            return acc + (DICTIONARY[block].value || 0);
        }, 0);
    };

    const getSpeed = (expense) => {
        if (expense > global.LandingCalculator.BASIC_EXPENSE) {
            return Math.round((expense / global.LandingCalculator.BASIC_EXPENSE) * 100 - 100);
        } else {
            return Math.round((global.LandingCalculator.BASIC_EXPENSE / expense) * 100 - 100);
        }
    }

    global.LandingCalculator = {
        OPTION_TO_TABLE,
        DICTIONARY,
        IPHONE_PRICE: 79990,
        BASIC_EXPENSE: 23870,
        resultToList,
        getTotal,
        getSpeed
    }

}(window));
