using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;

namespace Resource
{
    public class TicketItemResource
    {
        public int TicketItemID { get; set; }
        public int BetID { get; set; }
        public int EventID { get; set; }
        public int TicketID { get; set; }
        public string Name { get; set; }
        public string Mark { get; set; }
        public double Odds { get; set; }
        public int Status { get; set; }
        public DateTime Time { get; set; }
        public string Outcome { get; set; }

        public static TicketItemResource FromEntity(TicketItem entity)
        {
            return new TicketItemResource
            {
                TicketItemID = entity.TicketItemID,
                TicketID = entity.TicketID,
                EventID = entity.Bet.EventID,
                BetID = entity.BetID,
                Name = entity.Bet.Event.Name,
                Mark = entity.Bet.Mark.Trim(),
                Odds = entity.Bet.Odds,
                Status = entity.Status,
                Outcome = entity.Bet.Event.Outcome,
                Time = entity.Bet.Event.Time
            };
        }

        public void ToEntity(TicketItem entity)
        {
            entity.BetID = BetID;
            entity.TicketID = TicketID;
        }
    }
}