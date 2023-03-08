using System;
using System.Collections.Generic;

namespace StudyBuddyGroupProject;

public partial class Question
{
    public int Id { get; set; }

    public string? Question1 { get; set; }

    public string? Answer { get; set; }

    public string? Category { get; set; }

    public string? Author { get; set; }

    public int? NumFav { get; set; }

}
