namespace SkFabricator.Domain.Events;

public interface IDomainEvent
{
    DateTime OccurredOn { get; }
}
