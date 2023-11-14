# API Routes


## Posts
Routes begin with /posts
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
- **Querys**:  `userID=userAuthID`
- **Details**: if the userID is an admin or the userID is the same as the one that created the post

### Delete Post

- **Method**: POST
- **Route**: `/delete-post/:id`
- **Querys**:  `userID=userAuthID`
- **Details**: if the userID is an admin or the userID is the same as the one that created the post
</details>

## Comments
Routes begin with /comments
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
- **Querys**:  `userID=userAuthID`
- **Details**: if the userID is an admin or the userID is the same as the one that created the comment

### Delete Comment

- **Method**: POST
- **Route**: `/delete/:comment_id`
- **Querys**:  `userID=userAuthID`
- **Details**: if the userID is an admin or the userID is the same as the one that created the comment
</details>

## Votes
Routes begin with /votes
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
Routes begin with /users
<details>
<summary>GET Requests</summary>

### Get All Users on App

- **Method**: GET
- **Route**: `/`
- **Querys**: `userID=userAuthID`
- **Details**: userID is optional, if omitted will only return the names of all users

### Get Users Profile

- **Method**: GET
- **Route**: `/profile/:name`
- **Querys**: `userID=userAuthID`
- **Details**: userID is optional, if omitted or user is not an admin it will only return the username, avatar, createdAt and admin status of user.  If userID is admin or the owner of the account will return whole user object. 

</details>

<details>
<summary>POST Requests</summary>

### Update users profile information

- **Method**: POST
- **Route**: `/update-profile/:name`
- **Querys**:  `userID=userAuthID`
- **Details**: if the userID is the same as the account or the userID is an admin it will update with req.body
### Update users profile image

- **Method**: POST
- **Route**: `/update-avatar`


### Create User on App

- **Method**: POST
- **Route**: `/create`

### Make User Admin

- **Method**: POST
- **Route**: `/make-admin/:user_id`
- **Querys**:  `userID=userAuthID` and `admin=Boolean` 

### Verify User

- **Method**: POST
- **Route**: `/verify`

### Delete User

- **Method**: POST
- **Route**: `/delete/:userAuthID`
- **Querys**:  `userID=userAuthID` 
- **Details**: if the userID is an admin or the userID is the same as the one that created the account

</details>
