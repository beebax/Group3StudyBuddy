using System;
using System.Collections.Generic;

namespace StudyBuddyGroupProject.Models;

public partial class Favorite
{
    public int Id { get; set; }

    public string? UserId { get; set; }

    public int? Qid { get; set; }
}
