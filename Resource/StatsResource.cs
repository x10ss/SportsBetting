using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Resource
{
    public class StatsResource
    {
        public int TicketsPlayed { get; set; }
        public int TicketsWon { get; set; }
        public int TicketsLost { get; set; }
        public int BetsWon { get; set; }
        public int BetsLost { get; set; }
        public double TotalMoneyWon { get; set; }
        public double TotalMoneyLost { get; set; }
        public int BetsNotPlayed { get; set; }

        public int TicketsNotPlayed { get; set; }
        public double TotalOddsWon { get; set; }
        public double TotalWonTicketOdds { get; set; }

        public double BiggestOddsWon { get; set; }


    }

}