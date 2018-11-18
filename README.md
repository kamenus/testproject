# Описание
  Отборочное тестовое задание на курсы стажировки разработчиков пользовательских интерфейсов.
# Установка
  Склонируйте или загрузите репозиторий
  ```Shell
  $ git clone https://ptantemp@bitbucket.org/ptantemp/testproject.git
  ```
  Установите зависимости командой
  ```shell
    yarn install
  ```
  или
  ```shell
    npm install
  ```
  
  Запустите `yarn` или `npm` с командой `start` для запуска dev-сервера
  ```Shell
  yarn start
  ```
  или
  ```Shell
  npm run start
  ```
# Сборка
  Запустите `yarn` или `npm` с командой `build` для сборки проекта (выходная директория `./build`)
```Shell
yarn build
```
  или
```Shell
npm run build
```

***


## Задача

> Разработать модуль пользовательского интерфейса: **«Компонент Таблица»**

### Функциональные требования
- Сортировка: при нажатии по названию столбца происходит сортировка по этому столбцу, при повторном нажатии по названию столбца - сортировка в обратном порядке.
- Фильтрация: поле с кнопкой. При нажатии на кнопку происходит фильтрация данных по введенному значению.
- Пагинация.
- Модуль является независимым.
- Модуль имеет возможность переиспользования.


### Нефункциональные требования:
- Синтаксис `ES5+`.
- Чистый JS без использования сторонних библиотек.
- Чистый `CSS`.
- Данные для тестирования компонента необходимо реализовать самостоятельно в виде js-объекта или json

### Требования к дизайну
Модуль должен быть выполнен в соответствии с макетом.

![Макет](./docs/blank.jpg "Макет")
> Допускаются отклонения от дизайна макета.
### Дополнительные требования
- Код не должен содержать синтаксических ошибок.
- Код должен быть форматирован в соответствии с правилами `ESLint`, `Stylelint`.

- Результат работы должен быть выложен на
[GitHub]("https://github.com")
/
[Bitbucket]("https://bitbucket.org")
