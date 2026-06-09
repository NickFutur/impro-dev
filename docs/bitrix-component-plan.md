# План будущих Bitrix-компонентов

Цель документа — определить, какие текущие HTML-блоки станут компонентами Bitrix, какие данные будут динамическими и какой риск у переноса.

## 1. Компоненты шаблона сайта

| Блок | Текущие классы | Текущий файл | Будущая Bitrix-сущность | Динамические данные | Риск |
| --- | --- | --- | --- | --- | --- |
| Header | `.header`, `.header-menu`, `.menu-bottom` | `src/_html/_base/_includes/_header.html` | Site template + `bitrix:menu` | Пункты меню, ссылки, активный раздел | medium |
| Footer | `.footer`, `.footer-menu`, `.footer-copy` | `src/_html/_base/_includes/_footer.html` | Site template + include areas | Меню, контакты, юридические ссылки, год | low |
| Breadcrumbs | `.breadcrumbs` | `src/*.html` | `bitrix:breadcrumb` | Цепочка разделов и текущая страница | low |
| Popup | `.popup`, `.footer-form` | `src/_html/_base/_includes/_popup.html` | Include area или custom form component | Поля формы, текст политики, success state | medium |

## 2. Контентные списки

| Блок | Текущие классы | Текущий файл | Будущая сущность | Динамические данные | Риск |
| --- | --- | --- | --- | --- | --- |
| Список кейсов | `.cases`, `.cases-item` | `index.html`, `cases.html`, service pages | `bitrix:news.list` по инфоблоку `cases` | Заголовок, картинка, теги, ссылка, порядок, фильтр | medium |
| Фильтр кейсов | `.nav-blog`, `.nav-blog__item` | `cases.html` | `news.list` filter или custom filter | Категории, активный фильтр | medium |
| Список статей | `.blog`, `.blogs`, `.cases-item` | `blog.html`, `index.html` | `bitrix:news.list` по инфоблоку `blog` | Название, дата, категория, превью, ссылка | medium |
| Фильтр статей | `.nav-blog`, `.nav-blog__item` | `blog.html` | `news.list` filter или параметры разделов | Категории статей | medium |
| Список услуг | `.service_list`, `.service_list__item` | `service.html` | `bitrix:news.list` по инфоблоку `services` | Название, описание, ссылка, сортировка | medium |
| Отзывы | `.review`, `.reviews__item` | `index.html`, service pages, `review.html` | `bitrix:news.list` по инфоблоку `reviews` | Автор, текст, изображение/логотип | medium |
| Команда | `.team` | `index.html` | `bitrix:news.list` или include area | Фото, имя, должность, порядок | low |

## 3. Детальные страницы

| Блок | Текущие классы | Текущий файл | Будущая сущность | Динамические данные | Риск |
| --- | --- | --- | --- | --- | --- |
| Детальная статьи | `.article-info`, `.article-text`, `.articles-slider` | `article.html` | `bitrix:news.detail` + related `news.list` | Заголовок, дата, категория, картинка, текст, похожие статьи | medium |
| Детальная кейса | `.project`, `.about-project`, `.about-module` | `case.html` | `bitrix:news.detail` по инфоблоку `cases` | Задача, решение, модули, изображения, CTA | medium |
| Детальная услуги | `.hero--dop`, `.dev`, `.dev-vars`, `.dev-features`, `.how`, `.stages` | `web_dev.html`, `design.html`, `integration.html`, `promotion.html`, `service-maket.html` | `news.detail` или набор include areas/custom components | Тексты, тарифы, преимущества, этапы, связанные кейсы | medium |

## 4. Формы

| Форма | Текущие классы | Текущий файл | Будущая сущность | Динамические данные | Риск |
| --- | --- | --- | --- | --- | --- |
| Footer request form | `.footer-form` | `_footer.html` | `bitrix:form.result.new` или custom AJAX component | Имя, телефон, способ связи, тип услуги, сообщение, согласие | medium |
| Review form | `.review-page-form` | `review.html` | `bitrix:form.result.new` или moderation workflow | Имя, компания, текст, согласие | medium |
| Popup vacancy/contact form | `.popup`, `.footer-form` | `_popup.html` | `bitrix:form.result.new` или custom component | Имя, телефон, способ связи, файл, сообщение | medium |

## 5. Статичные блоки, которые можно оставить include areas

| Блок | Текущие классы | Файлы | Почему не отдельный компонент | Риск |
| --- | --- | --- | --- | --- |
| CTA-секции | `.booking-hero`, `.telegram`, `.long` | `index.html`, service pages | Обычно редактируется текст и ссылка, логики списка нет | low |
| Преимущества | `.features`, `.dev-features` | `index.html`, service pages | Можно сделать include area, если состав редко меняется | medium |
| Этапы работы | `.how`, `.stages` | service pages | При частом редактировании лучше инфоблок, иначе include area | medium |
| Контакты | `.contacts`, `.contacts-details` | `contacts.html` | Данные редактируются редко, нужна простая область | low |
| 404 hero | `.hero--error` | `404.html` | Системная статичная страница | low |

## 6. Рекомендации по данным

| Инфоблок | Рекомендуемые поля |
| --- | --- |
| `blog` | `NAME`, `CODE`, `PREVIEW_TEXT`, `DETAIL_TEXT`, `PREVIEW_PICTURE`, `DETAIL_PICTURE`, `DATE_ACTIVE_FROM`, `CATEGORY`, `TAGS`, `SEO_*` |
| `cases` | `NAME`, `CODE`, `PREVIEW_TEXT`, `DETAIL_TEXT`, `PREVIEW_PICTURE`, `CLIENT`, `INDUSTRY`, `SERVICES`, `TASK`, `RESULT`, `GALLERY`, `TAGS` |
| `services` | `NAME`, `CODE`, `PREVIEW_TEXT`, `DETAIL_TEXT`, `PRICE_FROM`, `DURATION`, `SERVICE_TYPE`, `FEATURES`, `STAGES`, `RELATED_CASES` |
| `reviews` | `NAME`, `PREVIEW_TEXT`, `AUTHOR_ROLE`, `COMPANY`, `PHOTO`, `RATING`, `SOURCE_LINK` |
| `team` | `NAME`, `ROLE`, `PHOTO`, `SORT`, `SOCIAL_LINKS` |

