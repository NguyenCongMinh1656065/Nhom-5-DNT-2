using Microsoft.AspNetCore.Mvc;
using QuanlyUser.Dto.Customers;
using QuanlyUser.Dto.Shared;
using QuanlyUser.Entities;
using QuanlyUser.Services.Interfaces;

namespace QuanlyUser.Controllers {

    //   [Authorize]
    //  [AuthorizationFilter(UserTypes.Admin)]
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : APIControllerBase {
        private readonly IProductService _productService;
        public ProductController(IProductService customerService, ILogger<ProductController> logger) : base(logger) {
            this._productService = customerService;
        }
        [HttpGet("get-all")]
        public IActionResult GetAll() {
            try {
                var students = this._productService.GetAll();
                return this.Ok(students);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            };
        }
        [HttpGet("get-all-with-page")]
        public IActionResult GetAllWithPage([FromQuery] FilterDto input) {
            return this.Ok(this._productService.GetAllWithPage(input));
        }
        [HttpGet("get-product-by-id/{id}")]
        public IActionResult GetById(int id) {
            try {
                Product product = this._productService.GetbyId(id);
                return this.Ok(product);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpPost("create")]
        public IActionResult CreateStudent([FromForm] CreateProductDto input) {
            try {
                this._productService.Create(input);
                return this.Ok();
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
        [HttpPut("update")]
        public IActionResult UpdateById([FromForm] UpdateProductDto input) {
            try {
                this._productService.Update(input);
                return this.Ok(this._productService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
        [HttpDelete("delete/{id}")]
        public IActionResult DeleteById(int id) {
            try {
                this._productService.Delete(id);
                return this.Ok(this._productService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
    }
}
