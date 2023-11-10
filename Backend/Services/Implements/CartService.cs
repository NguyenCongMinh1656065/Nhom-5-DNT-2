using QuanlyUser.Dto.Cart;
using QuanlyUser.Dto.Shared;
using QuanlyUser.Entities;
using QuanlyUser.Exceptions;
using QuanlyUser.Services.Interfaces;

namespace QuanlyUser.Services.Implements {
    public class CartService : ICartService {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        public CartService(ILogger<CartService> logger, IConfiguration configuration, ApplicationDbContext dbContext) {
            this._logger = logger;
            this._configuration = configuration;
            this._dbContext = dbContext;
        }
        public List<Cart> GetAll() {
            var listCart = from cart in this._dbContext.Carts
                           select new Cart {
                               Id = cart.Id,
                               CustomerId = cart.CustomerId,
                               ProductName = cart.ProductName,
                               ProductImage = cart.ProductImage,
                               Price = cart.Price,
                               ProductDescription = cart.ProductDescription,
                               Quantity = cart.Quantity,
                               ProductId = cart.ProductId,
                           };
            return listCart.ToList();
        }
        public PageResultDto<List<Cart>> GetAllWithPage(FilterDto input) {
            var cartQuery = this._dbContext.Carts.AsQueryable();
            if (input.IdKeyWord != 0) {
                cartQuery = cartQuery.Where(s =>
                s.CustomerId == input.IdKeyWord);
            }
            int totalItem = cartQuery.Count();
            cartQuery = cartQuery.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);

            return new PageResultDto<List<Cart>> {
                Items = cartQuery.ToList(),
                TotalItem = totalItem,
            };
        }
        public Cart GetbyId(int id) {
            var cart = this._dbContext.Carts.FirstOrDefault((p) => p.Id == id);
            return cart;
        }
        public void Create(CreateCartDto input) {
            this._dbContext.Carts.Add(new Cart {
                CustomerId = input.CustomerId,
                ProductImage = input.ProductImage,
                Price = input.Price,
                ProductName = input.ProductName,
                ProductDescription = input.ProductDescription,
                Quantity = input.Quantity,
                ProductId = input.ProductId,
            });
            this._dbContext.SaveChanges();
        }
        public void Delete(int id) {
            var cart = this._dbContext.Carts.FirstOrDefault((p) => p.Id == id);
            if (cart != null) {
                this._dbContext.Carts.Remove(cart);
            }
            this._dbContext.SaveChanges();
        }
        public void DeleteAll(int id) {
            var rows = from o in this._dbContext.Carts.Where(s => s.CustomerId == id) select o;
            foreach (var row in rows) {
                this._dbContext.Carts.Remove(row);
            }
            this._dbContext.SaveChanges();
        }
        public void DeleteAllFull() {
            var rows = from o in this._dbContext.Carts select o;
            foreach (var row in rows) {
                this._dbContext.Carts.Remove(row);
            }
            this._dbContext.SaveChanges();
        }

        public void IncreaseQuantity(int id, int amount) {
            var cart = this._dbContext.Carts.FirstOrDefault((p) => p.Id == id);
            if (cart == null) {
                throw new UserFriendlyException("Không tìm thấy cart");
            }
            cart.Quantity += amount;
            this._dbContext.SaveChanges();
        }

        public void DecreaseQuantity(int id, int amount) {
            var cart = this._dbContext.Carts.FirstOrDefault((p) => p.Id == id);
            if (cart == null) {
                throw new UserFriendlyException("Không tìm thấy cart");
            }
            cart.Quantity -= amount;
            if (cart.Quantity <= 0) {
                this._dbContext.Carts.Remove(cart);
            }
            this._dbContext.SaveChanges();
        }
    }

}
