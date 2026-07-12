using SkFabricator.Domain.Enums;

namespace SkFabricator.Application.Pagination;

public class PaginationFilter
{
    public int PageNumber { get; set; }
    public int PageSize { get; set; }
    public string? SearchText { get; set; }
    public string? SortBy { get; set; }
    public SortDirection? SortDirection { get; set; }

    public PaginationFilter()
    {
        PageNumber = 1;
        PageSize = 10;
    }

    public PaginationFilter(int pageNumber, int pageSize)
    {
        PageNumber = pageNumber < 1 ? 1 : pageNumber;
        PageSize = pageSize > 10 ? 10 : pageSize;
    }
}
