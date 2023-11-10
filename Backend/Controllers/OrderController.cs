using Microsoft.AspNetCore.Mvc;
using QuanlyUser.Dto.Customers;
using QuanlyUser.Dto.Shared;
using QuanlyUser.Services.Interfaces;

namespace QuanlyUser.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : APIControllerBase {
        private readonly IOrderService _orderService;
        public OrderController(IOrderService orderService, ILogger<OrderController> logger) : base(logger) {
            this._orderService = orderService;
        }
        [HttpGet("get-all")]
        public IActionResult GetAll() {
            try {
                var orders = this._orderService.GetAll();
                return this.Ok(orders);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            };
        }
        [HttpGet("get-all-with-page")]
        public IActionResult GetAllWithPage([FromQuery] FilterDto input) {
            return this.Ok(this._orderService.GetAllWithPage(input));
        }

        [HttpGet("get-bill")]
        public IActionResult GetUserBill([FromQuery] FilterDto input) {
            try {
                return this.Ok(this._orderService.GetUserOrderDetail(input));

            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpPost("create")]
        public IActionResult CreateOrder(CreateOrderDto input) {
            try {
                this._orderService.Create(input);
                return this.Ok();
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpPost("cancel/{id}")]
        public IActionResult CancelOrder(int id) {
            Console.WriteLine(id);

            try {
                this._orderService.Cancel(id);
                return this.Ok();
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpGet("ship/fee")]
        public IActionResult GetShipFee(float amt) {
            try {
                if (amt < 0) {
                    throw new Exception("Gia tri don hang phai lon hon 0.");
                }
                return this.Ok(this._orderService.GetShipFee(amt));
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpPost("admin-confirm/{id}")]
        public IActionResult ConfirmOrder(int id) {
            Console.WriteLine(id);
            try {
                this._orderService.Confirm(id);
                return this.Ok();
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
        [HttpPost("user-confirm/{id}")]
        public IActionResult UserConfirmOrder(int id) {
            try {
                this._orderService.UserConfirm(id);
                return this.Ok();
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpDelete("delete/{id}")]
        public IActionResult DeleteById(int id) {
            try {
                this._orderService.Delete(id);
                return this.Ok(this._orderService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
        [HttpDelete("delete-all-full")]
        public IActionResult DeleteAllFull() {
            try {
                this._orderService.DeleteAllFull();
                return this.Ok(this._orderService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
    }

}
