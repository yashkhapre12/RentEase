using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;

namespace p11transaction.Models;

public partial class RenteaseContext : DbContext
{
    public RenteaseContext()
    {
    }

    public RenteaseContext(DbContextOptions<RenteaseContext> options)
        : base(options)
    {
    }

    public virtual DbSet<Area> Areas { get; set; }

    public virtual DbSet<City> Cities { get; set; }

    public virtual DbSet<Feedback> Feedbacks { get; set; }

    public virtual DbSet<Furnished> Furnisheds { get; set; }

    public virtual DbSet<Mode> Modes { get; set; }

    public virtual DbSet<Payment> Payments { get; set; }

    public virtual DbSet<Photo> Photos { get; set; }

    public virtual DbSet<Property> Properties { get; set; }

    public virtual DbSet<Propertytype> Propertytypes { get; set; }

    public virtual DbSet<Role> Roles { get; set; }

    public virtual DbSet<Tenantproperty> Tenantproperties { get; set; }

    public virtual DbSet<User> Users { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see http://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=Root;database=rentease", Microsoft.EntityFrameworkCore.ServerVersion.Parse("8.2.0-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<Area>(entity =>
        {
            entity.HasKey(e => e.Areaid).HasName("PRIMARY");

            entity.ToTable("area");

            entity.HasIndex(e => e.Cityid, "cityid");

            entity.Property(e => e.Areaid).HasColumnName("areaid");
            entity.Property(e => e.Areaname)
                .HasMaxLength(255)
                .HasColumnName("areaname");
            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.Pincode).HasColumnName("pincode");

            entity.HasOne(d => d.City).WithMany(p => p.Areas)
                .HasForeignKey(d => d.Cityid)
                .HasConstraintName("area_ibfk_1");
        });

        modelBuilder.Entity<City>(entity =>
        {
            entity.HasKey(e => e.Cityid).HasName("PRIMARY");

            entity.ToTable("city");

            entity.Property(e => e.Cityid).HasColumnName("cityid");
            entity.Property(e => e.Cityname)
                .HasMaxLength(20)
                .HasColumnName("cityname");
        });

        modelBuilder.Entity<Feedback>(entity =>
        {
            entity.HasKey(e => e.Feedbackid).HasName("PRIMARY");

            entity.ToTable("feedback");

            entity.HasIndex(e => e.Propertyid, "propertyid");

            entity.Property(e => e.Feedbackid).HasColumnName("feedbackid");
            entity.Property(e => e.Description)
                .HasColumnType("text")
                .HasColumnName("description");
            entity.Property(e => e.Propertyid).HasColumnName("propertyid");
            entity.Property(e => e.Rating).HasColumnName("rating");

            entity.HasOne(d => d.Property).WithMany(p => p.Feedbacks)
                .HasForeignKey(d => d.Propertyid)
                .HasConstraintName("feedback_ibfk_1");
        });

        modelBuilder.Entity<Furnished>(entity =>
        {
            entity.HasKey(e => e.Furnishid).HasName("PRIMARY");

            entity.ToTable("furnished");

            entity.Property(e => e.Furnishid)
                .ValueGeneratedNever()
                .HasColumnName("furnishid");
            entity.Property(e => e.Furnishtype)
                .HasMaxLength(255)
                .HasColumnName("furnishtype");
        });

        modelBuilder.Entity<Mode>(entity =>
        {
            entity.HasKey(e => e.Modeid).HasName("PRIMARY");

            entity.ToTable("mode");

            entity.Property(e => e.Modeid)
                .ValueGeneratedNever()
                .HasColumnName("modeid");
            entity.Property(e => e.Modename)
                .HasMaxLength(255)
                .HasColumnName("modename");
        });

        modelBuilder.Entity<Payment>(entity =>
        {
            entity.HasKey(e => e.Paymentid).HasName("PRIMARY");

            entity.ToTable("payment");

            entity.HasIndex(e => e.Modeid, "modeid");

            entity.HasIndex(e => e.Propertyid, "propertyid");

            entity.HasIndex(e => e.Userid, "userid");

            entity.Property(e => e.Paymentid).HasColumnName("paymentid");
            entity.Property(e => e.Amount).HasColumnName("amount");
            entity.Property(e => e.Modeid).HasColumnName("modeid");
            entity.Property(e => e.Paymentdate)
                .HasColumnType("datetime")
                .HasColumnName("paymentdate");
            entity.Property(e => e.Propertyid).HasColumnName("propertyid");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.Mode).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Modeid)
                .HasConstraintName("payment_ibfk_3");

            entity.HasOne(d => d.Property).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Propertyid)
                .HasConstraintName("payment_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Payments)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("payment_ibfk_1");
        });

        modelBuilder.Entity<Photo>(entity =>
        {
            entity.HasKey(e => e.Photoid).HasName("PRIMARY");

            entity.ToTable("photos");

            entity.HasIndex(e => e.Propertyid, "propertyid");

            entity.Property(e => e.Photoid).HasColumnName("photoid");
            entity.Property(e => e.Photo1).HasColumnName("photo");
            entity.Property(e => e.Propertyid).HasColumnName("propertyid");

            entity.HasOne(d => d.Property).WithMany(p => p.Photos)
                .HasForeignKey(d => d.Propertyid)
                .HasConstraintName("photos_ibfk_1");
        });

        modelBuilder.Entity<Property>(entity =>
        {
            entity.HasKey(e => e.Propertyid).HasName("PRIMARY");

            entity.ToTable("property");

            entity.HasIndex(e => e.Areaid, "areaid");

            entity.HasIndex(e => e.Furnishid, "furnishid");

            entity.HasIndex(e => e.Propertytypeid, "propertytypeid");

            entity.HasIndex(e => e.Userid, "userid");

            entity.Property(e => e.Propertyid).HasColumnName("propertyid");
            entity.Property(e => e.Additionalcharges).HasColumnName("additionalcharges");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Areaid).HasColumnName("areaid");
            entity.Property(e => e.Available)
                .HasColumnType("bit(1)")
                .HasColumnName("available");
            entity.Property(e => e.CreatedAt)
                .HasMaxLength(6)
                .HasColumnName("created_at");
            entity.Property(e => e.Furnishid).HasColumnName("furnishid");
            entity.Property(e => e.Gasconnection)
                .HasColumnType("bit(1)")
                .HasColumnName("gasconnection");
            entity.Property(e => e.Leaseduration)
                .HasMaxLength(255)
                .HasColumnName("leaseduration");
            entity.Property(e => e.Parking)
                .HasColumnType("bit(1)")
                .HasColumnName("parking");
            entity.Property(e => e.Propertytypeid).HasColumnName("propertytypeid");
            entity.Property(e => e.Rent).HasColumnName("rent");
            entity.Property(e => e.Securitydeposit).HasColumnName("securitydeposit");
            entity.Property(e => e.Sqfeet).HasColumnName("sqfeet");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.Area).WithMany(p => p.Properties)
                .HasForeignKey(d => d.Areaid)
                .HasConstraintName("property_ibfk_2");

            entity.HasOne(d => d.Furnish).WithMany(p => p.Properties)
                .HasForeignKey(d => d.Furnishid)
                .HasConstraintName("property_ibfk_4");

            entity.HasOne(d => d.Propertytype).WithMany(p => p.Properties)
                .HasForeignKey(d => d.Propertytypeid)
                .HasConstraintName("property_ibfk_3");

            entity.HasOne(d => d.User).WithMany(p => p.Properties)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("property_ibfk_1");
        });

        modelBuilder.Entity<Propertytype>(entity =>
        {
            entity.HasKey(e => e.Propertytypeid).HasName("PRIMARY");

            entity.ToTable("propertytype");

            entity.Property(e => e.Propertytypeid)
                .ValueGeneratedNever()
                .HasColumnName("propertytypeid");
            entity.Property(e => e.Propertytypename)
                .HasMaxLength(255)
                .HasColumnName("propertytypename");
        });

        modelBuilder.Entity<Role>(entity =>
        {
            entity.HasKey(e => e.Roleid).HasName("PRIMARY");

            entity.ToTable("role");

            entity.Property(e => e.Roleid)
                .ValueGeneratedNever()
                .HasColumnName("roleid");
            entity.Property(e => e.Rolename)
                .HasMaxLength(255)
                .HasColumnName("rolename");
        });

        modelBuilder.Entity<Tenantproperty>(entity =>
        {
            entity.HasKey(e => e.Tenantpropertyid).HasName("PRIMARY");

            entity.ToTable("tenantproperty");

            entity.HasIndex(e => e.Propertyid, "propertyid");

            entity.HasIndex(e => e.Userid, "userid");

            entity.Property(e => e.Tenantpropertyid).HasColumnName("tenantpropertyid");
            entity.Property(e => e.Propertyid).HasColumnName("propertyid");
            entity.Property(e => e.Shortlistedat)
                .HasColumnType("datetime")
                .HasColumnName("shortlistedat");
            entity.Property(e => e.Status).HasColumnName("status");
            entity.Property(e => e.Userid).HasColumnName("userid");

            entity.HasOne(d => d.Property).WithMany(p => p.Tenantproperties)
                .HasForeignKey(d => d.Propertyid)
                .HasConstraintName("tenantproperty_ibfk_2");

            entity.HasOne(d => d.User).WithMany(p => p.Tenantproperties)
                .HasForeignKey(d => d.Userid)
                .HasConstraintName("tenantproperty_ibfk_1");
        });

        modelBuilder.Entity<User>(entity =>
        {
            entity.HasKey(e => e.Userid).HasName("PRIMARY");

            entity.ToTable("user");

            entity.HasIndex(e => e.Aadharno, "aadharno").IsUnique();

            entity.HasIndex(e => e.Areaid, "areaid");

            entity.HasIndex(e => e.Contact, "contact").IsUnique();

            entity.HasIndex(e => e.Email, "email").IsUnique();

            entity.HasIndex(e => e.Roleid, "roleid");

            entity.HasIndex(e => e.Upiid, "upiid").IsUnique();

            entity.Property(e => e.Userid).HasColumnName("userid");
            entity.Property(e => e.Aadharno).HasColumnName("aadharno");
            entity.Property(e => e.Address)
                .HasMaxLength(255)
                .HasColumnName("address");
            entity.Property(e => e.Areaid).HasColumnName("areaid");
            entity.Property(e => e.Contact).HasColumnName("contact");
            entity.Property(e => e.Email).HasColumnName("email");
            entity.Property(e => e.Firstname)
                .HasMaxLength(255)
                .HasColumnName("firstname");
            entity.Property(e => e.Lastname)
                .HasMaxLength(255)
                .HasColumnName("lastname");
            entity.Property(e => e.Password)
                .HasMaxLength(255)
                .HasColumnName("password");
            entity.Property(e => e.Resettoken)
                .HasMaxLength(255)
                .HasColumnName("resettoken");
            entity.Property(e => e.Roleid).HasColumnName("roleid");
            entity.Property(e => e.Tokenexpiry)
                .HasColumnType("datetime")
                .HasColumnName("tokenexpiry");
            entity.Property(e => e.Upiid).HasColumnName("upiid");

            entity.HasOne(d => d.Area).WithMany(p => p.Users)
                .HasForeignKey(d => d.Areaid)
                .HasConstraintName("user_ibfk_2");

            entity.HasOne(d => d.Role).WithMany(p => p.Users)
                .HasForeignKey(d => d.Roleid)
                .HasConstraintName("user_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
