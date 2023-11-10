using System.ComponentModel.DataAnnotations;

namespace QuanlyUser.Dto.User
{
    public class CreateUserDto
    {
        private string _username;
        public string UserName { get => _username; set => _username = value?.Trim(); }   
        private string _password;
        public string FullName { get; set; }
        public string Password { get => _password; set => _password = value?.Trim(); }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int UserType { get; set; }
    }
}
