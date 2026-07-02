const currentYearElements = document.querySelectorAll('[data-current-year]');

currentYearElements.forEach((element) => {
    element.textContent = new Date().getFullYear();
});

if ($('#lottie-scroll-1').length > 0) {
    LottieInteractivity.create({
        mode: 'scroll',
        player: '#lottie-scroll-1', //ID lottie-player в зеро-блоке и тут должны совпадать
        actions: [
            {
                visibility: [1, 1], // отступ от низа экрана, когда анимация на паузе
                type: 'stop', //Анимация на паузе
                frames: [0], //Количество кадров на паузе
            },
            {
                visibility: [0.2, 0.6],
                type: 'seek', //Анимация проигрывается по скролу
                frames: [0, 125], // С какого по какой кадр будет проигрываться анимация
            },
            {
                visibility: [0.6, 1.0],
                type: 'loop', //Анимация зациклена и проигрывает автоматически
                frames: [0, 125],
            },
        ],
    });
}

$(document).ready(function () {
    $('.reviews-slider').slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        arrows: false,
        dots: true,
        infinite: true,
        autoplay: false,
        adaptiveHeight: true,
        speed: 2000,
    });
});

if ($(window).width() <= 550) {
    $('.blog__list').slick({
        variableWidth: true,
        slidesToScroll: 1,
        arrows: false,
        dots: false,
        infinite: false,
    });
}

$('.header-menu-head').click(function () {
    $(this).toggleClass('active');
    $(this).next().slideToggle();
});

$('.footer-form-input[name="phone"], .review-page-form__input[name="phone"]').mask('+7 (999) 999-99-99');

$('.footer-form-choose-label').click(function () {
    $('.footer-form-choose-label').removeClass('active');
    $(this).addClass('active');
});

$('.footer-form-select-head').click(function () {
    $(this).next().slideToggle();
});
$('.footer-form-select-option').click(function () {
    $('.footer-form-select-options').slideUp();
    $('.footer-form-select-head').addClass('active');
    $('.footer-form-select-head').html($(this).find('span').text());
});

$('.footer-form').on('submit', function (e) {
    e.preventDefault();

    const isValid = validateFooterForm(this);

    if (isValid) {
        const $form = $(this);

        $form.find('.footer-form-form').hide();
        $form.find('.footer-form-thx').show();
    }
});

function validateFooterForm(form) {
    let isValid = true;
    const $form = $(form);

    const $phone = $form.find('input[name=phone]');
    if ($phone.length > 0 && $phone.val() == '') {
        isValid = false;
        $phone.addClass('error').attr('placeholder', 'Введите номер');
    } else {
        $phone.removeClass('error').attr('placeholder', '+7(999)999-99-99');
    }

    const $name = $form.find('input[name=name]');
    if ($name.length > 0 && $name.val() == '') {
        isValid = false;
        $name.addClass('error').attr('placeholder', 'Введите имя');
    } else {
        $name.removeClass('error').attr('placeholder', 'Ваше имя');
    }

    const $email = $form.find('input[name=email]');
    if ($email.length > 0 && $email.val() == '') {
        isValid = false;
        $email.addClass('error').attr('placeholder', 'Введите email');
    } else {
        $email.removeClass('error').attr('placeholder', 'Ваш email');
    }

    const $message = $form.find('textarea[name=message]');
    if ($message.length > 0 && $message.val() == '') {
        isValid = false;
        $message.addClass('error').attr('placeholder', 'Введите сообщение');
    } else {
        $message.removeClass('error').attr('placeholder', 'Ваше сообщение');
    }

    const $contactFields = $form.find('input[name=contact]');
    if ($contactFields.length > 0 && $form.find('input[name=contact]:checked').length == 0) {
        isValid = false;
        $form.find('.footer-form-select').addClass('error');
    } else {
        $form.find('.footer-form-select').removeClass('error');
    }

    return isValid;
}

$('.reviews__item').click(function () {
    $('.reviews-slider').slick('slickGoTo', $(this).data('slide') - 1);
});

const wow = new WOW();
wow.init();

if ($('#typed').length > 0) {
    var typed = new Typed('#typed', {
        strings: ['Разрабатываем', 'Развиваем', 'Поддерживаем', 'Продвигаем'],
        typeSpeed: 100,
        backSpeed: 100,
        loop: true,
        loopCount: Infinity,
        showCursor: true,
        cursorChar: '|',
        cursorBlinkSpeed: 1000,
    });
}

