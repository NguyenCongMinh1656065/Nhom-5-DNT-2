using System.IdentityModel.Tokens.Jwt;
using Microsoft.AspNetCore.Mvc;
using QuanlyUser.Dto.User;
using QuanlyUser.Entities;
using QuanlyUser.Services.Interfaces;

namespace QuanlyUser.Controllers {
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : APIControllerBase {
        private readonly IUserService _userService;
        public UserController(IUserService userService,
            ILogger<UserController> logger) : base(logger) {
            this._userService = userService;
        }
        [HttpGet("get-all")]
        public IActionResult GetAll() {
            try {
                var students = this._userService.GetAll();
                return this.Ok(students);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            };
        }
        [HttpGet("get-user-by-id/{id}")]
        public IActionResult GetById([FromQuery] int id) {
            try {
                User user = this._userService.GetbyId(id);
                return this.Ok(user);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpPost("create")]
        public IActionResult Create(CreateUserDto input) {
            try {
                Console.WriteLine(input.UserType);
                this._userService.Create(input);
                return this.Ok();
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
        [HttpPost("update")]
        public IActionResult UpdateById(UpdateUserDto input) {
            try {
                this._userService.Update(input);
                return this.Ok(this._userService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpPut("update-user")]
        public IActionResult UpdateUser(User input) {
            try {
                this._userService.UpdateUser(input);
                return this.Ok(this._userService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpDelete("deleted-user/(id)")]
        public IActionResult DeleteUser(int id) {
            try {
                this._userService.DeleteUser(id);
                return this.Ok(this._userService);
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }

        [HttpPost("login")]
        public IActionResult Login(LoginDto input) {
            try {
                string token = this._userService.Login(input);
                var handler = new JwtSecurityTokenHandler();
                var decodedValue = handler.ReadJwtToken(token);
                var currentId = decodedValue.Payload.Sub;
                return this.Ok(new { token, currentId });
            } catch (Exception ex) {
                return this.ReturnException(ex);
            }
        }
    }
}

