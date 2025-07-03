using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Photo
{
    public int Photoid { get; set; }

    public int? Propertyid { get; set; }

    public byte[]? Photo1 { get; set; }

    public virtual Property? Property { get; set; }
}
