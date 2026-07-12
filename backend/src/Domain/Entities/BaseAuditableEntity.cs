using SkFabricator.Domain.Interfaces;
using System.ComponentModel.DataAnnotations;

namespace SkFabricator.Domain.Entities;

public abstract class BaseAuditableEntity : BaseEntity<Guid>, ISoftDeletable
{
        /// <summary>
    /// The date and time the entity was created.
    /// </summary>
    public DateTime CreatedOnUtc { get; set; }

    /// <summary>
    /// The user who created the entity.
    /// </summary>
    public string? CreatedBy { get; set; }

    /// <summary>
    /// The date and time the entity was last modified.
    /// </summary>
    public DateTime? ModifiedOnUtc { get; set; }

    /// <summary>
    /// The user who last modified the entity.
    /// </summary>
    public string? ModifiedBy { get; set; }

    /// <summary>
    /// A flag to indicate if the entity is deleted.
    /// </summary>
    public bool IsDeleted { get; set; }

    /// <summary>
    /// The date and time the entity was deleted.
    /// </summary>
    public DateTime? DeletedOnUtc { get; set; }

    /// <summary>
    /// The user who deleted the entity.
    /// </summary>
    public string? DeletedBy { get; set; }

    /// <summary>
    /// The row version for optimistic concurrency control.
    /// </summary>
    [Timestamp]
    public byte[] RowVersion { get; private set; }
}
