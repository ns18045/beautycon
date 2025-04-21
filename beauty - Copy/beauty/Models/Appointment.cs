namespace beauty.Models
{
    public class Appointment
    {
        public int Id { get; set; }
        public string Date { get; set; }
        public string TimeStart { get; set; }
        public string TimeEnd { get; set; }
        public string Description { get; set; }
        public bool Canceled { get; set; }
        public int? MasterId { get; set; }
        public int? ClientId { get; set; }
    }
}
