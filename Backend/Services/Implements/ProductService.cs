using QuanlyUser.Dto.Customers;
using QuanlyUser.Dto.Shared;
using QuanlyUser.Entities;
using QuanlyUser.Services.Interfaces;

namespace QuanlyUser.Services.Implements {
    public class ProductService : IProductService {
        private readonly ILogger _logger;
        private readonly IConfiguration _configuration;
        private readonly ApplicationDbContext _dbContext;
        public ProductService(ILogger<ProductService> logger, IConfiguration configuration, ApplicationDbContext dbContext) {
            this._logger = logger;
            this._configuration = configuration;
            this._dbContext = dbContext;
        }
        public List<Product> GetAll() {
            var listStudent = from customer in this._dbContext.Products
                              select new Product {
                                  Id = customer.Id,
                                  ProductName = customer.ProductName,
                                  ProductImage = customer.ProductImage,
                                  Price = customer.Price,
                                  ProductDescription = customer.ProductDescription,
                                  Brand = customer.Brand,
                                  Category = customer.Category
                              };
            return listStudent.ToList();


        }
        public PageResultDto<List<Product>> GetAllWithPage(FilterDto input) {
            var customerQuery = this._dbContext.Products.AsQueryable();
            if (input.Keyword != null) {
                customerQuery = customerQuery.Where(s => s.ProductName != null &&
                s.ProductName.Contains(input.Keyword));
            }
            int totalItem = customerQuery.Count();
            customerQuery = customerQuery.Skip(input.PageSize * (input.PageIndex - 1)).Take(input.PageSize);

            return new PageResultDto<List<Product>> {
                Items = customerQuery.ToList(),
                TotalItem = totalItem,
            };
        }
        public Product GetbyId(int id) {
            var student = this._dbContext.Products.FirstOrDefault((p) => p.Id == id);
            return student;
        }
        public void Create(CreateProductDto input) {
            this._dbContext.Products.Add(new Product {
                ProductImage = input.ProductImage,
                Price = input.Price,
                ProductName = input.ProductName,
                ProductDescription = input.ProductDescription,
                Brand = input.Brand,
                Category = input.Category
            });
            this._dbContext.SaveChanges();
        }
        public void Update(UpdateProductDto input) {
            var customer = this._dbContext.Products.FirstOrDefault(p => p.Id == input.Id);
            if (customer != null) {
                //  customer.ProductImage = input.ProductImage;
                customer.Price = input.Price;
                customer.ProductName = input.ProductName;
                customer.ProductDescription = input.ProductDescription;
                customer.Brand = input.Brand;
                customer.Category = input.Category;

            }
            this._dbContext.SaveChanges();
        }
        public void Delete(int id) {
            var customer = this._dbContext.Products.FirstOrDefault((p) => p.Id == id);
            if (customer != null) {
                this._dbContext.Products.Remove(customer);
            }
            this._dbContext.SaveChanges();
        }
    }
}
