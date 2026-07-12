using System.Text.Json.Serialization;

namespace SkFabricator.Api.Common;

public class ApiResponse<T>
{
    public bool Succeeded { get; }
    public T? Data { get; }
    public string? Message { get; }
    
    [JsonIgnore(Condition = JsonIgnoreCondition.WhenWritingNull)]
    public IEnumerable<string>? Errors { get; }

    private ApiResponse(bool succeeded, T? data, string? message, IEnumerable<string>? errors)
    {
        Succeeded = succeeded;
        Data = data;
        Message = message;
        Errors = errors;
    }

    public static ApiResponse<T> Success(T data, string? message = null)
    {
        return new ApiResponse<T>(true, data, message, null);
    }

    public static ApiResponse<T> Fail(string? message = null, IEnumerable<string>? errors = null)
    {
        return new ApiResponse<T>(false, default, message, errors);
    }
}