# Proyecto-3

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

The CHART flow for the application is:
 
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
GET    | /user/subscriptions   | SI    | User - Admin   | View all his subscriptions | -                                               | `user subscriptions`
POST   | /user/subscriptions   | SI    | User - Admin   | Create one subscription    | `user` `type`                                   | `user new subscription`

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
