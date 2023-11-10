using QuanlyUser.Dto.Customers;
using QuanlyUser.Dto.Order;
using QuanlyUser.Dto.Shared;
using QuanlyUser.Entities;
using QuanlyUser.Exceptions;
using QuanlyUser.Services.Interfaces;

namespace QuanlyUser.Services.Implements {
    public class OrderService : IOrderService {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        public OrderService(ILogger<OrderService> logger, IConfiguration configuration, ApplicationDbContext dbContext) {
            this._logger = logger;
            this._configuration = configuration;
            this._dbContext = dbContext;
        }
        public List<OrderDto> GetAll() {
            var orderQuery = this._dbContext.Orders;

            List<OrderDto> dtos = new List<OrderDto>();

            foreach (var order in orderQuery.ToList()) {
                List<ProductOrder> pInBill = this._dbContext.ProductOrders.Where((o) => o.OrderId == order.Id).ToList();
                OrderDto dto = new OrderDto() {
                    Products = pInBill,
                    Address = order.Address,
                    CustomerId = order.CustomerId,
                    CustomerName = order.CustomerName,
                    Delivery = order.Delivery,
                    DeliveryPrice = order.DeliveryPrice,
                    Discount = order.Discount,
                    DiscountPrice = order.DiscountPrice,
                    FinalPrice = order.FinalPrice,
                    Id = order.Id,
                    PhoneNumber = order.PhoneNumber,
                    Status = order.Status,
                };
                dtos.Add(dto);
            }
            return dtos;
        }
        public PageResultDto<List<OrderDto>> GetAllWithPage(FilterDto input) {
            var orderQuery = this._dbContext.Orders.AsQueryable();
            if (input.IdKeyWord != 0) {
                orderQuery = orderQuery.Where(s =>
                s.CustomerId == input.IdKeyWord);
            }
            int totalItem = orderQuery.Count();
            orderQuery = orderQuery.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);

            List<OrderDto> dtos = new List<OrderDto>();

            foreach (var order in orderQuery.ToList()) {
                List<ProductOrder> pInBill = this._dbContext.ProductOrders.Where((o) => o.OrderId == order.Id).ToList();
                OrderDto dto = new OrderDto() {
                    Products = pInBill,
                    Address = order.Address,
                    CustomerId = order.CustomerId,
                    CustomerName = order.CustomerName,
                    Delivery = order.Delivery,
                    DeliveryPrice = order.DeliveryPrice,
                    Discount = order.Discount,
                    DiscountPrice = order.DiscountPrice,
                    FinalPrice = order.FinalPrice,
                    Id = order.Id,
                    PhoneNumber = order.PhoneNumber,
                    Status = order.Status,
                };
                dtos.Add(dto);
            }

            return new PageResultDto<List<OrderDto>> {
                Items = dtos,
                TotalItem = totalItem,
            };
        }

        public OrderDto GetUserOrderDetail(FilterDto input) {
            try {
                var orderQuery = from i in this._dbContext.Orders where i.Id == Int32.Parse(input.Keyword) && i.CustomerId == input.IdKeyWord select i;
                Order order = orderQuery.FirstOrDefault();
                if (order == null) {
                    throw new UserFriendlyException("Khong tim thay!");
                }
                List<ProductOrder> pInBill = this._dbContext.ProductOrders.Where((o) => o.OrderId == order.Id).ToList();
                return new OrderDto {
                    Status = order.Status,
                    PhoneNumber = order.PhoneNumber,
                    FinalPrice = order.FinalPrice,
                    Id = order.Id,
                    Address = order.Address
                   , CustomerId = order.CustomerId,
                    CustomerName = order.CustomerName,
                    Delivery = order.Delivery,
                    DeliveryPrice = order.DeliveryPrice,
                    Discount = order.Discount,
                    DiscountPrice = order.DiscountPrice,
                    Products = pInBill
                };
            } catch (Exception ex) {
                Console.WriteLine(ex);
                throw new UserFriendlyException(ex.Message);
            }

        }
        public void Create(CreateOrderDto input) {

            var newOrder = this._dbContext.Orders.Add(new Order {
                CustomerId = input.CustomerId,
                CustomerName = input.CustomerName,
                PhoneNumber = input.PhoneNumber,
                Address = input.Address,
                Delivery = input.Delivery,
                DeliveryPrice = input.DeliveryPrice,
                Discount = input.Discount,
                DiscountPrice = input.DiscountPrice,
                FinalPrice = input.FinalPrice,
                Status = input.Status,
            });
            this._dbContext.SaveChanges();
            Order entity = newOrder.Entity;
            foreach (var id in input.ProductIds) {
                this._dbContext.ProductOrders.Add(new ProductOrder() {
                    OrderId = entity.Id,
                    ProductImage = id.ProductImage,
                    Price = id.Price,
                    ProductId = id.Id,
                    ProductName = id.ProductName,
                    Quantity = id.Quantity
                });
            }
            this._dbContext.SaveChanges();
        }
        public void Delete(int id) {
            var order = this._dbContext.Orders.FirstOrDefault((p) => p.Id == id);
            if (order != null) {
                this._dbContext.Orders.Remove(order);
            }
            this._dbContext.SaveChanges();
        }
        public void DeleteAllFull() {
            var rows = from o in this._dbContext.Orders select o;
            foreach (var row in rows) {
                this._dbContext.Orders.Remove(row);
            }
            this._dbContext.SaveChanges();
        }

        public void Cancel(int id) {
            var bill = this._dbContext.Orders.Find(id);
            if (bill == null) {
                throw new UserFriendlyException("Khong tim thay bill.");
            }
            bill.Status = "Đã hủy";
            this._dbContext.SaveChanges();
        }

        public void Confirm(int id) {
            var bill = this._dbContext.Orders.Find(id) ?? throw new UserFriendlyException("Khong tim thay bill.");
            bill.Status = "Đang giao hàng";
            this._dbContext.SaveChanges();
        }
        public void UserConfirm(int id) {
            var bill = this._dbContext.Orders.Find(id) ?? throw new UserFriendlyException("Khong tim thay bill.");
            bill.Status = "Đã nhận hàng";

            int total = this._dbContext.Orders.Where(o => o.CustomerId == bill.CustomerId).Sum(i => i.FinalPrice);

            User user = this._dbContext.Users.Where(u => u.Id == bill.CustomerId).FirstOrDefault();
            if (user != null) {
                if (total > 10000000) {
                    user.Rank = UserRank.DIAMOND;
                } else if (total > 5000000) {
                    user.Rank = UserRank.GOLDEN;
                } else {
                    user.Rank = UserRank.MEMBER;
                }
            }
            this._dbContext.SaveChanges();
        }

        public float GetShipFee(float amt) {
            float ship = 30000;
            Random random = new Random();
            float diff = 1000 + amt * (float)0.05;
            Console.WriteLine(diff);
            ship += diff;
            return (float)Math.Ceiling(ship);
        }
    }
}
