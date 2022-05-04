# CARONTE SOCIAL NETWORK API
## Related Repository

## Description
Caronte is a crypto social network where investors can share information, stay tune to market updates, create their own portfolio and based on a premium system, subscribe to the content of the most influential users.

## Future updates🌱
Actually working on:
- Updating functions to improve performance

## Badges
![image](https://img.shields.io/badge/Heroku-430098?style=for-the-badge&logo=heroku&logoColor=white)
![image](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
![image](https://img.shields.io/badge/Figma-F24E1E?style=for-the-badge&logo=figma&logoColor=white)
![image](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![image](https://img.shields.io/badge/JWT-000000?style=for-the-badge&logo=JSON%20web%20tokens&logoColor=white)
![image](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)
![image](https://img.shields.io/badge/npm-CB3837?style=for-the-badge&logo=npm&logoColor=white)
![image](https://img.shields.io/badge/JavaScript-323330?style=for-the-badge&logo=javascript&logoColor=F7DF1E)
![image](https://img.shields.io/badge/json-5E5C5C?style=for-the-badge&logo=json&logoColor=white)
![image](https://img.shields.io/badge/prettier-1A2C34?style=for-the-badge&logo=prettier&logoColor=F7BA3E)

## API Endpoints

All API Request must be prepended with `/api`

### Authentication Endpoints

The AUTHENTICATION flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | NO    | -              | User Signup                | `name`, `surname`, `email`, `password`, `username`, `role` | `token`
POST   | /auth/login      | NO    | -              | User Login                 | `email`, `password`                             | `token`

The POST flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /post            | SI    | User - Admin   | View all posts             | -                                                | `all posts`
GET    | /post/:postId    | SI    | User - Admin   | View one post              | -                                               | `post`
POST   | /post            | SI    | User - Admin   | Create one post            | `user`, `title`, `content`, `publishDate`, `premium` | `post`                         
PUT    | /post/:postId    | SI    | User - Admin   | Edit one post              | `title`, `content`, `category`, `premium`       | `updated post`
DELETE | /post/:postId    | SI    | User - Admin   | Delete one post            | -                                               | `empty object`

The COMMENT flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /post/:postId/comment | SI    | User - Admin | Create a comment inside a post | `user`, `content`, `publishDate`         | `comment`
POST   | /post/:postId/comment/:commentId   | SI    | User - Admin | Post a comment inside a comment | `user`, `content`, `publishDate` | `comment`
PUT    | /post/:postId/comment/:commentId   | SI    | User - Admin   | Edit one comment | `content`                               | `updated comment`
DELETE | /post/:postId/comment/:commentId   | SI    |    Admin       | Delete one comment | -                                     | `empty object`

The PROFILE flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/profile         | SI    | User - Admin   | View his profile           | -                                               | `user`
PUT    | /user/profile         | SI    | User - Admin   | Edit his profile           | `password` `username` `photo` `description` `mailing` `country` | `updated user`
DELETE | /user/profile         | SI    | User - Admin   | Delete his profile         | -                                               | `empty object`

The PORTFOLIO flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/portfolio       | SI    | User - Admin   | View all his portfolio     |  -                                              | `all user portfolio`
GET    | /user/portfolio/:portfolioId | SI    | User - Admin   | View his portfolio  |  -                                              | `user portfolio`
POST   | /user/portfolio       | SI    | User - Admin   | Create his portfolio       |  `title` `description`                          | `new user portfolio`
PUT    | /user/portfolio/:portfolioId | SI    | User - Admin   | Edit his portfolio  |  `title` `description`                          | `updated user portfolio` 
DELETE | /user/portfolio/:portfolioId | SI    | User - Admin   | Delete his portfolio       |  -                                       | `empty object`

The CHART flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/portfolio/:portfolioId/chart | SI    | User - Admin   | View portfolio chart |  -                                  | `user portfolio chart`
GET    | /user/portfolio/:portfolioId/chart/piechart | SI    | User - Admin   | View portfolio chart |  -                               | `user portfolio chart`
PUT    | /user/portfolio/:portfolioId/chart | SI    | User - Admin   | Edit portfolio chart |  `title` `description`              | `updated user portfolio chart` 

The DATA flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /data/topList    | SI    | User - Admin   | View toplist               |  -                                              | `toplist 24h`
GET    | /data/news       | SI    | User - Admin   | View news                  |  -                                              | `news` 

The COIN flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /user/portfolio/coin | SI    | User - Admin   | Create a coin       |  `coin` `amount` `price` `date`                 | `new user portfolio coin`
PUT    | /user/portfolio/:portfolioId/coin/:coinId | SI    | User - Admin   | Edit coin |  `coin` `amount` `price` `dat        | `updated user portfolio coin` 
DELETE | /user/portfolio/:portfolioId/coin/:coinId | SI    | User - Admin   | Delete coin |  -                                 | `portfolio`

The CHAT flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /chat            | SI    | User - Admin   | View all his chats         | -                                               | `all chats`
GET    | /chat/:chatId    | SI    | User - Admin   | View one chat              | -                                               | `chat messages`
DELETE | /chat/:chatId    | SI    | User - Admin   | Delete one chat            | -                                               | `empty object`

The NOTIFICATION flow for the application is:

METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/notification    | SI    | User - Admin   | View all his notification  | -                                               | `all user notifications`
DELETE | /user/notification    | SI    | User - Admin   | Delete one notification    | -                                               | `empty object`

The BOOKMARKS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/bookmarks       | SI    | User - Admin   | View all his bookmarks     | -                                               | `user bookmarks`
DELETE | /user/bookmarks/:postId | SI    | User - Admin   | Delete one bookmark        | `user bookmarks`                                | `user updated bookmarks`

The FEED flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/feed            | SI    | User - Admin   | View his feed              | -                                               |`user feed`
DELETE | /user/feed            | SI    | User - Admin   | Delete one user post feed  | `user feed`                                     |`user updated feed`

The FOLLOWERS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/followers       | SI    | User - Admin   | View all his follower      | -                                               | `user followers`

The FOLLOWING flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/following       | SI    | User - Admin   | View all his follows       | -                                               | `user followings`
POST   | /user/following/:userId | SI    | User - Admin   | Add one follow             | `user following`                                | `user updated following`
DELETE | /user/following/:userId | SI    | User - Admin   | Delete one follow          | `user following`                                | `user updated following` 

The SUBSCRIPTION flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/subscriptions | SI    | User - Admin   | View all his subscriptions | -                                            | `user subscriptions`
POST   | /user/subscriptions/:userId | SI    | User - Admin   | Create one subscription | `user` `type`                           | `user new subscription`

The SUBSCRIBERS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/subscribers     | SI    | User - Admin   | View all his subscribers   | -                                               | `user subscribers`

The PRIVACY flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /user/privacy         | SI    | User - Admin   | View all his privacy options | -                                             | `user privacy`
PUT    | /user/privacy         | SI    | User - Admin   | Edit his privacy options   | `postNotifcation` `commentNotification`         | `user updated privacy`

The REPORTS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /report          | SI    |     Admin      | View all reports           | -                                               | `all reports`
POST   | /report          | SI    | User - Admin   | Create a report            | `user` `reason` `date`                          | `new report`
PUT    | /report          | SI    |     Admin      | Edit one report            | `status`                                        | `updated report`

The USERS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /users           | SI    |  User - Admin  | View all users             | -                                               | `all users`
GET    | /users/:userId   | SI    |  User - Admin  | View one user              | -                                               | `user`
PUT    | /users/:userId   | SI    |     Admin      | Edit one user              |  `role` `premium`                               | `updated user`
DELETE | /users/:userId   | SI    |     Admin      | Delete one user            | -                                               | `empty object`

## Authors
#### Jonathan Pulido
jonathanpmelian@gmail.com
#### Alexis Rodriguez
k4nijo@gmail.com
## Contribution
Contributions, issues, and feature requests are welcome!
## License
[MIT](https://github.com/jonathanpmelian/Caronte-Social-Network-API/blob/main/LICENSE)
## Support
Give a ⭐️ if you like this project!
