# Proyecto-3

## API Endpoints

All API Request must be prepended with `/api`

### Authentication Endpoints

The AUTHENTICATION flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /auth/signup     | NO    | -              | User Signup                | `name`, `surname`, `email`, `password`, `phone`, `role` | `token`
POST   | /auth/login      | NO    | -              | User Login                 | `email`, `password`                             | `token`

The POST flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /post            | SI    | User - Admin   | View all posts             | -                                                | `list of all posts`
GET    | /post/:postId    | SI    | User - Admin   | View one post              | -                                               | `object a postId`
POST   | /post            | SI    | User - Admin   | Create one post            | `user`, `title`, `content`, `category`, `publishDate`, `premium` | `object with new post`                               | 
PUT    | /post/:postId    | SI    | User - Admin   | Edit one post              | `user`, `title`, `content`, `category`, `publishDate`, `premium`                                        | `object with updated post`
DELETE | /post/:postId    | SI    | User - Admin   | Delete one post            | `password`                                        | `object with deleted post`

The COMMENT flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
POST   | /post/:postId/comment | SI    | User - Admin | Create a comment inside a post | `user`, `content`, `like`, `publishDate`                | `object with new comment of a post`
POST   | /post/:postId/comment/:commentId   | SI    | User - Admin | Post a comment inside a comment | `user`, `content`, `like`, `publishDate`  | `object with new comment of a comment`
PUT    | /post/:postId/comment/:commentId   | SI    | User - Admin   | Edit one comment | -                                        | `object with updated comment`

The PROFILE flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /profile         | SI    | User - Admin   | View his profile           | -                                               | `
PUT    | /profile         | SI    | User - Admin   | Edit his profile           | -                                               |
DELETE | /profile         | SI    | User - Admin   | Delete his profile         | -                                                |

The PORTFOLIO flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /portfolio       | SI    | User - Admin   | View his portfolio         |                                                 |
POST   | /portfolio       | SI    | User - Admin   | Create his portfolio       |                                                 |
PUT    | /portfolio       | SI    | User - Admin   | Edit his portfolio         |                                                 |
DELETE | /portfolio       | SI    | User - Admin   | Delete his portfolio       |                                                 |

The CHAT flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /chat            | SI    | User - Admin   | View all his chats         |                                                 |
GET    | /chat/:chatId    | SI    | User - Admin   | View one chat              |                                                 |
DELETE | /chat/:chatId    | SI    | User - Admin   | Delete one chat            |                                                 |

The RANKING flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /ranking         | SI    | User - Admin   | View users ranking         |                                                 |

The NOTIFICATION flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /notification    | SI    | User - Admin   | View all his notification  |                                                 |
DELETE | /notification    | SI    | User - Admin   | Delete one notification    |                                                 |

The BOOKMARKS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /bookmarks       | SI    | User - Admin   | View all his bookmarks     |                                                 |
PUT    | /bookmarks       | SI    | User - Admin   | Edit his bookmarks         |                                                 |

The FEED flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /feed            | SI    | User - Admin   | View his feed              |                                                 |
PUT    | /feed            | SI    | User - Admin   | Edit his feed              |                                                 |

The FOLLOWERS flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /followers       | SI    | User - Admin   | View all his follower      |                                                 |

The FOLLOWING flow for the application is:
 
METHOD | ENDPOINT         | TOKEN |     ROL        |  DESCRIPTION               | POST PARAMS                                     | RETURNS
-------|------------------|-------|----------------|----------------------------|-------------------------------------------------|--------------------
GET    | /following       | SI    | User - Admin   | View all his follows       |                                                 |
PUT    | /following       | SI    | User - Admin   | Edit his follows           |                                                 |
