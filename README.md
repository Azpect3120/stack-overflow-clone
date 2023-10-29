# API Routes

## Post Routes

All post routes start with `/posts`.

### Get All Posts

- **Method**: GET
- **Route**: `/`

### Search All Posts

- **Method**: GET
- **Route**: `/search?query=input`

### Create Post

- **Method**: POST
- **Route**: `/create-post`

### Edit Post

- **Method**: POST
- **Route**: `/edit-post/:id`

### Get Post

- **Method**: GET
- **Route**: `/get-post/:id`

### Delete Post

- **Method**: POST
- **Route**: `/delete-post/:id`

## Comment Routes

All comment routes start with `/comments`.

### Get All Comments on Post

- **Method**: GET
- **Route**: `/:post_id`

### Create Comment

- **Method**: POST
- **Route**: `/create/:post_id`

### Edit Comment

- **Method**: POST
- **Route**: `/edit/:comment_id`

### Delete Comment

- **Method**: POST
- **Route**: `/delete/:comment_id`

## Vote Routes

All vote routes start with `/votes`.

### Get All Votes with Post or Comment ID

- **Method**: GET
- **Route**: `/:post_id`

### Create Vote on Post

- **Method**: POST
- **Route`: `/post/:post_id`

### Create Vote on Comment

- **Method**: POST
- **Route`: `/comment/:comment_id`

## User Routes

All user routes start with `/users`.

### Create User on App

- **Method**: POST
- **Route`: `/create`

### Verify User

- **Method**: POST
- **Route`: `/verify`
