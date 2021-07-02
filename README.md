# GreenhouseSpa

## Описание проекта
Frontend приложения сбора и визуализации данных теплицы.
Есть возможность авторизации и регистрации. Можно зайти в свой аккаунт и создать теплицы, создать контроллеры (температура, влажность и освещение). Можно поставить контроллеры в определенную теплицу (то есть сгрупировать по теплице). В своем кабинете можно посмотреть графики изменения значений освещения, влажности и температуры, выбрав нужную теплицу и диапазон по дате и времени.

Для функционирования приложения требуется рабочий бекенд.
За заполнение данных (а именно отчеты по температуре, влажности и освещении) отвечают десктоп приложения.

## Библиотеке используемые в приложении.
* Angular Material (модуль/библиотека от Angular для UI компонентов и стилей).
* Bootstrap (библиотка для UI, расширяет CSS, имеет встроенные стили для удобной и простой верстки).
* MdBootstrap (библиотека для графиков и диаграм, позволяет максимально просто рисовать красивые графики).

Ссылка на документацию MdBootstrap: https://mdbootstrap.com/docs/angular/advanced/charts/


# GreenhouseSpa

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.0.4.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
