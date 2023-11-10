using QuanlyUser.Dto.Customers;
using QuanlyUser.Dto.Order;
using QuanlyUser.Dto.Shared;

namespace QuanlyUser.Services.Interfaces {
    public interface IOrderService {
        void Create(CreateOrderDto input);
        void Delete(int id);
        void Cancel(int id);

        void Confirm(int id);

        float GetShipFee(float amt);

        void DeleteAllFull();
        public void UserConfirm(int id);
        List<OrderDto> GetAll();
        PageResultDto<List<OrderDto>> GetAllWithPage(FilterDto input);
        public OrderDto GetUserOrderDetail(FilterDto input);
    }
}
