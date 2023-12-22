using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;

namespace Resource
{
    public class TicketResource
    {
        public int TicketID { get; set; }
        public DateTime Date { get; set; }
        public double Wager { get; set; }
        public int Status { get; set; }
        public double TotalOdds { get; set; }
        public double Gain { get; set; }
        public List<TicketItemResource> TicketItems { get; set; }
        public static TicketResource FromEntity(Ticket entity)
        {
            return new TicketResource
            {
                TicketID = entity.TicketID,
                Date = entity.Date,
                Wager = entity.Wager,
                Status = entity.Status,
                TotalOdds = entity.TotalOdds,
                Gain = entity.Gain,

                TicketItems = entity.TicketItem.Select(x=>TicketItemResource.FromEntity(x)).OrderBy(x=>x.Time).ToList()
            };
        }

        public void ToEntity(Ticket entity)
        {
            entity.Date = Date;
            entity.Wager = Wager;
            entity.Status = Status;
            entity.TotalOdds = TotalOdds;
            entity.Gain = Gain;
        }
    }
 


}