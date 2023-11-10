using System.Security.Cryptography;
using System.Text;

namespace QuanlyUser.Utils
{
    public class CommonUtils
    {
        public static string CreateMD5(string input)
        {
            using MD5 md5 = MD5.Create();
            byte[] inputBytes = Encoding.Unicode.GetBytes(input);
            byte[] hashBytes = md5.ComputeHash(inputBytes);
            return Convert.ToHexString(hashBytes); 
        }
    }
}
