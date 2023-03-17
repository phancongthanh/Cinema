using System.ComponentModel.DataAnnotations;

namespace Cinema.Models;

public class RegisterModel
{
    [Required]
    [EmailAddress]
    public string Email { get; set; }

    [Required]
    [DataType(DataType.Password)]
    public string Password { get; set; }

    [DataType(DataType.Password)]
    [Display(Name = "Confirm password")]
    [Compare("Password",
        ErrorMessage = "Password and confirmation password do not match.")]
    public string ConfirmPassword { get; set; }

    // Add a Role field to allow user to select role
    [Required]
    public string Role { get; set; }
}
