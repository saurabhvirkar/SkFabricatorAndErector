
using System.Net;

namespace Api.Helpers;

public class ApiResponse(HttpStatusCode statusCode, string message, object? data)
{
    public int StatusCode { get; } = (int)statusCode;
    public string Message { get; } = message;
    public object? Data { get; } = data;

    public ApiResponse(HttpStatusCode statusCode, string message) : this(statusCode, message, null)
    {
    }
}