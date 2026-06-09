# Карта будущей Bitrix-архитектуры

Документ описывает будущую посадку текущей HTML/SCSS/JS/Gulp-вёрстки на 1С-Битрикс. На этом этапе проект не переводится на PHP: карта нужна как техническое задание для будущей интеграции.

## 1. Текущая структура проекта

| Зона | Текущий путь | Роль сейчас | Роль при посадке |
| --- | --- | --- | --- |
| Layout | `src/_html/_base/_layouts/_default.html` | Общий Nunjucks-layout | Основа для `header.php`, `footer.php` и рабочей области |
| Header | `src/_html/_base/_includes/_header.html` | Общая шапка и меню | `local/templates/impro/header.php` + компоненты меню |
| Footer | `src/_html/_base/_includes/_footer.html` | Общий подвал, меню, форма | `local/templates/impro/footer.php` + include areas + форма |
| Popup | `src/_html/_base/_includes/_popup.html` | Общая popup-форма | Include area или отдельный form/custom component |
| Pages | `src/*.html` | Статические страницы | Рабочая область страниц/разделов Bitrix |
| Styles | `src/assets/css/app.scss` | SCSS entrypoint | `template_styles.css` или шаблонные assets |
| Scripts | `src/assets/js/app.js` | Общий JS entrypoint | Шаблонный JS asset с привязкой через `Asset::getInstance()` |
| Static assets | `src/assets/img`, `src/assets/fonts` | Изображения и шрифты | `local/templates/impro/assets/` |
| Build output | `dist/` | Собранный preview | Не редактировать вручную, использовать как референс |

## 2. Gulp-сборка

| Пункт | Значение |
| --- | --- |
| Основная команда | `npm run build` |
| Фактическая Gulp-задача | `gulp build --prod` |
| Проверка исходников | `npm run check` |
| Конфиг путей | `projectСonfig.json` |
| Source | `src/` |
| Output | `dist/` |

Важно: файл `projectСonfig.json` содержит кириллическую букву `С` в имени. При переносе или настройке CI это нужно учитывать, потому что визуально имя похоже на `projectConfig.json`, но это другой путь.

## 3. Будущая структура `/local/templates/impro/`

```text
/local/templates/impro/
├── header.php
├── footer.php
├── template_styles.css
├── description.php
├── assets/
│   ├── css/
│   ├── js/
│   ├── img/
│   └── fonts/
├── include/
│   ├── footer-contacts.php
│   ├── footer-policy-links.php
│   ├── footer-form-success.php
│   ├── homepage-hero.php
│   └── common-cta.php
└── components/
    └── bitrix/
        ├── menu/
        ├── breadcrumb/
        ├── news.list/
        ├── news.detail/
        └── form.result.new/
```

## 4. Разделение на template и work area

| Тип | Что входит | Текущие файлы/классы | Bitrix-сущность | Риск |
| --- | --- | --- | --- | --- |
| Site template | Header, footer, глобальные assets, popup | `_header.html`, `_footer.html`, `_popup.html`, `_default.html` | Шаблон сайта | low |
| Menu | Верхнее и нижнее меню, footer-меню | `.header-menu`, `.menu-bottom`, `.footer-menu` | `bitrix:menu` | medium |
| Breadcrumbs | Хлебные крошки страниц | `.breadcrumbs` в большинстве страниц | `bitrix:breadcrumb` | low |
| Work area | Контент конкретной страницы | `src/*.html` внутри `{% block content %}` | Контент раздела/страницы | low |
| Forms | Общая footer-форма, review-форма, popup-форма | `.footer-form`, `.review-page-form` | `bitrix:form.result.new` или custom endpoint | medium |
| Lists | Кейсы, статьи, услуги, отзывы | `.cases`, `.blog`, `.service_list`, `.review` | `news.list` / custom templates | medium |
| Details | Статья и кейс | `article.html`, `case.html` | `news.detail` | medium |

## 5. Карта страниц

| Страница | Назначение | Будущая сущность |
| --- | --- | --- |
| `index.html` | Главная | Главная страница + набор include areas/news.list |
| `blog.html` | Список статей | Раздел инфоблока `blog` + `news.list` |
| `article.html` | Детальная статьи | `news.detail` инфоблока `blog` |
| `cases.html` | Список кейсов | Раздел инфоблока `cases` + `news.list` |
| `case.html` | Детальная кейса | `news.detail` инфоблока `cases` |
| `service.html` | Список услуг | Раздел инфоблока `services` |
| `web_dev.html` | Услуга разработки | `news.detail` или статичная посадочная услуги |
| `design.html` | Услуга дизайна | `news.detail` или статичная посадочная услуги |
| `integration.html` | Услуга интеграций | `news.detail` или статичная посадочная услуги |
| `promotion.html` | Услуга продвижения | `news.detail` или статичная посадочная услуги |
| `service-maket.html` | Услуга вёрстки/макета | `news.detail` или статичная посадочная услуги |
| `contacts.html` | Контакты | Статичная страница + include areas |
| `review.html` | Отзывы/форма отзыва | `news.list` + form component |
| `404.html` | Ошибка | Системная страница 404 |

## 6. Include areas

| Блок | Где используется | Что редактируется из CMS | Риск |
| --- | --- | --- | --- |
| Footer contacts | `_footer.html` | Телефон, email, адрес, соцсети | low |
| Footer legal links | `_footer.html` | Политика, соглашение, копирайт | low |
| Footer form text | `_footer.html` | Заголовок, подзаголовок, текст успеха | low |
| Main hero text | `index.html` | Заголовок, CTA, подзаголовок | medium |
| Service page hero | `web_dev.html`, `design.html`, `integration.html`, `promotion.html`, `service-maket.html` | Заголовок, описание, CTA | medium |
| Common CTA | `.booking-hero`, `.telegram`, `.long` | Тексты CTA и ссылки | medium |
| Contacts details | `contacts.html` | Контактные данные и реквизиты | low |

## 7. Будущие инфоблоки

| Инфоблок | Текущие страницы | Основные свойства |
| --- | --- | --- |
| `blog` | `blog.html`, `article.html` | Название, превью, дата, категория, картинка, детальный текст, SEO |
| `cases` | `cases.html`, `case.html`, блоки `.cases` на главной и услугах | Название, превью, категории, отрасль, задача, результат, изображения |
| `services` | `service.html`, service landing pages | Название, тип услуги, цена/срок, преимущества, этапы, related services |
| `reviews` | `review.html`, блоки `.review` | Автор, компания, текст, рейтинг/тип, изображение |
| `team` | `index.html` | Имя, роль, фото, порядок сортировки |
| `faq` или `stages` | service landing pages | Вопрос/этап, описание, сортировка |

