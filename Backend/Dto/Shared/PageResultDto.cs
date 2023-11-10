namespace QuanlyUser.Dto.Shared
{
    public class PageResultDto<T>
    {
        public T Items { get; set; }
        public int TotalItem { get; set; }
    }
}
