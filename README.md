# SparePartsAPI

REST API to access the Spare Parts database.

## Requests

List of all requests supported by the API along with their descriptions and examples.

### GET /parts
#### Parameters
| Parameter | Value | Example | Description | Notes | 
| ----------- | ----------- | ----------- | ----------- | ----------- |
| page | Integer of page number | /parts?page=4 | returns fourth page | Attempting to view page that doesn't exist returns 404 |
| limit | Integer of results shown per page | /parts?limit=6 | returns six responses per page | Maximum integer limit is 50, default is 10 |
| filter | (category)$(keyword) | /parts?name$engine | returns everything that includes engine in its name | mainly used for name, checks if includes not equals |
| sort | (-)(category):[repeatable] | /parts?sort=mark:-price | returns data primarily sorted by car mark ascending and secondarily by price descending | minus (-) in front of category determines ascending/descending, separator colon (:) can be applied to sort multiple categories |
#### Examples:

##### Default
        http://localhost:3030/parts
Response:
```javascript
{
    "code": "200",
    "data": [
        {
            "id": "00002356517",
            "name": "Valuveljed ",
            "tallinn": 0,
            "tartu": 0,
            "parnu": 0,
            "rakvere": 0,
            "kunda": 0,
            "sus1": null,
            "sus2": 90.833,
            "mark": "KIA",
            "price": 109
        },
        // ...
        ]
}
```
##### With parameters
    http://localhost:3030/parts?page=7&limit=1&sort=mark:-price&filter=name$motor
Response:
```javascript
// Seventh page, one result per page, sorted by mark ascending 
// and price descending, filtered to everything that has "motor" in name.
{
    "code": "200",
    "data": [
        {
            "id": "81922321389",
            "name": "Label BMW Motorrad",
            "tallinn": 0,
            "tartu": 0,
            "parnu": 0,
            "rakvere": 0,
            "kunda": 0,
            "sus1": null,
            "sus2": 99.19,
            "mark": "0",
            "price": 119.03
            }
        ]
}
```

## Error handling
Example error when querying for nonexistant page

        http://localhost:3030/parts?page=98765&limit=98765
Response:
```javascript
{
    "error": {
        "code": 404,
        "message": "Request index 987660 out of bounds, 108866 entities exist."
    }
}
```
