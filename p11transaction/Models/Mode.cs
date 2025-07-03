using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Mode
{
    public int Modeid { get; set; }

    public string Modename { get; set; } = null!;

    public virtual ICollection<Payment> Payments { get; set; } = new List<Payment>();
}
