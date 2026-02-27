# Errors

> This guide covers API error handling, including status codes and error types.

You can tell if your request was successful by checking the status code in the API response. If a response is unsuccessful, use the error type and message to understand what went wrong.

---

## Status codes

Here is a list of the different categories of status codes returned by the Vatly API. Use these to understand if a request was successful.

<table>
<thead>
  <tr>
    <th>
      Status
    </th>
    
    <th>
      Description
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        2xx
      </code>
    </td>
    
    <td>
      A 2xx status code indicates a successful response.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        4xx
      </code>
    </td>
    
    <td>
      A 4xx status code indicates a client error. This means there's an issue with the request.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        5xx
      </code>
    </td>
    
    <td>
      A 5xx status code indicates a server error. This means the issue is on Vatly's end and we are automatically notified of the problem.
    </td>
  </tr>
</tbody>
</table>

### Common status codes

<table>
<thead>
  <tr>
    <th>
      Code
    </th>
    
    <th>
      Meaning
    </th>
  </tr>
</thead>

<tbody>
  <tr>
    <td>
      <code>
        200
      </code>
    </td>
    
    <td>
      OK - Request succeeded.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        201
      </code>
    </td>
    
    <td>
      Created - Resource was successfully created.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        204
      </code>
    </td>
    
    <td>
      No Content - Request succeeded with no response body (e.g., deletes).
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        400
      </code>
    </td>
    
    <td>
      Bad Request - The request was malformed.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        401
      </code>
    </td>
    
    <td>
      Unauthorized - Invalid or missing API key.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        403
      </code>
    </td>
    
    <td>
      Forbidden - The API key doesn't have permission for this action.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        404
      </code>
    </td>
    
    <td>
      Not Found - The requested resource doesn't exist.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        422
      </code>
    </td>
    
    <td>
      Unprocessable Entity - Validation failed. Check the <code>
        errors
      </code>
      
       field for details.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        429
      </code>
    </td>
    
    <td>
      Too Many Requests - Rate limit exceeded. Slow down your requests.
    </td>
  </tr>
  
  <tr>
    <td>
      <code>
        500
      </code>
    </td>
    
    <td>
      Internal Server Error - Something went wrong on Vatly's end.
    </td>
  </tr>
</tbody>
</table>

---

## Error types

Whenever a request is unsuccessful, the Vatly API will return an error response with an error type and message. You can use this information to understand better what has gone wrong and how to fix it. Most of the error messages are pretty helpful and actionable.

```json [Error response]
{
  "message": "Resource not found."
}
```

### Validation errors

When a `422` status code is returned, the response includes field-specific error details:

```json [Validation error response]
{
  "message": "The given data was invalid.",
  "errors": {
    "email": [
      "The email field is required."
    ],
    "products.0.id": [
      "The selected products.0.id is invalid."
    ]
  }
}
```

The `errors` object uses dot notation for nested fields. Each key maps to an array of error messages for that field.
