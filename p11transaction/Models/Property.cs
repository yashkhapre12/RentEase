using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Property
{
    public int Propertyid { get; set; }

    public int? Userid { get; set; }

    public int? Areaid { get; set; }

    public int? Propertytypeid { get; set; }

    public string? Leaseduration { get; set; }

    public ulong? Available { get; set; }

    public float Rent { get; set; }

    public float Sqfeet { get; set; }

    public float Securitydeposit { get; set; }

    public DateTime? CreatedAt { get; set; }

    public float Additionalcharges { get; set; }

    public string Address { get; set; } = null!;

    public int? Furnishid { get; set; }

    public ulong? Gasconnection { get; set; }

    public ulong? Parking { get; set; }

    public virtual Area? Area { get; set; }

    public virtual ICollection<Feedback> Feedbacks { get; set; } = new List<Feedback>();

    public virtual Furnished? Furnish { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Photo> Photos { get; set; } = new List<Photo>();

    public virtual Propertytype? Propertytype { get; set; }

    public virtual ICollection<Tenantproperty> Tenantproperties { get; set; } = new List<Tenantproperty>();

    public virtual User? User { get; set; }
}
