using QuanlyUser.Dto.Products;

namespace QuanlyUser.Dto.Customers {
    public class CreateOrderDto {
        public int CustomerId { get; set; }
        public string CustomerName { get; set; }
        public string PhoneNumber { get; set; }
        public string Address { get; set; }
        public string Delivery { get; set; }
        public int DeliveryPrice { get; set; }
        public string Discount { get; set; }
        public int DiscountPrice { get; set; }
        public int FinalPrice { get; set; }

        public string Status { get; set; }
        public List<ProductBillDto> ProductIds { get; set; }
    }
}
