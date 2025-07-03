using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Tenantproperty
{
    public int? Userid { get; set; }

    public int? Propertyid { get; set; }

    public DateTime? Shortlistedat { get; set; }

    public sbyte? Status { get; set; }

    public int Tenantpropertyid { get; set; }

    public virtual Property? Property { get; set; }

    public virtual User? User { get; set; }
}
