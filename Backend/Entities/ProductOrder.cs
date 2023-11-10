namespace QuanlyUser.Entities {
    public class ProductOrder {
        public int Id { get; set; }
        public int ProductId { get; set; }
        public int OrderId { get; set; }
        public string ProductImage { get; set; }

        public string ProductName { get; set; }
        public int Price { get; set; }
        public int Quantity { get; set; }

    }
}
