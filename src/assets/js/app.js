if ($("#lottie-scroll-1").length > 0) {
  LottieInteractivity.create({
    mode: "scroll",
    player: "#lottie-scroll-1", //ID lottie-player в зеро-блоке и тут должны совпадать
    actions: [
      {
        visibility: [1, 1], // отступ от низа экрана, когда анимация на паузе
        type: "stop", //Анимация на паузе
        frames: [0], //Количество кадров на паузе
      },
      {
        visibility: [0.2, 0.6],
        type: "seek", //Анимация проигрывается по скролу
        frames: [0, 125], // С какого по какой кадр будет проигрываться анимация
      },
      {
        visibility: [0.6, 1.0],
        type: "loop", //Анимация зациклена и проигрывает автоматически
        frames: [0, 125],
      },
    ],
  });
}

$(document).ready(function () {
  $(".reviews-slider").slick({
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
  $(".blog__list").slick({
    variableWidth: true,
    slidesToScroll: 1,
    arrows: false,
    dots: false,
    infinite: false,
  });
}

$(".header-menu-head").click(function () {
  $(this).toggleClass("active");
  $(this).next().slideToggle();
});

$('.footer-form-input[name="phone"]').mask("+7 (999) 999-99-99");

$(".footer-form-choose-label").click(function () {
  $(".footer-form-choose-label").removeClass("active");
  $(this).addClass("active");
});

$(".footer-form-select-head").click(function () {
  $(this).next().slideToggle();
});
$(".footer-form-select-option").click(function () {
  $(".footer-form-select-options").slideUp();
  $(".footer-form-select-head").addClass("active");
  $(".footer-form-select-head").html($(this).find("span").text());
});

$(".reviews__item").click(function () {
  $(".reviews-slider").slick("slickGoTo", $(this).data("slide") - 1);
});

wow = new WOW().init();

if ($("#typed").length > 0) {
  var typed = new Typed("#typed", {
    strings: ["Разрабатываем", "Развиваем", "Поддерживаем", "Продвигаем"],
    typeSpeed: 100,
    backSpeed: 100,
    loop: true,
    loopCount: Infinity,
    showCursor: true,
    cursorChar: "|",
    cursorBlinkSpeed: 1000,
  });
}

// Эффект блюра для блоков services__item
$(document).ready(function () {
  // Добавляем элемент блюра к каждому блоку services__item
  $(".services__item").each(function () {
    $(this).append('<div class="services-blur-effect"></div>');
  });

  // Добавляем CSS для плавного перемещения
  $("<style>")
    .text(
      ".services-blur-effect { transition: left 0.3s ease-out, top 0.3s ease-out, opacity 0.3s ease; }",
    )
    .appendTo("head");

  // Обработчик наведения на блоки services__item
  $(".services__item")
    .on("mouseenter", function () {
      $(this).find(".services-blur-effect").css("opacity", "1");
    })
    .on("mousemove", function (e) {
      const $blur = $(this).find(".services-blur-effect");
      const rect = this.getBoundingClientRect();

      // Позиционируем относительно блока
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      $blur.css({
        left: x + "px",
        top: y + "px",
      });
    })
    .on("mouseleave", function () {
      $(this).find(".services-blur-effect").css("opacity", "0");
    });
});

$("[data-popup]").click(function () {
  var popup = $(this).data("popup");
  $(popup).addClass("active");
});

$(".close").click(function () {
  $(".popup").removeClass("active");
});

$(".popup__wrapper").click(function (e) {
  e.stopPropagation();
  if ($(e.target).hasClass("popup__wrapper")) {
    $(".popup").removeClass("active");
  }
});

$(".menu-bottom-burger").click(function () {
  $(this).toggleClass("active");
  $(".header-menu-list").slideToggle();
});

document.addEventListener("DOMContentLoaded", function () {
  const button = document.getElementById("btn-menu-bottom_id");
  const header = document.getElementById("hero-block");

  if (!button || !header) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          // Header виден → кнопка скрыта
          button.classList.remove("visible");
        } else {
          // Header не виден → кнопка видна
          button.classList.add("visible");
        }
      });
    },
    { threshold: 0.3 }, // Срабатывает при любом пересечении
  );

  observer.observe(header);
});

//слайдер с страницы шаблоны "
$(document).ready(function () {
  $(".articles-list").slick({
    variableWidth: true,
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 1,

    prevArrow: ".blog__left",
    nextArrow: ".blog__right",

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
