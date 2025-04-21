namespace beauty.Models
{
    public class Chat
    {
        public int Id { get; set; }
        public int MasterId { get; set; }
        public int ClientId { get; set; }
        public bool MasterSeen { get; set; }
        public bool ClientSeen { get; set; }
    }

    public class Message
    {
        public int Id { get; set; }
        public int ChatId { get; set; }
        public int UserFromId { get; set; }
        public int UserToId { get; set; }
        public string Text { get; set; }
    }
}
