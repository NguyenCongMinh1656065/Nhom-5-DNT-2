using Microsoft.EntityFrameworkCore;

namespace QuanlyUser.Entities {
    public class ApplicationDbContext : DbContext {
        public DbSet<Product> Products { get; set; }
        public DbSet<User> Users { get; set; }
        public DbSet<Order> Orders { get; set; }
        public DbSet<Cart> Carts { get; set; }
        public DbSet<ProductOrder> ProductOrders { get; set; }



        public ApplicationDbContext(DbContextOptions options) : base(options) {

        }
        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder) {

        }
        protected override void OnModelCreating(ModelBuilder modelBuilder) {
            modelBuilder.Entity<Product>(entity => {
                entity.ToTable("Product");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd().IsRequired();
                entity.Property(e => e.ProductName).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Price).HasColumnType("int").IsRequired();
                entity.Property(e => e.ProductImage).HasColumnType("varchar(max)").IsRequired();
                entity.Property(e => e.ProductDescription).HasColumnType("nvarchar(1000)").IsRequired();
                entity.Property(e => e.Category).HasColumnType("int").IsRequired();
                entity.Property(e => e.Brand).HasColumnType("nvarchar(1000)").IsRequired();
            });

            modelBuilder.Entity<ProductOrder>(entity => {
                entity.ToTable("ProductOrder");
                entity.Property(e => e.ProductId).HasColumnType("int").IsRequired();
                entity.Property(e => e.Id).ValueGeneratedOnAdd().HasColumnType("int").IsRequired();
                entity.Property(e => e.OrderId).HasColumnType("int").IsRequired();
                entity.Property(e => e.ProductName).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Price).HasColumnType("int").IsRequired();
                entity.Property(e => e.Quantity).HasColumnType("int").IsRequired();
                entity.Property(e => e.ProductImage).HasColumnType("varchar(max)").IsRequired();
            });

            modelBuilder.Entity<Cart>(entity => {
                entity.ToTable("Cart");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd().IsRequired();
                entity.Property(e => e.ProductId).HasColumnType("int").IsRequired();
                entity.Property(e => e.CustomerId).HasColumnType("int").IsRequired();
                entity.Property(e => e.ProductName).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Price).HasColumnType("int").IsRequired();
                entity.Property(e => e.ProductImage).HasColumnType("varchar(max)").IsRequired();
                entity.Property(e => e.ProductDescription).HasColumnType("nvarchar(1000)").IsRequired();
                entity.Property(e => e.Quantity).HasColumnType("int").IsRequired();
            });
            modelBuilder.Entity<User>(entity => {
                entity.ToTable("User");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd().IsRequired();
                entity.Property(e => e.UserName).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.FullName).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Password).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Email).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Phone).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Rank).HasColumnType("int").IsRequired().HasDefaultValue(UserRank.MEMBER);

                entity.Property(e => e.UserType).HasColumnType("int").IsRequired();
            });
            modelBuilder.Entity<Order>(entity => {
                entity.ToTable("Order");
                entity.HasKey(e => e.Id);
                entity.Property(e => e.Id).ValueGeneratedOnAdd().IsRequired();
                entity.Property(e => e.CustomerId).HasColumnType("int").IsRequired();
                entity.Property(e => e.CustomerName).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.PhoneNumber).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Address).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.Discount).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.DiscountPrice).HasColumnType("int").IsRequired();
                entity.Property(e => e.Delivery).HasColumnType("nvarchar(50)").IsRequired();
                entity.Property(e => e.DeliveryPrice).HasColumnType("int").IsRequired();
                entity.Property(e => e.FinalPrice).HasColumnType("int").IsRequired();
                entity.Property(e => e.Status).HasColumnType("nvarchar(100)").HasDefaultValue("Chờ xác nhận").IsRequired();
            });
        }
    }
}
