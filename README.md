## Початок

Встановлюємо [MongoDB Community Server](https://www.mongodb.com/try/download/community).

Встановлюємо або оновлюємо [Node.js](https://nodejs.org/uk/download/) (до 14.15.1)

Перевірити версію `node --version`

Завантажуємо проект та встановлюємо.
#### `npm install`

Створити папку для нашої БД: `C:\mongodb\db`

Заповнити тестовими даними БД: 
#### `node initialdb.js`

Логін доступу до тестових даних: `admin@gmail.com`

Пароль: `123`  
 
## Запуск

Стартуємо БД
#### `mongodb.bat`

*Якщо у когось інші шляхи до БД, то створюємо власний .bat* 

Стартуємо сервер Node.js
#### `npm run server`

## Доступ до сайту

Сервер/веб-сайт: [http://localhost:5000](http://localhost:5000)


## REST API

*Так як на сервері буде також сайт на html, то, для сумісності, в лінках додано add/update/delete, бо з html ми зможемо відправляти на сервер тільки GET/POST.*

*Якщо будуть якісь зміни по API, то інформацію будемо відкориговувати/доповнювати.*

#### User

GET `/api/user/:id` - інфо про користувача

POST `/api/user/add` - додаємо користувача

POST `/api/user/login` - авторизація

POST (PUT) `/api/user/:id/update` - змінюємо

#### Event

GET `/api/event` - всі

GET `/api/event/:id` - інфо

POST `/api/event/add` - додаємо

POST (PUT) `/api/event/:id/update` - змінюємо

DELETE (GET)`/api/event/:id/delete` - видаляємо

#### Habit

GET `/api/habit`

GET `/api/habit/:id`

POST `/api/habit/add`

POST (PUT) `/api/habit/:id/update` - змінюємо

DELETE (GET)`/api/habit/:id/delete` - видаляємо

#### Topic

GET `/api/topic`

GET `/api/topic/:id`

GET `/api/topic/:id/events` - всі події у вибраній категорії

POST `/api/topic/add`

POST (PUT) `/api/topic/:id/update` - змінюємо

DELETE (GET)`/api/topic/:id/delete` - видаляємо

#### ToDo

GET `/api/todo`

GET `/api/todo/:id`

POST `/api/todo/add`

POST (PUT) `/api/todo/:id/update` - змінюємо

DELETE (GET)`/api/todo/:id/delete` - видаляємо

#### Entity

GET `/api/entity`

GET `/api/entity/:id`

POST `/api/entity/add`

POST (PUT) `/api/entity/:id/update` - змінюємо

DELETE (GET)`/api/entity/:id/delete` - видаляємо

#### Deadline

GET `/api/deadline` - всі Deadlines користувача по всіх Entities

GET `/api/deadline/:id`

POST `/api/deadline/entity/:id/add` - додаємо до конкретної Entity

POST (PUT) `/api/deadline/:id/update` - змінюємо

DELETE (GET)`/api/deadline/:id/delete` - видаляємо
