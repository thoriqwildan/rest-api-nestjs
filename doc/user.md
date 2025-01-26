# User API Spec

## Register User

Endpoint : POST /api/user

Request Body :

```json
{
    "username": "Thoriq",
    "password": "rahasia",
    "name": "Thoriq Wildan" 
}
```

Response Body (Success) :

```json
{
    "data": {
        "username": "Thoriq",
        "name": "Thoriq Wildan"
    }
}
```

Response Body (Error) :

```json
{
    "errors": "Username already registered"
}
```

## Login User

Endpoint : POST /api/user/login

Request Body :

```json
{
    "username": "Thoriq",
    "password": "rahasia",
}
```

Response Body (Success) :

```json
{
    "data": {
        "username": "Thoriq",
        "name": "Thoriq Wildan",
        "token": "session_id_generated"
    }
}
```

Response Body (Error) :

```json
{
    "errors": "Username or Password is Wrong!"
}
```

## Get User

Endpoint : GET /api/user/current

Headers :
- authorization: token


Response Body (Success) :

```json
{
    "data": {
        "username": "Thoriq",
        "name": "Thoriq Wildan"
    }
}
```

Response Body (Error) :

```json
{
    "errors": "Unauthorized"
}
```

## Update User

Endpoint : PATCH /api/user/current

Headers :
- Authorization: token

Request Body :

```json
{
    "password": "rahasia", // Optional if want to change password
    "name": "Thoriq Wildan" // Optional if want to change name 
}
```

Response Body (Success) :

```json
{
    "data": {
        "username": "Thoriq",
        "name": "Thoriq Wildan"
    }
}
```

Response Body (Error) :

```json
{
    "errors": "Username already registered"
}
```

## Logout User

Endpoint : DELETE /api/user/current

Headers :
- Authorization: token

Response Body (Success) :

```json
{
    "data": true
}
```