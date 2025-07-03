using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Payment
{
    public int? Userid { get; set; }

    public int? Propertyid { get; set; }

    public int? Modeid { get; set; }

    public float Amount { get; set; }

    public int Paymentid { get; set; }

    public DateTime Paymentdate { get; set; }

    public virtual Mode? Mode { get; set; }

    public virtual Property? Property { get; set; }

    public virtual User? User { get; set; }
}
