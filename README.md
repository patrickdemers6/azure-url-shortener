# URL Shortener

## Endpoints
`POST /create` - the body should have a JSON object with `{url: LONG_URL}`

`GET /${id}` - the id should be the id returned from the create endpoint. This redirects you to the long url.