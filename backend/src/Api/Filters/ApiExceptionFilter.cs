
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using Api.Helpers;
using System.Net;

namespace Api.Filters;

public class ApiExceptionFilter(ILogger<ApiExceptionFilter> logger) : IExceptionFilter
{
    private readonly ILogger<ApiExceptionFilter> _logger = logger;

    public void OnException(ExceptionContext context)
    {
        _logger.LogError(context.Exception, "An unhandled exception occurred.");

        var response = new ApiResponse(HttpStatusCode.InternalServerError, "An unexpected error occurred.", null);

        context.Result = new ObjectResult(response)
        {
            StatusCode = (int)HttpStatusCode.InternalServerError
        };

        context.ExceptionHandled = true;
    }
}