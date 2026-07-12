using FluentValidation;
using SkFabricator.Application.Features.Authentication.DTOs;

namespace SkFabricator.Application.Features.Authentication.Validators
{
    public class LoginRequestValidator : AbstractValidator<LoginRequest>
    {
        public LoginRequestValidator()
        {
            RuleFor(x => x.Email).NotEmpty().EmailAddress();
            RuleFor(x => x.Password).NotEmpty();
        }
    }
}
