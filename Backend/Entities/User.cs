namespace QuanlyUser.Entities {
    public enum UserRank {
        MEMBER = 1,
        GOLDEN = 2,
        DIAMOND = 3
    }
    public class User {

        public int Id { get; set; }
        public string UserName { get; set; }
        public string FullName { get; set; }
        public string Password { get; set; }
        public string Email { get; set; }
        public string Phone { get; set; }
        public int UserType { get; set; }

        public UserRank Rank { get; set; }

    }
}
