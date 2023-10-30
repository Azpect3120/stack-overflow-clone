# API Routes

## Posts

<details>
<summary>GET Requests</summary>

### Get All Posts

- **Method**: GET
- **Route**: `/`

### Search All Posts

- **Method**: GET
- **Route**: `/search?query=input`

### Get Post

- **Method**: GET
- **Route**: `/get-post/:id`
</details>

<details>
<summary>POST Requests</summary>

### Create Post

- **Method**: POST
- **Route**: `/create-post`

### Edit Post

- **Method**: POST
- **Route**: `/edit-post/:id`

### Delete Post

- **Method**: POST
- **Route**: `/delete-post/:id`
</details>

## Comments

<details>
<summary>GET Requests</summary>

### Get All Comments on Post

- **Method**: GET
- **Route**: `/:post_id`
</details>

<details>
<summary>POST Requests</summary>

### Create Comment

- **Method**: POST
- **Route**: `/create/:post_id`

### Edit Comment

- **Method**: POST
- **Route**: `/edit/:comment_id`

### Delete Comment

- **Method**: POST
- **Route**: `/delete/:comment_id`
</details>

## Votes

<details>
<summary>GET Requests</summary>

### Get All Votes with Post or Comment ID

- **Method**: GET
- **Route**: `/:post_id`
</details>

<details>
<summary>POST Requests</summary>

### Create Vote on Post

- **Method**: POST
- **Route**: `/post/:post_id`

### Create Vote on Comment

- **Method**: POST
- **Route**: `/comment/:comment_id`
</details>

## Users

<details>
<summary>GET Requests</summary>

### Get All Users on App

- **Method**: GET
- **Route**: `/`

### Get Users Profile

- **Method**: GET
- **Route**: `/profile/:name`

### Check Admin Status

- **Method**: GET
- **Route**: `/is-admin/:username`
</details>

<details>
<summary>POST Requests</summary>

### Update users profile information

- **Method**: POST
- **Route**: `/update-profile/:name`

### Create User on App

- **Method**: POST
- **Route**: `/create`

### Make User Admin

- **Method**: POST
- **Route**: `/make-admin/:_id`

### Verify User

- **Method**: POST
- **Route**: `/verify`

### Delete User

- **Method**: POST
- **Route**: `/delete/:userAuthID`
</details>
