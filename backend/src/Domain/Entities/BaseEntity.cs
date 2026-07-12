namespace SkFabricator.Domain.Entities;

/// <summary>
/// A base class for entities that uses a Guid as the primary key.
/// </summary>
public abstract class BaseEntity : BaseEntity<Guid>
{
    protected BaseEntity()
    {
        Id = Guid.NewGuid();
    }
}
