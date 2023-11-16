# ToDo
- Make editPost page, API already set up

- Make profile page not display if res.status === 404
- Make create post button disabled until image is uploaded into cloudinary (image doesent upload if done to fast)

# Updates
- Added votes and voteCount directly into Post and Comment schema's
- Entirely removed voteSchema
- Added tag addition and removal support for users 
- Completely reworked voting system to save storage and http requests 
- Added images display on post
- Added .trim() method to username creation to prevent impersonation, user cannot delete or edit another users post but can pretend to be them when making a post
- Added admin authentication for deleting or editing anything
- Added photo uploading to posts
- Added photo deletion when post deletes
