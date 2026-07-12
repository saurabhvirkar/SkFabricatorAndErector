namespace Domain.Common;

public abstract class BaseAuditableEntity<T> : BaseEntity<T>
{
    public DateTime CreatedDate { get; set; }
    public Guid? CreatedBy { get; set; }
    public DateTime? UpdatedDate { get; set; }
    public Guid? UpdatedBy { get; set; }
    public DateTime? DeletedDate { get; set; }
}
