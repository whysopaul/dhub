import { TServicesData } from "../actions/services/types"

export const SERVER_URL = 'https://api.vtargete.pro/api/digital_hub'
export const URL = window.location.href.includes('localhost') ? 'http://localhost:8080' : window.location.href.includes('web') ? 'https://digital-hub-3505b.web.app' : 'https://digital-hub-3505b.netlify.app'

export const createServiceLink = (name: string): string => {
    return name.split(' ').join('').split('.').join('').toLocaleLowerCase()
}

export const debounce = (func, delay) => {
    let timeoutId
    return (...args) => {
        clearTimeout(timeoutId)
        timeoutId = setTimeout(() => {
            timeoutId = null
            func(...args)
        }, delay)
    }
}

export const getImage = (path: string): string => {
    return path // 'https://api.vtargete.pro' + 
}

export const sliceDescription = (service: TServicesData): TServicesData => {
    if (service === null) return service

    if (service.id < 4000) return service

    if (!service.description.text.includes('\n')) return service

    return {
        ...service,
        description: {
            ...service.description,
            text: service.description.text.split('\n').slice(1).join('\n')
        }
    }
}

export const feedbacksLength = (feedbacks_length: number): string => {
    let m = feedbacks_length % 10

    if (feedbacks_length === 0) {
        return 'Нет отзывов'
    }
    if (feedbacks_length < 10 && m === 1 || feedbacks_length > 20 && m === 1) {
        return ' отзыв'
    }
    if (feedbacks_length < 10 && m > 1 && m < 5 || feedbacks_length > 20 && m > 1 && m < 5) {
        return ' отзыва'
    }
    if (feedbacks_length < 10 && m >= 5 || feedbacks_length > 20 && m >= 5) {
        return ' отзывов'
    }
    if (feedbacks_length >= 10 && feedbacks_length >= 20) {
        return ' отзывов'
    }
}

