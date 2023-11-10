using QuanlyUser.Entities;

namespace QuanlyUser.Dto.User {
    public class UserPriceDto {
        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int UserType { get; set; }
        public int TotalPrice { get; set; }
        public UserRank Rank { get; set; }
    }
}
