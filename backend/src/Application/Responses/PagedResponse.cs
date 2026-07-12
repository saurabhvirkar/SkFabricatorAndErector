namespace SkFabricator.Application.Responses;

public class PagedResponse<T>
{
    public PagedResponse(IReadOnlyList<T> data, int pageNumber, int pageSize, int totalRecords)
    {
        Data = data;
        PageNumber = pageNumber;
        PageSize = pageSize;
        TotalRecords = totalRecords;
        TotalPages = (int)Math.Ceiling(totalRecords / (double)pageSize);
    }

    public IReadOnlyList<T> Data { get; }
    public int PageNumber { get; }
    public int PageSize { get; }
    public int TotalRecords { get; }
    public int TotalPages { get; }
    public bool HasPreviousPage => PageNumber > 1;
    public bool HasNextPage => PageNumber < TotalPages;
}
