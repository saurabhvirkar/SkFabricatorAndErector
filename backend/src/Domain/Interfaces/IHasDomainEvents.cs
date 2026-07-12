using SkFabricator.Domain.Events;

namespace SkFabricator.Domain.Interfaces;

public interface IHasDomainEvents
{
    public IReadOnlyList<IDomainEvent> DomainEvents { get; }
    public void AddDomainEvent(IDomainEvent domainEvent);
    public void RemoveDomainEvent(IDomainEvent domainEvent);
    public void ClearDomainEvents();
}
