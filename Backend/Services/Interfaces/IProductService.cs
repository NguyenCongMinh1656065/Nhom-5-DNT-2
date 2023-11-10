using QuanlyUser.Dto.Customers;
using QuanlyUser.Dto.Shared;
using QuanlyUser.Entities;

namespace QuanlyUser.Services.Interfaces
{
    public interface IProductService
    {
        void Create(CreateProductDto input);
        void Delete(int id);
        List<Product> GetAll();
        PageResultDto<List<Product>> GetAllWithPage(FilterDto input);
        Product GetbyId(int id);
        void Update(UpdateProductDto input);
    }
}
