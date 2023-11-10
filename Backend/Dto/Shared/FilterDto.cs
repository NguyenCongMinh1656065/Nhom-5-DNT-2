using Microsoft.AspNetCore.Mvc;

namespace QuanlyUser.Dto.Shared {
    public class FilterDto {
        [FromQuery(Name = "pageSize")]
        public int PageSize { get; set; }
        [FromQuery(Name = "pageIndex")]
        public int PageIndex { get; set; }
        private string _keyword;
        [FromQuery(Name = "keyword")]
        public string Keyword {
            get => this._keyword;
            set => this._keyword = value?.Trim();
        }
        public int IdKeyWord { get; set; }
    }
}
