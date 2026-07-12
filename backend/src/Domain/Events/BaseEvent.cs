namespace SkFabricator.Domain.Events;

public abstract class BaseEvent : IDomainEvent
{
    public DateTime OccurredOn { get; protected set; } = DateTime.UtcNow;
}