export const countriesList = {
    "popularCountries": [
        {
            "countryName": "Россия",
            "countryCode": "+7"
        }, {
            "countryName": "Беларусь",
            "countryCode": "+375"
        }, {
            "countryName": "Казахстан",
            "countryCode": "+7"
        }, {
            "countryName": "Молдова",
            "countryCode": "+373"
        }, {
            "countryName": "Украина",
            "countryCode": "+380"
        }
    ],
    "otherCountries": [
        {
            "countryName": "Австралия",
            "countryCode": "+61"
        }, {
            "countryName": "Австрия",
            "countryCode": "+43"
        }, {
            "countryName": "Азербайджан",
            "countryCode": "+994"
        }, {
            "countryName": "Албания",
            "countryCode": "+355"
        }, {
            "countryName": "Алжир",
            "countryCode": "+213"
        }, {
            "countryName": "Ангилья",
            "countryCode": "+1264"
        }, {
            "countryName": "Ангола",
            "countryCode": "+244"
        }, {
            "countryName": "Андорра",
            "countryCode": "+376"
        }, {
            "countryName": "Антигуа и Барбуда",
            "countryCode": "+1268"
        }, {
            "countryName": "Антильские острова",
            "countryCode": "+599"
        }, {
            "countryName": "Аргентина",
            "countryCode": "+54"
        }, {
            "countryName": "Армения",
            "countryCode": "+374"
        }, {
            "countryName": "Афганистан",
            "countryCode": "+93"
        }, {
            "countryName": "Багамские острова",
            "countryCode": "+1242"
        }, {
            "countryName": "Бангладеш",
            "countryCode": "+880"
        }, {
            "countryName": "Барбадос",
            "countryCode": "+1246"
        }, {
            "countryName": "Бахрейн",
            "countryCode": "+973"
        }, {
            "countryName": "Белиз",
            "countryCode": "+501"
        }, {
            "countryName": "Бельгия",
            "countryCode": "+32"
        }, {
            "countryName": "Бенин",
            "countryCode": "+229"
        }, {
            "countryName": "Бермуды",
            "countryCode": "+1441"
        }, {
            "countryName": "Болгария",
            "countryCode": "+359"
        }, {
            "countryName": "Боливия",
            "countryCode": "+591"
        }, {
            "countryName": "Босния/Герцеговина",
            "countryCode": "+387"
        }, {
            "countryName": "Ботсвана",
            "countryCode": "+267"
        }, {
            "countryName": "Бразилия",
            "countryCode": "+55"
        }, {
            "countryName": "Британские Виргинские о-ва",
            "countryCode": "+1284"
        }, {
            "countryName": "Бруней",
            "countryCode": "+673"
        }, {
            "countryName": "Буркина Фасо",
            "countryCode": "+226"
        }, {
            "countryName": "Бурунди",
            "countryCode": "+257"
        }, {
            "countryName": "Бутан",
            "countryCode": "+975"
        }, {
            "countryName": "Вануату",
            "countryCode": "+678"
        }, {
            "countryName": "Ватикан",
            "countryCode": "+379"
        }, {
            "countryName": "Великобритания",
            "countryCode": "+44"
        }, {
            "countryName": "Венгрия",
            "countryCode": "+36"
        }, {
            "countryName": "Венесуэла",
            "countryCode": "+58"
        }, {
            "countryName": "Вьетнам",
            "countryCode": "+84"
        }, {
            "countryName": "Габон",
            "countryCode": "+241"
        }, {
            "countryName": "Гаити",
            "countryCode": "+509"
        }, {
            "countryName": "Гайана",
            "countryCode": "+592"
        }, {
            "countryName": "Гамбия",
            "countryCode": "+220"
        }, {
            "countryName": "Гана",
            "countryCode": "+233"
        }, {
            "countryName": "Гваделупа",
            "countryCode": "+590"
        }, {
            "countryName": "Гватемала",
            "countryCode": "+502"
        }, {
            "countryName": "Гвинея",
            "countryCode": "+224"
        }, {
            "countryName": "Гвинея-Бисау",
            "countryCode": "+245"
        }, {
            "countryName": "Германия",
            "countryCode": "+49"
        }, {
            "countryName": "Гернси остров",
            "countryCode": "+441481"
        }, {
            "countryName": "Гибралтар",
            "countryCode": "+350"
        }, {
            "countryName": "Гондурас",
            "countryCode": "+504"
        }, {
            "countryName": "Гонконг",
            "countryCode": "+852"
        }, {
            "countryName": "Государство Палестина",
            "countryCode": "+970"
        }, {
            "countryName": "Гренада",
            "countryCode": "+1473"
        }, {
            "countryName": "Гренландия",
            "countryCode": "+299"
        }, {
            "countryName": "Греция",
            "countryCode": "+30"
        }, {
            "countryName": "Грузия",
            "countryCode": "+995"
        }, {
            "countryName": "ДР Конго",
            "countryCode": "+243"
        }, {
            "countryName": "Дания",
            "countryCode": "+45"
        }, {
            "countryName": "Джерси остров",
            "countryCode": "+447"
        }, {
            "countryName": "Джибути",
            "countryCode": "+253"
        }, {
            "countryName": "Доминиканская Республика",
            "countryCode": "+18"
        }, {
            "countryName": "Египет",
            "countryCode": "+20"
        }, {
            "countryName": "Замбия",
            "countryCode": "+260"
        }, {
            "countryName": "Западная Сахара",
            "countryCode": "+212"
        }, {
            "countryName": "Зимбабве",
            "countryCode": "+263"
        }, {
            "countryName": "Израиль",
            "countryCode": "+972"
        }, {
            "countryName": "Индия",
            "countryCode": "+91"
        }, {
            "countryName": "Индонезия",
            "countryCode": "+62"
        }, {
            "countryName": "Иордания",
            "countryCode": "+962"
        }, {
            "countryName": "Ирак",
            "countryCode": "+964"
        }, {
            "countryName": "Иран",
            "countryCode": "+98"
        }, {
            "countryName": "Ирландия",
            "countryCode": "+353"
        }, {
            "countryName": "Исландия",
            "countryCode": "+354"
        }, {
            "countryName": "Испания",
            "countryCode": "+34"
        }, {
            "countryName": "Италия",
            "countryCode": "+39"
        }, {
            "countryName": "Йемен",
            "countryCode": "+967"
        }, {
            "countryName": "Кабо-Верде",
            "countryCode": "+238"
        }, {
            "countryName": "Камбоджа",
            "countryCode": "+855"
        }, {
            "countryName": "Камерун",
            "countryCode": "+237"
        }, {
            "countryName": "Канада",
            "countryCode": "+1"
        }, {
            "countryName": "Катар",
            "countryCode": "+974"
        }, {
            "countryName": "Кения",
            "countryCode": "+254"
        }, {
            "countryName": "Кипр",
            "countryCode": "+357"
        }, {
            "countryName": "Китай",
            "countryCode": "+86"
        }, {
            "countryName": "Колумбия",
            "countryCode": "+57"
        }, {
            "countryName": "Коморы (Сою́з Комо́рских Острово́в)",
            "countryCode": "+269"
        }, {
            "countryName": "Коста-Рика",
            "countryCode": "+506"
        }, {
            "countryName": "Кот-д'Ивуар",
            "countryCode": "+225"
        }, {
            "countryName": "Куба",
            "countryCode": "+53"
        }, {
            "countryName": "Кувейт",
            "countryCode": "+965"
        }, {
            "countryName": "Кука острова",
            "countryCode": "+682"
        }, {
            "countryName": "Кыргызстан",
            "countryCode": "+996"
        }, {
            "countryName": "Лаос",
            "countryCode": "+856"
        }, {
            "countryName": "Латвия",
            "countryCode": "+371"
        }, {
            "countryName": "Лесото",
            "countryCode": "+266"
        }, {
            "countryName": "Либерия",
            "countryCode": "+231"
        }, {
            "countryName": "Ливан",
            "countryCode": "+961"
        }, {
            "countryName": "Ливия",
            "countryCode": "+218"
        }, {
            "countryName": "Литва",
            "countryCode": "+370"
        }, {
            "countryName": "Лихтенштейн",
            "countryCode": "+423"
        }, {
            "countryName": "Люксембург",
            "countryCode": "+352"
        }, {
            "countryName": "Маврикий",
            "countryCode": "+230"
        }, {
            "countryName": "Мавритания",
            "countryCode": "+222"
        }, {
            "countryName": "Мадагаскар",
            "countryCode": "+261"
        }, {
            "countryName": "Македония",
            "countryCode": "+389"
        }, {
            "countryName": "Малави",
            "countryCode": "+265"
        }, {
            "countryName": "Малайзия",
            "countryCode": "+60"
        }, {
            "countryName": "Мали",
            "countryCode": "+223"
        }, {
            "countryName": "Мальдивские острова",
            "countryCode": "+960"
        }, {
            "countryName": "Мальта",
            "countryCode": "+356"
        }, {
            "countryName": "Марокко",
            "countryCode": "+212"
        }, {
            "countryName": "Мексика",
            "countryCode": "+52"
        }, {
            "countryName": "Мозамбик",
            "countryCode": "+258"
        }, {
            "countryName": "Монако",
            "countryCode": "+377"
        }, {
            "countryName": "Монголия",
            "countryCode": "+976"
        }, {
            "countryName": "Мьянма (Бирма)",
            "countryCode": "+95"
        }, {
            "countryName": "Мэн остров",
            "countryCode": "+441624"
        }, {
            "countryName": "Намибия",
            "countryCode": "+264"
        }, {
            "countryName": "Непал",
            "countryCode": "+977"
        }, {
            "countryName": "Нигер",
            "countryCode": "+227"
        }, {
            "countryName": "Нигерия",
            "countryCode": "+234"
        }, {
            "countryName": "Нидерланды (Голландия)",
            "countryCode": "+31"
        }, {
            "countryName": "Никарагуа",
            "countryCode": "+505"
        }, {
            "countryName": "Новая Зеландия",
            "countryCode": "+64"
        }, {
            "countryName": "Новая Каледония",
            "countryCode": "+687"
        }, {
            "countryName": "Норвегия",
            "countryCode": "+47"
        }, {
            "countryName": "О.А.Э.",
            "countryCode": "+971"
        }, {
            "countryName": "Оман",
            "countryCode": "+968"
        }, {
            "countryName": "Пакистан",
            "countryCode": "+92"
        }, {
            "countryName": "Палау",
            "countryCode": "+441624"
        }, {
            "countryName": "Панама",
            "countryCode": "+507"
        }, {
            "countryName": "Папуа Новая Гвинея",
            "countryCode": "+675"
        }, {
            "countryName": "Парагвай",
            "countryCode": "+595"
        }, {
            "countryName": "Перу",
            "countryCode": "+51"
        }, {
            "countryName": "Питкэрн остров",
            "countryCode": "+64"
        }, {
            "countryName": "Польша",
            "countryCode": "+48"
        }, {
            "countryName": "Португалия",
            "countryCode": "+351"
        }, {
            "countryName": "Пуэрто Рико",
            "countryCode": "+1787"
        }, {
            "countryName": "Республика Конго",
            "countryCode": "+242"
        }, {
            "countryName": "Реюньон",
            "countryCode": "+262"
        }, {
            "countryName": "Руанда",
            "countryCode": "+250"
        }, {
            "countryName": "Румыния",
            "countryCode": "+40"
        }, {
            "countryName": "США",
            "countryCode": "+1"
        }, {
            "countryName": "Сальвадор",
            "countryCode": "+503"
        }, {
            "countryName": "Самоа",
            "countryCode": "+685"
        }, {
            "countryName": "Сан-Марино",
            "countryCode": "+378"
        }, {
            "countryName": "Сан-Томе и Принсипи",
            "countryCode": "+239"
        }, {
            "countryName": "Саудовская Аравия",
            "countryCode": "+966"
        }, {
            "countryName": "Свазиленд",
            "countryCode": "+268"
        }, {
            "countryName": "Святая Люсия",
            "countryCode": "+1758"
        }, {
            "countryName": "Северная Корея",
            "countryCode": "+850"
        }, {
            "countryName": "Сейшеллы",
            "countryCode": "+248"
        }, {
            "countryName": "Сен-Пьер и Микелон",
            "countryCode": "+508"
        }, {
            "countryName": "Сенегал",
            "countryCode": "+221"
        }, {
            "countryName": "Сент Китс и Невис",
            "countryCode": "+1869"
        }, {
            "countryName": "Сент-Винсент и Гренадины",
            "countryCode": "+1784"
        }, {
            "countryName": "Сербия",
            "countryCode": "+381"
        }, {
            "countryName": "Сингапур",
            "countryCode": "+65"
        }, {
            "countryName": "Сирия",
            "countryCode": "+963"
        }, {
            "countryName": "Словакия",
            "countryCode": "+421"
        }, {
            "countryName": "Словения",
            "countryCode": "+386"
        }, {
            "countryName": "Соломоновы острова",
            "countryCode": "+677"
        }, {
            "countryName": "Сомали",
            "countryCode": "+252"
        }, {
            "countryName": "Судан",
            "countryCode": "+249"
        }, {
            "countryName": "Суринам",
            "countryCode": "+597"
        }, {
            "countryName": "Сьерра-Леоне",
            "countryCode": "+232"
        }, {
            "countryName": "Таджикистан",
            "countryCode": "+992"
        }, {
            "countryName": "Таиланд",
            "countryCode": "+66"
        }, {
            "countryName": "Тайвань",
            "countryCode": "+886"
        }, {
            "countryName": "Танзания",
            "countryCode": "+255"
        }, {
            "countryName": "Теркс и Кейкос",
            "countryCode": "+1649"
        }, {
            "countryName": "Того",
            "countryCode": "+228"
        }, {
            "countryName": "Токелау острова",
            "countryCode": "+690"
        }, {
            "countryName": "Тонга",
            "countryCode": "+676"
        }, {
            "countryName": "Тринидад и Тобаго",
            "countryCode": "+1868"
        }, {
            "countryName": "Тувалу",
            "countryCode": "+688"
        }, {
            "countryName": "Тунис",
            "countryCode": "+216"
        }, {
            "countryName": "Туркменистан",
            "countryCode": "+993"
        }, {
            "countryName": "Турция",
            "countryCode": "+90"
        }, {
            "countryName": "Уганда",
            "countryCode": "+256"
        }, {
            "countryName": "Узбекистан",
            "countryCode": "+998"
        }, {
            "countryName": "Уоллис и Футуна о-ва",
            "countryCode": "+681"
        }, {
            "countryName": "Уругвай",
            "countryCode": "+598"
        }, {
            "countryName": "Фарерские острова",
            "countryCode": "+298"
        }, {
            "countryName": "Фиджи",
            "countryCode": "+679"
        }, {
            "countryName": "Филиппины",
            "countryCode": "+63"
        }, {
            "countryName": "Финляндия",
            "countryCode": "+358"
        }, {
            "countryName": "Франция",
            "countryCode": "+33"
        }, {
            "countryName": "Французская Полинезия",
            "countryCode": "+689"
        }, {
            "countryName": "Хорватия",
            "countryCode": "+385"
        }, {
            "countryName": "Чад",
            "countryCode": "+235"
        }, {
            "countryName": "Черногория",
            "countryCode": "+382"
        }, {
            "countryName": "Чехия",
            "countryCode": "+420"
        }, {
            "countryName": "Чили",
            "countryCode": "+56"
        }, {
            "countryName": "Швейцария",
            "countryCode": "+41"
        }, {
            "countryName": "Швеция",
            "countryCode": "+46"
        }, {
            "countryName": "Шри-Ланка",
            "countryCode": "+94"
        }, {
            "countryName": "Эквадор",
            "countryCode": "+593"
        }, {
            "countryName": "Экваториальная Гвинея",
            "countryCode": "+240"
        }, {
            "countryName": "Эритрея",
            "countryCode": "+291"
        }, {
            "countryName": "Эстония",
            "countryCode": "+372"
        }, {
            "countryName": "Эфиопия",
            "countryCode": "+251"
        }, {
            "countryName": "ЮАР",
            "countryCode": "+27"
        }, {
            "countryName": "Южная Корея",
            "countryCode": "+82"
        }, {
            "countryName": "Ямайка",
            "countryCode": "+1876"
        }, {
            "countryName": "Япония",
            "countryCode": "+81"
        }
    ]
}
