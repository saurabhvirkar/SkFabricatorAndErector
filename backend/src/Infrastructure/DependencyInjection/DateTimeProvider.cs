using SkFabricator.Application.Common.Interfaces;

namespace SkFabricator.Infrastructure.DependencyInjection;

public class DateTimeProvider : IDateTimeProvider
{
    public DateTime UtcNow => DateTime.UtcNow;
}
