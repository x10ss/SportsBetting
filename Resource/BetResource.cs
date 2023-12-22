using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;

namespace Resource
{
    public class BetResource
    {
        public int BetID { get; set; }
        public string Mark { get; set; }
        public double Odds { get; set; }
        public int EventID { get; set; }

        public int? OriginalEventID { get; set; }

        public static BetResource FromEntity(Bet entity)
        {
            return new BetResource
            {
                BetID = entity.BetID,

                Mark = entity.Mark.Trim(),

                Odds = entity.Odds,

                EventID = entity.EventID,

                OriginalEventID = entity.Event.OriginalEventID
            };
        }
    }
}