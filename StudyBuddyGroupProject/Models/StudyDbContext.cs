using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace StudyBuddyGroupProject;

public partial class StudyDbContext : DbContext
{
    public StudyDbContext()
    {
    }

    public StudyDbContext(DbContextOptions<StudyDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Favorite> Favorites { get; set; }

    public virtual DbSet<Question> Questions { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.


        //BELLE
        //=> optionsBuilder.UseSqlServer("Server=localhost,1433; Initial Catalog=StudyDB; User ID=SA; Password=EnterPasswordHere9@; TrustServerCertificate=true;");

        //ETHAN
        => optionsBuilder.UseSqlServer("Server=.\\SQLExpress;Database=StudyDB;Trusted_Connection=True;Encrypt=False");

        //CAM
        //=> optionsBuilder.UseSqlServer("Server=localhost,1433; Initial Catalog=StudyDB; User ID=SA; Password=EnterPasswordHere1; TrustServerCertificate=true;");

        //CARISSA
        //=> optionsBuilder.UseSqlServer("Server=localhost,1433; Initial Catalog=StudyDB; User ID=SA; Password=GrandCircus1!; TrustServerCertificate=true;");


    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder.Entity<Favorite>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Favorite__3214EC07C1BA18FF");

            entity.Property(e => e.Qid).HasColumnName("QId");
            entity.Property(e => e.UserId)
                .HasMaxLength(50)
                .HasColumnName("UserID");
        });

        modelBuilder.Entity<Question>(entity =>
        {
            entity.HasKey(e => e.Id).HasName("PK__Question__3214EC070511FAA8");

            entity.Property(e => e.Answer).HasMaxLength(1000);
            entity.Property(e => e.Author).HasMaxLength(255);
            entity.Property(e => e.Category).HasMaxLength(50);
            entity.Property(e => e.Question1)
                .HasMaxLength(1000)
                .HasColumnName("Question");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
