using System;
using System.Collections.Generic;

namespace p11transaction.Models;

public partial class Feedback
{
    public int Feedbackid { get; set; }

    public int? Propertyid { get; set; }

    public int? Rating { get; set; }

    public string? Description { get; set; }

    public virtual Property? Property { get; set; }
}
