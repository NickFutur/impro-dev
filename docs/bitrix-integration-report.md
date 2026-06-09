# Отчёт для будущей посадки на 1С-Битрикс

Проект сейчас остаётся статической HTML/SCSS/JS-вёрсткой на Gulp. Отчёт фиксирует, как передать проект Bitrix-разработчику без преждевременного перевода файлов на PHP.

## 1. Общая оценка

| Пункт | Статус |
| --- | --- |
| Визуальная структура | Уже разделена на страницы и общие partials |
| Общий layout | Есть Nunjucks-layout в `src/_html/_base/_layouts/_default.html` |
| Header/footer | Вынесены в include-файлы |
| Gulp-сборка | Используется `gulpfile.js`, source `src/`, output `dist/` |
| Проверки | Есть `npm run check` для SCSS/JS/HTML |
| Готовность к Bitrix | Хорошая для этапа карты и компонентного планирования |

Главное правило для интеграции: переносить в Bitrix нужно source-структуру из `src`, а `dist` использовать как собранный визуальный референс.

## 2. Что уйдёт в шаблон сайта

| Будущий файл Bitrix | Источник | Содержимое |
| --- | --- | --- |
| `header.php` | `_default.html`, `_header.html` | `head`, подключение assets, начало body, шапка, верхнее меню |
| `footer.php` | `_footer.html`, `_popup.html`, `_default.html` | Footer, формы, popup, закрывающие теги, подключение JS |
| `template_styles.css` / assets | `src/assets/css/app.scss` | Общие стили проекта |
| `assets/js/app.js` | `src/assets/js/app.js` | Общая клиентская логика |
| `assets/img`, `assets/fonts` | `src/assets/img`, `src/assets/fonts` | Шрифты, изображения, SVG, webp |

## 3. Что станет компонентами

| Направление | Текущие файлы | Будущий компонент |
| --- | --- | --- |
| Меню | `_header.html`, `_footer.html` | `bitrix:menu` с отдельными типами меню |
| Хлебные крошки | `src/*.html` | `bitrix:breadcrumb` |
| Кейсы | `cases.html`, `case.html`, блоки `.cases` | `bitrix:news`, `news.list`, `news.detail` |
| Блог | `blog.html`, `article.html` | `bitrix:news`, `news.list`, `news.detail` |
| Услуги | `service.html`, service landing pages | `news.list`, `news.detail` или custom service components |
| Отзывы | `review.html`, блоки `.review` | `news.list` + form component |
| Формы | `_footer.html`, `_popup.html`, `review.html` | `bitrix:form.result.new` или custom AJAX component |

Подробная компонентная карта вынесена в `docs/bitrix-component-plan.md`.

## 4. Будущие инфоблоки

| Инфоблок | Зачем нужен | Детальная страница |
| --- | --- | --- |
| `blog` | Статьи и категории блога | Да, по шаблону `article.html` |
| `cases` | Кейсы, фильтры и связанные кейсы | Да, по шаблону `case.html` |
| `services` | Услуги и посадочные страницы услуг | Да или статичная рабочая область |
| `reviews` | Отзывы на главной и странице отзывов | Обычно нет, можно detail отключить |
| `team` | Команда на главной | Нет |
| `faq/stages` | Этапы и FAQ на страницах услуг | Нет или как свойства услуги |

## 5. Include areas

| Область | Источник | Что должен редактировать контент-менеджер |
| --- | --- | --- |
| Footer contacts | `_footer.html` | Телефон, email, адрес, соцсети |
| Footer legal | `_footer.html` | Политика, соглашение, копирайт |
| Footer form text | `_footer.html` | Заголовок формы, подзаголовок, success text |
| Hero main | `index.html` | Основной оффер и CTA |
| CTA blocks | `.booking-hero`, `.telegram`, `.long` | Текст, кнопка, ссылка |
| Contacts page | `contacts.html` | Контактные данные и реквизиты |
| Service static text | service pages | Текстовые блоки, если не выносить в инфоблок |

## 6. JS-логика для переноса

| Логика | Где сейчас | Комментарий для Bitrix |
| --- | --- | --- |
| Lottie interactivity | `src/assets/js/app.js` | Проверять наличие DOM-элемента перед инициализацией |
| Menu toggle | `src/assets/js/app.js` | Оставить в шаблонном JS |
| Маска телефона | `src/assets/js/app.js` | Подключать только если сохранится jQuery mask |
| Footer form validation | `src/assets/js/app.js` | При Bitrix-формах синхронизировать имена полей |
| Popup open/close | `src/assets/js/app.js` | Работает как template behavior |
| Review item click | `src/assets/js/app.js` | Проверить после динамического вывода отзывов |
| Cases/blog filters | inline scripts в `blog.html`, `cases.html` | Лучше вынести в общий JS или component template JS перед посадкой |
| Current year | `src/assets/js/app.js` + `_footer.html` | Можно оставить на JS или заменить серверным годом |

## 7. Формы

| Форма | Текущий источник | Что сделать при посадке |
| --- | --- | --- |
| Заявка в footer | `_footer.html` | Подключить Bitrix form/custom endpoint, сохранить клиентскую валидацию |
| Popup-форма | `_popup.html` | Определить назначение: вакансия, заявка или отдельная web-form |
| Форма отзыва | `review.html` | Добавить модерацию и антиспам |

Критичный момент: сейчас формы фронтовые. Перед production-посадкой нужен backend-обработчик, защита от спама, согласие с политикой и нормальная обработка ошибок.

## 8. Риски перед посадкой

| Риск | Уровень | Что делать |
| --- | --- | --- |
| Статические карточки кейсов/статей продублированы в HTML | medium | Перенести данные в инфоблоки, HTML оставить шаблоном элемента |
| Часть ссылок может быть пустой или временной | medium | Составить карту URL и заменить на `SITE_DIR`/роуты разделов |
| Inline-фильтры на страницах списков | medium | Вынести в JS component template или общий модуль |
| Gulp config имеет кириллическую `С` в имени файла | low | Не переименовывать без отдельной проверки, но зафиксировать для CI |
| Формы без backend-интеграции | medium | Подключить Bitrix forms/custom endpoint |
| Стили глобальные, возможны конфликты с Bitrix/админ-панелью | medium | Подключать assets только в публичном шаблоне, не смешивать с админкой |

## 9. Что уже подготовлено

- Общие header/footer/popup вынесены в partials.
- Основные страницы используют единый layout.
- Ключевые повторяющиеся блоки уже имеют стабильные BEM-классы.
- Footer-форма обрабатывается в общем JS, а не дублируется по страницам.
- Копирайт в footer подготовлен под динамический текущий год.
- `npm run build` запускает одноразовую Gulp production-сборку.

## 10. Что делать при посадке

1. Зафиксировать визуальный эталон по `dist` после `npm run build`.
2. Создать шаблон `/local/templates/impro/`.
3. Перенести header/footer/assets без изменения классов.
4. Подключить меню и breadcrumbs через штатные компоненты.
5. Создать инфоблоки `blog`, `cases`, `services`, `reviews`.
6. Перенести карточки в `news.list` templates, детали — в `news.detail`.
7. Подключить формы через Bitrix form/custom endpoint.
8. Проверить главную, списки, детали, формы и адаптив на breakpoint-ах.
9. Не редактировать `dist` вручную; все изменения делать в `src` и пересобирать Gulp.

