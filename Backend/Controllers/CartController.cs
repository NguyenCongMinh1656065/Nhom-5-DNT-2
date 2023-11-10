using Microsoft.AspNetCore.Mvc;
using QuanlyUser.Dto.Cart;
using QuanlyUser.Dto.Shared;
using QuanlyUser.Entities;
using QuanlyUser.Services.Interfaces;

namespace QuanlyUser.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class CartController : APIControllerBase {
        private readonly ICartService _cartService;
        public CartController(ICartService cartService, ILogger<CartController> logger) : base(logger) {
            this._cartService = cartService;
        }
        [HttpGet("get-all")]
        public IActionResult GetAll() {
            try {
                var cart = this._cartService.GetAll();
                return this.Ok(cart);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            };
        }
        [HttpGet("get-all-with-page")]
        public IActionResult GetAllWithPage([FromQuery] FilterDto input) {
            return this.Ok(this._cartService.GetAllWithPage(input));
        }
        [HttpGet("get-cart-by-id/{id}")]
        public IActionResult GetById([FromQuery] int id) {
            try {
                Cart cart = this._cartService.GetbyId(id);
                return this.Ok(cart);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpPost("create")]
        public IActionResult CreateCart(CreateCartDto input) {
            try {
                this._cartService.Create(input);
                return this.Ok();
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
        [HttpPost("update/quantity/{cartId}")]
        public IActionResult UpdateQuantity(int cartId, bool increase, int amount) {
            try {
                if (increase) {
                    this._cartService.IncreaseQuantity(cartId, amount);
                } else {
                    this._cartService.DecreaseQuantity(cartId, amount);
                }
                return this.Ok();
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }


        [HttpDelete("delete/{id}")]
        public IActionResult DeleteById(int id) {
            try {
                this._cartService.Delete(id);
                return this.Ok(this._cartService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
        [HttpDelete("delete-all/{customerId}")]
        public IActionResult DeleteAll(int customerId) {
            try {
                this._cartService.DeleteAll(customerId);
                return this.Ok(this._cartService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
        [HttpDelete("delete-all-full")]
        public IActionResult DeleteAllFull() {
            try {
                this._cartService.DeleteAllFull();
                return this.Ok(this._cartService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
    }
}
