using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Area
{
    public int Areaid { get; set; }

    public string? Areaname { get; set; }

    public int Pincode { get; set; }

    public int? Cityid { get; set; }

    public virtual City? City { get; set; }

    public virtual ICollection<Property> Properties { get; set; } = new List<Property>();

    public virtual ICollection<User> Users { get; set; } = new List<User>();
}
