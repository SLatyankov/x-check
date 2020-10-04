# x-check
Дополнительный функционал:
- ментор может сам добавлять себе студентов - для этого имеется окно с выбором под общим меню
- у админа имеется возможность добавлять спецроль студентам в своём меню

- Используемые технологии:
React,
Node.js,
Ant Design,
firebase.

 - Инструкциея для начала разработки:
Скачайте репозиторий на свой компьютер по ссылке https://github.com/alpoliakov/x-check.git
Запустите проект и запустите команду npm install  для того чтобы загрузить все зависимости

Во время разработки
1. используйте папку  page для размещения ваших страниц, переход на которые происходит по ссылке
2. Папка interfaces служит для хранения интерфейсов
3. Папка services содержит утилиты.
4. Папка components для компонент не являющихся самостоятельными страницами.
5. styles для глобальных стилей.

 - Для деплоя продакшн версии:
npm run build / yarn build

Для деплоя:
1) Форкните репозиторий https://github.com/SLatyankov/x-check
2) Зарегистрируйтесь в Vercel (кредитная карта не требуется)
3) После регистрации вы попадете на страницу «Импорт проекта». В разделе «Из репозитория Git» выберите поставщика Git, который вы используете, и настройте интеграцию.
4) После настройки нажмите «Импортировать проект из…» и импортируйте приложение Next.js. Он автоматически определяет, что ваше приложение использует Next.js, и настраивает конфигурацию сборки за вас. Не нужно ничего менять - все должно работать нормально!
5) После импорта оно развернет ваше приложение Next.js и предоставит вам URL развертывания. Нажмите «Посетить», чтобы увидеть ваше приложение в разработке.
