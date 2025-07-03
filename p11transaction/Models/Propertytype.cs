using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Propertytype
{
    public int Propertytypeid { get; set; }

    public string? Propertytypename { get; set; }

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
}
