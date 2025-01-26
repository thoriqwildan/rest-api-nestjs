# Address API Spec

## Create Address

Endpoint : GET /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token


Response Body :
```json
{
    "data": {
        "id": 1,
        "street": "Jalan ini", 
        "city": "Kota",
        "province": "Provinsi",
        "country": "Negara Itu", 
        "postal_code": "1234"
    }
}
```

## Get Address

Endpoint : POST /api/contacts/:contactId/addresses

Headers :
- Authorization : token

Request Body :
```json
{
    "street": "Jalan ini", // Optional
    "city": "Kota", // Optional
    "province": "Provinsi", // Optional
    "country": "Negara Itu", 
    "postal_code": "1234"
}
```

Response Body :
```json
{
    "data": {
        "id": 1,
        "street": "Jalan ini", 
        "city": "Kota",
        "province": "Provinsi",
        "country": "Negara Itu", 
        "postal_code": "1234"
    }
}
```

## Update Address

Endpoint : PUT /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Request Body :
```json
{
    "street": "Jalan ini", // Optional
    "city": "Kota", // Optional
    "province": "Provinsi", // Optional
    "country": "Negara Itu", 
    "postal_code": "1234"
}
```

Response Body :
```json
{
    "data": {
        "id": 1,
        "street": "Jalan ini", 
        "city": "Kota",
        "province": "Provinsi",
        "country": "Negara Itu", 
        "postal_code": "1234"
    }
}
```

## Remove Address

Endpoint : DELETE /api/contacts/:contactId/addresses/:addressId

Headers :
- Authorization : token

Response Body :
```json
{
    "data": true
}
```

## List Addresses

Endpoint : GET /api/contacts/:contactId/addresses

Headers :
- Authorization : token


Response Body :
```json
{
    "data": [
            {
            "id": 1,
            "street": "Jalan ini", 
            "city": "Kota",
            "province": "Provinsi",
            "country": "Negara Itu", 
            "postal_code": "1234"
        },
        {
            "id": 2,
            "street": "Jalan ini", 
            "city": "Kota",
            "province": "Provinsi",
            "country": "Negara Itu", 
            "postal_code": "1234"
        },
        {
            "id": 3,
            "street": "Jalan ini", 
            "city": "Kota",
            "province": "Provinsi",
            "country": "Negara Itu", 
            "postal_code": "1234"
        }
    ]
}
```