// Эффект блюра для блоков services__item
$(document).ready(function () {
    // Добавляем элемент блюра к каждому блоку services__item
    $('.services__item').each(function () {
        $(this).append('<div class="services-blur-effect"></div>');
    });

    // Обработчик наведения на блоки services__item
    $('.services__item')
        .on('mouseenter', function () {
            $(this).find('.services-blur-effect').css('opacity', '1');
        })
        .on('mousemove', function (e) {
            const $blur = $(this).find('.services-blur-effect');
            const rect = this.getBoundingClientRect();

            // Позиционируем относительно блока
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            $blur.css({
                left: x + 'px',
                top: y + 'px',
            });
        })
        .on('mouseleave', function () {
            $(this).find('.services-blur-effect').css('opacity', '0');
        });
});

$('[data-popup]').click(function () {
    var popup = $(this).data('popup');
    $(popup).addClass('active');
});

$('.close').click(function () {
    $('.popup').removeClass('active');
});

$('.popup__wrapper').click(function (e) {
    e.stopPropagation();
    if ($(e.target).hasClass('popup__wrapper')) {
        $('.popup').removeClass('active');
    }
});

$('.menu-bottom-burger').click(function () {
    $(this).toggleClass('active');
    $('.header-menu-list').slideToggle();
});

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('btn-menu-bottom_id');
    const header = document.getElementById('hero-block');

    if (!button || !header) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    // Header виден → кнопка скрыта
                    button.classList.remove('visible');
                } else {
                    // Header не виден → кнопка видна
                    button.classList.add('visible');
                }
            });
        },
        { threshold: 0.3 }, // Срабатывает при любом пересечении
    );

    observer.observe(header);
});

document.addEventListener('DOMContentLoaded', function () {
    const timeline = document.querySelector('.long__timeline');

    if (!timeline) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                timeline.classList.add('long__timeline--visible');
                observer.unobserve(timeline);
            });
        },
        { threshold: 0.35 },
    );

    observer.observe(timeline);
});

document.addEventListener('DOMContentLoaded', function () {
    const header = document.querySelector('.header');
    const footer = document.querySelector('.footer');
    const menuBottom = document.querySelector('.menu-bottom');

    if (!header || !footer) return;

    const observer = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                const isFooterVisible = entry.isIntersecting;

                header.classList.toggle('header--hidden', isFooterVisible);

                if (menuBottom) {
                    menuBottom.classList.toggle('menu-bottom--hidden', isFooterVisible);
                }
            });
        },
        { threshold: 0.05 },
    );

    observer.observe(footer);
});

//слайдер с страницы шаблоны "
$(document).ready(function () {
    $('.articles-list').slick({
        variableWidth: true,
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

        prevArrow: '.blog__left',
        nextArrow: '.blog__right',

        responsive: [
            {
                breakpoint: 1440,
                settings: {
                    slidesToShow: 4,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 1024,
                settings: {
                    slidesToShow: 3,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 870,
                settings: {
                    slidesToShow: 2,
                    slidesToScroll: 1,
                },
            },
            {
                breakpoint: 550,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                },
            },
        ],
    });
});

function loadYandexMapScript(apiKey) {
    return new Promise((resolve, reject) => {
        if (window.ymaps3) {
            resolve();
            return;
        }

        const script = document.createElement('script');

        script.src = `https://api-maps.yandex.ru/v3/?apikey=${apiKey}&lang=ru_RU`;
        script.onload = resolve;
        script.onerror = reject;

        document.head.appendChild(script);
    });
}

async function initContactsMap() {
    const mapElement = document.getElementById('contacts-map');

    if (!mapElement) return;

    const apiKey = '188c5186-7f33-407e-9e78-e5a1bee54420';
    const center = mapElement.dataset.center.split(',').map(Number);
    const zoom = Number(mapElement.dataset.zoom) || 15;

    await loadYandexMapScript(apiKey);
    await window.ymaps3.ready;

    const { YMap, YMapDefaultFeaturesLayer, YMapDefaultSchemeLayer, YMapMarker } = window.ymaps3;

    const map = new YMap(mapElement, {
        location: {
            center,
            zoom,
        },
    });

    map.addChild(new YMapDefaultSchemeLayer());
    map.addChild(new YMapDefaultFeaturesLayer());

    const markerElement = document.createElement('div');

    markerElement.className = 'contacts-map__marker';

    map.addChild(
        new YMapMarker(
            {
                coordinates: center,
            },
            markerElement,
        ),
    );
}

initContactsMap();
