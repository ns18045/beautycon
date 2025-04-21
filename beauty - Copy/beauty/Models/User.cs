namespace beauty.Models
{
    public class User
    {
        public int Id { get; set;  }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Adress { get; set; }
        public string Description { get; set; }
        public string Service { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public IEnumerable<UserFeedback> Feedbacks { get; set; } = new UserFeedback[] { };
        public IEnumerable<Appointment> Appointments { get; set; } = new Appointment[] { };
    }

    public class CurrentUser
    {
        public int Id { get; set; }
        public string Email { get; set; }
        public string Role { get; set; }
    }

    public class LoginUser
    {
        public string Username { get; set; }
        public string Password { get; set; }
    }

    public class UserDetail
    {
        public int Id { get; set; }
        public string Name { get; set; }
        public string Surname { get; set; }
        public string Adress { get; set; }
        public string Description { get; set; }
        public string Service { get; set; }
        public string Role { get; set; }
        public string Email { get; set; }
        public string Password { get; set; }
        public string PhoneNumber { get; set; }
        public float Rating { get; set; }
    }

    public class UserFeedback
    {
        public int Id { get; set; }
        public string FeedbackText { get; set; }
        public int Mark { get; set; }
        public int UserId { get; set; }
    }

    public class UserById
    { 
        public string Email { get; set; }
    }
}
