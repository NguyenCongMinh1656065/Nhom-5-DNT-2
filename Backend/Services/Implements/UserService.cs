using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using Microsoft.IdentityModel.Tokens;
using QuanlyUser.Constants;
using QuanlyUser.Dto.User;
using QuanlyUser.Entities;
using QuanlyUser.Exceptions;
using QuanlyUser.Services.Interfaces;
using QuanlyUser.Utils;

namespace QuanlyUser.Services.Implements {
    public class UserService : IUserService {
        private readonly ILogger _logger;
        private readonly ApplicationDbContext _dbContext;
        private readonly IConfiguration _configuration;

        public UserService(ILogger<ProductService> logger, ApplicationDbContext dbContext, IConfiguration configuration) {
            this._logger = logger;
            this._dbContext = dbContext;
            this._configuration = configuration;
        }
        public List<UserPriceDto> GetAll() {
            List<UserPriceDto> result = new List<UserPriceDto>();

            try {
                var listUser = from user in this._dbContext.Users
                               select new User {
                                   Id = user.Id,
                                   FullName = user.FullName,
                                   UserName = user.UserName,
                                   Password = user.Password,
                                   Email = user.Email,
                                   Phone = user.Phone,
                                   UserType = user.UserType,
                                   Rank = user.Rank
                               };
                foreach (var items in listUser.ToArray()) {
                    int total = this._dbContext.Orders.Where(o => o.CustomerId == items.Id).Sum(i => i.FinalPrice);
                    var user = new UserPriceDto() {
                        Id = items.Id,
                        FullName = items.FullName,
                        UserName = items.UserName,
                        Password = items.Password,
                        Email = items.Email,
                        Phone = items.Phone,
                        Rank = items.Rank,
                        UserType = items.UserType,
                        TotalPrice = total,
                    };
                    result.Add(user);
                }
            } catch (Exception e) {
                Console.WriteLine(e);
            }
            return result;

        }

        public void UpdateUser(User input) {
            var user = this._dbContext.Users.FirstOrDefault(p => p.Id == input.Id);
            if (user != null) {
                user.FullName = input.FullName;
                user.Phone = input.Phone;

            }
            this._dbContext.SaveChanges();
        }

        public void DeleteUser(int id) {
            var user = this._dbContext.Users.FirstOrDefault(p => p.Id == id);
            if (user != null) {
                this._dbContext.Users.Remove(user);
            }
            this._dbContext.SaveChanges();
        }

        public User GetbyId(int id) {
            var user = this._dbContext.Users.FirstOrDefault((p) => p.Id == id);
            return user;
        }
        public void Create(CreateUserDto input) {
            if (this._dbContext.Users.Any(u => u.UserName == input.UserName)) {
                throw new UserFriendlyException($"Ten tai khoan \"{input.UserName}\" da ton tai");
            }
            this._dbContext.Users.Add(new User {
                FullName = input.FullName,
                UserName = input.UserName,
                Password = CommonUtils.CreateMD5(input.Password),
                Email = input.Email,
                Phone = input.Phone,
                UserType = input.UserType
            });
            this._dbContext.SaveChanges();
        }
        public void Update(UpdateUserDto input) {
            var user = this._dbContext.Users.FirstOrDefault(p => p.Id == input.Id);
            if (user != null) {
                user.Password = CommonUtils.CreateMD5(input.Password);
            }
            this._dbContext.SaveChanges();
        }
        public string Login(LoginDto input) {
            Console.WriteLine(input.UserName);

            Console.WriteLine(input.Password);
            var user = this._dbContext.Users.FirstOrDefault(u => u.UserName == input.UserName);
            if (user == null) {
                throw new UserFriendlyException($"Tai khoan mat khau khong chinh xac.");
            }
            if (CommonUtils.CreateMD5(input.Password) == user.Password) {
                var authSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(this._configuration["JWT:Secret"]));
                var claims = new List<Claim>
                {
                    new Claim(JwtRegisteredClaimNames.Sub,user.Id.ToString()),
                    new Claim(JwtRegisteredClaimNames.Name,user.UserName),
                    new Claim(CustomClaimTypes.UserType,user.UserType.ToString())
                };
                var token = new JwtSecurityToken(
                    issuer: this._configuration["JWT:ValidIssuer"],
                    audience: this._configuration["JWT:ValidAudience"],
                    expires: DateTime.Now.AddSeconds(this._configuration.GetValue<int>("JWT:Expires")),
                    claims: claims,
                    signingCredentials: new SigningCredentials(authSigningKey, SecurityAlgorithms.HmacSha256)
                    );
                return new JwtSecurityTokenHandler().WriteToken(token);
            } else {
                throw new UserFriendlyException($"Mat khau khong chinh xac");
            }
        }

    }
}
