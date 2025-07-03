using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class User
{
    public int Userid { get; set; }

    public int? Roleid { get; set; }

    public string Password { get; set; } = null!;

    public string? Aadharno { get; set; }

    public string Firstname { get; set; } = null!;

    public string Lastname { get; set; } = null!;

    public string Address { get; set; } = null!;

    public string? Contact { get; set; }

    public string Email { get; set; } = null!;

    public string Upiid { get; set; } = null!;

    public int? Areaid { get; set; }

    public string? Resettoken { get; set; }

    public DateTime? Tokenexpiry { get; set; }

    public virtual Area? Area { get; set; }

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();

    public virtual Role? Role { get; set; }

    public virtual ICollection<Tenantproperty> Tenantproperties { get; set; } = new List<Tenantproperty>();
}
