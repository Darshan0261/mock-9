# mock-9

```http
POST /api/register
```

## Request Body

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `name` | `string` | **Required**. User Name |
| `email` | `string` | **Required**. User Email |
| `password` | `string` | **Required**. User Password |
| `dob` | `date` | **Required**. Date of Birth |
| `bio` | `string` | **Required**. User Bio Info |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `User Registerd Sucessfully` |
| 400 | `Name, Email, Password, DOB or Bio not provided` |
| 409 | `User Already Registered` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
POST /api/login
```
## Request Body

| Parameter | Type | Description |
| :--- | :--- | :--- |
| `email` | `string` | **Required**. User Email |
| `password` | `string` | **Required**. User Password |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `User Login Sucessfully` |
| 400 | `Email or Password not provided` |
| 401 | `Wrong Credentials - Password does not match` |
| 501 | `INTERNAL SERVER ERROR` |


###

```http
GET /api/users/
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `Users Data Without Password` |
| 501 | `INTERNAL SERVER ERROR` |

## Response

```javascript
{
  _id: ObjectId,
  name: String,
  email: String,
  dob: Date,
  bio: String,
  posts: [{ type: ObjectId, ref: 'Post' }],
  friends: [{ type: ObjectId, ref: 'User' }],
  friendRequests: [{ type: ObjectId, ref: 'User' }]
}
```

###

```http
GET /api/users/:id/friends
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `User ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `User Friends List Array` |
| 404 | `User Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

## Response 

```javascript
[ ObjectId ]
```

###

```http
POST /api/users/:id/friends
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `User ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 204 | `Friend Request Sent` |
| 401 | `Login Not Done || Token Not Found` |
| 404 | `Friend (User) Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
POST /api/users/:id/friends/:friendId
```

## Request Body

| Parameter | Description |
| :--- | :--- |
| `status` | `accept / reject` |

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `User ID` |
| `friendId` | `Friend ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 204 | `Friend Request Accepted / Rejected` |
| 400 | `Status Not Found in Request Body` |
| 401 | `Login Not Done || Token Not Found` |
| 404 | `Friend (User) Not Found in FriendRequest Section` |
| 501 | `INTERNAL SERVER ERROR` |


###

```http
GET /api/posts/
```

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `All Posts Data` |
| 501 | `INTERNAL SERVER ERROR` |

## Response

```javascript
[{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}]
```

###

```http
POST /api/posts/
```

## Request Body

| Parameter | Description |
| :--- | :--- |
| `text` | `Post Description / Text` |
| `image` | `Post Image Link` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `Post sucessfully Posted` |
| 400 | `Text or image not found in request body` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
GET /api/posts/:id
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Post ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 200 | `Posts Data` |
| 404 | `Post Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

## Response

```javascript
{
  _id: ObjectId,
  user: { type: ObjectId, ref: 'User' },
  text: String,
  image: String,
  createdAt: Date,
  likes: [{ type: ObjectId, ref: 'User' }],
  comments: [{
    user: { type: ObjectId, ref: 'User' },
    text: String,
    createdAt: Date
  }]
}
```

###

```http
PATCH /api/posts/:id
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Post ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 204 | `Post Updated Sucessfully` |
| 401 | `Login Required` |
| 401 | `Editing Party in Not Post Owner` |
| 404 | `Post Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
DELETE /api/posts/:id
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Post ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 202 | `Post Deleted Sucessfully` |
| 401 | `Login Required` |
| 401 | `Deleting Party in Not Post Owner` |
| 404 | `Post Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
POST /api/posts/:id/like
```

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Post ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `Post Liked Sucessfully` |
| 401 | `Login Required` |
| 404 | `Post Not Found` |
| 409 | `Post Liked Alreday` |
| 501 | `INTERNAL SERVER ERROR` |

###

```http
POST /api/posts/:id/comment
```

## Request Body

| Parameter | Description |
| :--- | :--- |
| `text` | `Comment Data` |

## Params

| Parameter | Description |
| :--- | :--- |
| `id` | `Post ID` |

## Status Codes

| Status Code | Description |
| :--- | :--- |
| 201 | `Commented on Post Sucessfully` |
| 400 | `text Required in Request Body` |
| 401 | `Login Required` |
| 404 | `Post Not Found` |
| 501 | `INTERNAL SERVER ERROR` |

###