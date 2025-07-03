using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Furnished
{
    public int Furnishid { get; set; }

    public string? Furnishtype { get; set; }

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();
}
