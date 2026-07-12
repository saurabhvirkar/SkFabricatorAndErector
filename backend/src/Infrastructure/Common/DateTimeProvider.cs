using SkFabricator.Application.Common.Interfaces;

namespace SkFabricator.Infrastructure.Common;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
