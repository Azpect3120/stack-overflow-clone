# Post Routes

All post routes start with `/posts`.

## Create Post Route

- **Method**: POST
- **Route**: `/create-post`

## Edit Post Route

- **Method**: POST
- **Route**: `/edit-post/:id`

## Get Post Route

- **Method**: GET
- **Route**: `/get-post/:id`

## Get All Posts Route

- **Method**: GET
- **Route**: `/`

## Search All Posts Route

- **Method**: GET
- **Route**: `/:query`

## Delete Post Route

- **Method**: DELETE
- **Route**: `/delete-post/:id`

# Comment Routes

All comment routes start with `/comments`.

## Create Comment Route

- **Method**: POST
- **Route**: `/create/:post_id`

## Delete Comment Route

- **Method**: DELETE
- **Route**: `/delete/:comment_id`

## Edit Comment Route

- **Method**: POST
- **Route**: `/edit/:comment_id`

## Get All Comments on Post

- **Method**: GET
- **Route**: `/:post_id`

# Vote Routes

All vote routes start with `/votes`.

## Create Vote on Post

- **Method**: POST
- **Route**: `/post/:post_id`

## Create Vote on Comment

- **Method**: POST
- **Route**: `/comment/:comment_id`

## Get All Votes with Post or Comment ID

- **Method**: GET
- **Route**: `/:post_id`
