using Microsoft.AspNetCore.Mvc;
using QuanlyUser.Dto.Exceptions;
using QuanlyUser.Exceptions;

namespace QuanlyUser.Controllers {
    public class APIControllerBase : ControllerBase {
        protected ILogger _logger;
        public APIControllerBase(ILogger logger) {
            this._logger = logger;
        }
        protected IActionResult ReturnException(Exception ex) {
            if (ex is UserFriendlyException) {
                var userEx = ex as UserFriendlyException;
                return this.StatusCode(StatusCodes.Status500InternalServerError, new ExceptionBody {
                    Message = userEx.Message
                });
            }
            this._logger.LogError(ex, ex.Message);
            return this.StatusCode(StatusCodes.Status500InternalServerError, new ExceptionBody {
                Message = ex.Message
            });
        }
    }
}
