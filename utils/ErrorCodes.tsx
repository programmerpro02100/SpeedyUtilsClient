const errorCodes = [
  // 1xx: Informational Responses
  { code: 100, title: "Continue", message: "The request is being processed, continue sending the request." },
  { code: 101, title: "Switching Protocols", message: "The server is switching protocols as requested." },
  { code: 102, title: "Processing", message: "The request is being processed, but no response is available yet." },
  { code: 103, title: "Early Hints", message: "The server is sending some headers before the final response." },

  // 2xx: Success Responses
  { code: 200, title: "OK", message: "The request was successful." },
  { code: 201, title: "Created", message: "The request was successful and a resource was created." },
  { code: 202, title: "Accepted", message: "The request has been accepted for processing, but it's not completed yet." },
  { code: 203, title: "Non-Authoritative Information", message: "The request was successful, but the information may be from another source." },
  { code: 204, title: "No Content", message: "The request was successful, but there is no content to send." },
  { code: 205, title: "Reset Content", message: "The request was successful, and the user should reset the document view." },
  { code: 206, title: "Partial Content", message: "The server is delivering only part of the resource due to a range request." },
  { code: 207, title: "Multi-Status", message: "The response contains multiple status codes for different operations." },
  { code: 208, title: "Already Reported", message: "The resource was already reported in a previous response." },
  { code: 226, title: "IM Used", message: "The server has fulfilled the request using instance manipulations." },

  // 3xx: Redirection Messages
  { code: 300, title: "Multiple Choices", message: "There are multiple options for the requested resource." },
  { code: 301, title: "Moved Permanently", message: "The requested resource has been permanently moved to a new URL." },
  { code: 302, title: "Found", message: "The requested resource is temporarily available at a different URL." },
  { code: 303, title: "See Other", message: "The response can be found at another URL using GET." },
  { code: 304, title: "Not Modified", message: "The resource has not been modified since the last request." },
  { code: 305, title: "Use Proxy", message: "The requested resource must be accessed through a proxy." },
  { code: 307, title: "Temporary Redirect", message: "The resource is temporarily located at another URL." },
  { code: 308, title: "Permanent Redirect", message: "The resource is permanently located at another URL." },

  // 4xx: Client Errors
  { code: 400, title: "Bad Request", message: "The request could not be understood due to malformed syntax." },
  { code: 401, title: "Unauthorized", message: "You must be authenticated to access this resource." },
  { code: 402, title: "Payment Required", message: "Payment is required to access this resource." },
  { code: 403, title: "Forbidden", message: "You do not have permission to access this resource." },
  { code: 404, title: "Not Found", message: "The requested resource could not be found." },
  { code: 405, title: "Method Not Allowed", message: "The HTTP method used is not allowed for this resource." },
  { code: 406, title: "Not Acceptable", message: "The requested resource is not available in a format acceptable to the client." },
  { code: 407, title: "Proxy Authentication Required", message: "You must authenticate with a proxy before accessing this resource." },
  { code: 408, title: "Request Timeout", message: "The request took too long to complete." },
  { code: 409, title: "Conflict", message: "The request conflicts with the current state of the resource." },
  { code: 410, title: "Gone", message: "The requested resource is no longer available." },
  { code: 411, title: "Length Required", message: "The request must include a valid Content-Length header." },
  { code: 412, title: "Precondition Failed", message: "A precondition in the request failed." },
  { code: 413, title: "Payload Too Large", message: "The request payload is too large for the server to process." },
  { code: 414, title: "URI Too Long", message: "The requested URL is too long." },
  { code: 415, title: "Unsupported Media Type", message: "The request media type is not supported." },
  { code: 416, title: "Range Not Satisfiable", message: "The requested range is invalid." },
  { code: 417, title: "Expectation Failed", message: "The server cannot meet the expectation given in the request header." },
  { code: 418, title: "I'm a Teapot", message: "The server refuses to brew coffee because it is a teapot." },
  { code: 422, title: "Unprocessable Entity", message: "The request was well-formed but could not be processed." },
  { code: 425, title: "Too Early", message: "The server is unwilling to process the request at this time." },
  { code: 429, title: "Too Many Requests", message: "You have sent too many requests in a short period." },

  // 5xx: Server Errors
  { code: 500, title: "Internal Server Error", message: "An unexpected error occurred on the server." },
  { code: 501, title: "Not Implemented", message: "The server does not support the requested feature." },
  { code: 502, title: "Bad Gateway", message: "Received an invalid response from an upstream server." },
  { code: 503, title: "Service Unavailable", message: "The server is temporarily unavailable." },
  { code: 504, title: "Gateway Timeout", message: "The server did not receive a timely response from an upstream server." },
  { code: 505, title: "HTTP Version Not Supported", message: "The server does not support the HTTP version used in the request." },
  { code: 506, title: "Variant Also Negotiates", message: "The server encountered an internal configuration error." },
  { code: 507, title: "Insufficient Storage", message: "The server is unable to store the representation needed to complete the request." },
  { code: 508, title: "Loop Detected", message: "The server detected an infinite loop while processing the request." },
  { code: 510, title: "Not Extended", message: "Further extensions are required to fulfill the request." },
  { code: 511, title: "Network Authentication Required", message: "You need to authenticate to gain network access." }
];

export default errorCodes;
