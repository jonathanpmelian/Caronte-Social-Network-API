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
DELETE    | /post/:postId/comment/:commentId   | SI    |    Admin       | Delete one comment | -                                  | `empty object`

The PROFILE flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /profile         | SI    | User - Admin   | View his profile           | -                                               | `user`
PUT    | /profile         | SI    | User - Admin   | Edit his profile           | `password` `username` `photo` `description` `mailing` `country` | `updated user`
DELETE | /profile         | SI    | User - Admin   | Delete his profile         | -                                               | `empty object`

The PORTFOLIO flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /portfolio       | SI    | User - Admin   | View his portfolio         |  -                                              | `user portfolio`
POST   | /portfolio       | SI    | User - Admin   | Create his portfolio       |  `coin` `amount` `price` `date`                 | `new user portfolio`
PUT    | /portfolio       | SI    | User - Admin   | Edit his portfolio         |  `coin` `amount` `price` `dat                   | `updated user portfolio` 
DELETE | /portfolio       | SI    | User - Admin   | Delete his portfolio       |  -                                              | `empty object`

The CHAT flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /chat            | SI    | User - Admin   | View all his chats         | -                                               | `all chats`
GET    | /chat/:chatId    | SI    | User - Admin   | View one chat              | -                                               | `chat messages`
DELETE | /chat/:chatId    | SI    | User - Admin   | Delete one chat            | -                                               | `empty object`

The NOTIFICATION flow for the application is:

METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /notification    | SI    | User - Admin   | View all his notification  | -                                               | `all user notifications`
DELETE | /notification    | SI    | User - Admin   | Delete one notification    | -                                               | `empty object`

The BOOKMARKS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /bookmarks       | SI    | User - Admin   | View all his bookmarks     | -                                               | `user bookmarks`
PUT   | /bookmarks       | SI    | User - Admin   | Edit his bookmarks         | `user bookmarks`                                | `user updated bookmarks`

The FEED flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /feed            | SI    | User - Admin   | View his feed              | -                                               |`user feed`
PUT   | /feed            | SI    | User - Admin   | Edit his feed              | `user feed`                                     |`user updated feed`

The FOLLOWERS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /followers       | SI    | User - Admin   | View all his follower      | -                                               | `user followers`

The FOLLOWING flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /following       | SI    | User - Admin   | View all his follows       | -                                               | `user followings`
PUT  | /following       | SI    | User - Admin   | Edit his follows           | `user following`                                | `user updated following` 

The SUBSCRIPTION flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /subscriptions   | SI    | User - Admin   | View all his subscriptions | -                                               | `user subscriptions`
POST   | /subscriptions   | SI    | User - Admin   | Create one subscription    | `user` `type`                                   | `user new subscription`

The SUBSCRIBERS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /subscribers     | SI    | User - Admin   | View all his subscribers   | -                                               | `user subscribers`

The PRIVACY flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /privacy         | SI    | User - Admin   | View all his privacy options | -                                             | `user privacy`
PUT    | /privacy         | SI    | User - Admin   | Edit his privacy options   | `postNotifcation` `commentNotification`         | `user updated privacy`

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
PUT    | /users           | SI    |     Admin      | Edit one user              |  `role` `premium`                               | `updated user`
DELETE | /users           | SI    |     Admin      | Delete one user            | -                                               | `empty object`
