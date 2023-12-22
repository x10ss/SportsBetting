using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;

namespace Resource
{
    public class EventResource
    {
        public int EventID { get; set; }
        public int SublistID { get; set; }
        public string Name { get; set; }
        public string Outcome { get; set; }
        public DateTime Time { get; set; }
        public List<BetResource> Bets { get; set; }


        public static EventResource FromEntity(Event entity)
        {
            return new EventResource
            {
                EventID = entity.EventID,
                SublistID = entity.SublistID,
                Name = entity.Name,
                Outcome = entity.Outcome!=null?entity.Outcome.Trim():null,
                Time = entity.Time,
                Bets = entity.Bet.Select(x => BetResource.FromEntity(x)).ToList()
            };
        }


    }
}