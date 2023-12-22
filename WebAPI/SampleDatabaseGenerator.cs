using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;

namespace WebAPI
{
    public static class SampleDatabaseGenerator
    {
        public static string[] SnookerOpponents = { "Davis", "Davidson", "Thompson", "Peterson", "Pierce", "Burr", "Green", "Johnson", "James", "Bingham", "Murphy", "Ebdon", "Selby", "Wilson", "Trump", "Williams", "Dott", "Day", "Robertson", "O'Sullivan", "Junhui", "Murphy", "Stevens", "Higgins" };
        public static string[] TennisOpponents = { "Thiem", "Pella", "Lajovic", "Edmund", "Goffin", "Wawrinka", "Monfils", "Cuevas", "Johnson", "Opelka", "Klizan", "Kudla", "Gulbis", "Sousa", "Mayer", "Karlović", "Čorić", "Ćilić", "Federer", "Nadal", "Verdasco", "Tsonga", "Dodig", "Gasquet", "Đoković", "Isner", "Raonic", "Simon", "Chardy", "Querrey", "Hasse", "nishikori", "Seppi", "Zverev" };
        public static string[] FootballOpponents = { "Braga", "Boavista", "Porto", "Benfica", "Bayern", "Bayer", "Borussia", "PSV Eindhoven", "Wisla Krakow", "Leh Poznan", "Zenit St.P.", "CSKA Moscow", "Steaua B.", "GENK", "Gent", "Anderlecht", "Club Brugge", "Juventus", "AZ Alkmaar", "Feyenord", "Ajax", "Genoa", "Napoli", "Sampdoria", "Eintracht F.", "Arsenal", "Chelsea", "Portsmouth", "Nothingham F.", "Monaco", "Lens", "PSG", "Lyon", "Rayo V.", "Real M.", "Betis" };
        public static string[] BasketballOpponents = { "Denmark", "Paraguay", "Uruguay", "Bolivia", "Afganistan", "Iran", "Portugal", "South Africa", "Georgia", "Uzbekistan", "Palestina", "Croatia", "Argentina", "China", "Spain", "Italy", "Tunis", "Turkey", "Germany", "Australia", "Russia", "Panama", "Cuba" };
        public static string[] HockeyOpponents = { "Denmark", "Paraguay", "Uruguay", "Bolivia", "Afganistan", "Iran", "Portugal", "South Africa", "Georgia", "Uzbekistan", "Palestina", "Poland", "Romania", "Hungary", "England", "Scotland", "USA", "Mongolia", "Estonia", "Nicaragua", "Canada", "Nigeria", "Israel" };
        public static string[] VolleyballOpponents = { "Denmark", "Paraguay", "Uruguay", "Bolivia", "Afganistan", "Iran", "Portugal", "South Africa", "Georgia", "Uzbekistan", "Palestina", "Poland", "Romania", "Hungary", "England", "Scotland", "USA", "Mongolia", "Estonia", "Nicaragua", "Canada", "Nigeria", "Israel" };

        public static string[] TennisSublistNames = { "ATP - US Open", "ATP - Rolland Garros", "ATP - Australia Open", "ATP - Masters", "ATP - Wimbeldon", "ATP - Hamburg", "ATP - Moscow", "ATP - Umag", "ATP - Monaco", "ATP - Paris", "ATP - Doha" };
        public static string[] FootballSublistNames = { "UEFA - Euro Leauge", "UEFA - Champions Leauge", "Marjan Cup Split", "Dubai Michelin Cup", "Tokyo Samsung Cup" };
        public static string[] SnookerSublistNames = { "English Open", "Scotish Open", "Shanghai Masters", "World Cup" };
        public static string[] BasketballSublistNames = { "World Cup", "Euro Cup", "Euro Cup Qualifiers", "World Cup U-17", "Euro Cup U-21" };
        public static string[] HockeySublistNames = { "World Cup", "Euro Cup", "Euro Cup Qualifiers", "World Cup U-17", "Euro Cup U-21" };
        public static string[] VolleyballSublistNames = { "World Cup", "Euro Cup", "Euro Cup Qualifiers", "World Cup U-17", "Euro Cup U-21" };
        public static void Generate()
        {
            List<Event> events = new List<Event>();
            Dictionary<string, List<string>> sublists = new Dictionary<string, List<string>>();
            sublists.Add("TennisSublistNames", TennisSublistNames.ToList());
            sublists.Add("FootballSublistNames", FootballSublistNames.ToList());
            sublists.Add("BasketballSublistNames", BasketballSublistNames.ToList());
            sublists.Add("HockeySublistNames", HockeySublistNames.ToList());
            sublists.Add("SnookerSublistNames", SnookerSublistNames.ToList());
            sublists.Add("VolleyballSublistNames", VolleyballSublistNames.ToList());

            Dictionary<string, List<string>> opponents = new Dictionary<string, List<string>>();
            opponents.Add("TennisOpponents", TennisOpponents.ToList());
            opponents.Add("BasketballOpponents", BasketballOpponents.ToList());
            opponents.Add("HockeyOpponents", HockeyOpponents.ToList());
            opponents.Add("FootballOpponents", FootballOpponents.ToList());
            opponents.Add("SnookerOpponents", SnookerOpponents.ToList());
            opponents.Add("VolleyballOpponents", VolleyballOpponents.ToList());

            Random rnd = new Random();

            using (KladionicaEntities db = new KladionicaEntities())
            {
                if (db.Saldo.Count() == 0)
                {
                    Saldo saldo = new Saldo()
                    {
                        Amount = 10,
                        Difference = 0,
                        TimeStamp = DateTime.Now
                    };
                    db.Saldo.Add(saldo);
                }

                if (db.Sport.Count() == 0)
                {
                    Sport special = new Sport()
                    {
                        SportID = 0,
                        Name = "Special"
                    };
                    db.Sport.Add(special);
                    Sport football = new Sport()
                    {
                        SportID = 1,
                        Name = "Football"
                    };
                    db.Sport.Add(football);

                    Sport hockey = new Sport()
                    {
                        SportID = 2,
                        Name = "Hockey"
                    };
                    db.Sport.Add(hockey);
                    Sport basketball = new Sport()
                    {
                        SportID = 3,
                        Name = "Basketball"
                    };
                    db.Sport.Add(basketball);
                    Sport snooker = new Sport()
                    {
                        SportID = 4,
                        Name = "Snooker"
                    };
                    db.Sport.Add(snooker);
                    Sport tennis = new Sport()
                    {
                        SportID = 5,
                        Name = "Tennis"
                    };
                    db.Sport.Add(tennis);
                    Sport volleyball = new Sport()
                    {
                        SportID = 6,
                        Name = "Volleyball"
                    };
                    db.Sport.Add(volleyball);

                }

                List list = new List();
                list.Date = DateTime.Now;
                list.Time = DateTime.Now.Date.AddHours(6);
                db.List.Add(list);
                db.SaveChanges();

                var sports = db.Sport.ToList();
                foreach (var sport in sports)
                {

                    var sublistCount = rnd.Next(1, 3);
                    for (int i = 0; i < sublistCount; i++)
                    {
                        if (sport.SportID != 0)
                        {
                            Sublist sublist = new Sublist();
                            sublist.SportID = sport.SportID;
                            sublist.ListID = list.ListID;

                            int rndSublistNameIndex = rnd.Next(0, sublists[sport.Name + "SublistNames"].Count);
                            sublist.Name = sublists[sport.Name + "SublistNames"][rndSublistNameIndex];
                            sublists[sport.Name + "SublistNames"].RemoveAt(rndSublistNameIndex);

                            db.Sublist.Add(sublist);
                            db.SaveChanges();

                            int oppLen = opponents[sport.Name + "Opponents"].Count;
                            for (int j = 0; j < rnd.Next(1, oppLen); j++)
                            {
                                oppLen = opponents[sport.Name + "Opponents"].Count;

                                Event ev = new Event();
                                ev.SublistID = sublist.SublistID;

                                int opp1 = rnd.Next(0, oppLen);
                                string opp1Name = opponents[sport.Name + "Opponents"].ElementAt(opp1);
                                opponents[sport.Name + "Opponents"].RemoveAt(opp1);
                                oppLen = oppLen - 1;

                                int opp2 = rnd.Next(0, oppLen);
                                string opp2Name = opponents[sport.Name + "Opponents"].ElementAt(opp2);
                                opponents[sport.Name + "Opponents"].RemoveAt(opp2);

                                ev.Name = opp1Name + " - " + opp2Name;
                                DateTime dt = DateTime.Now.Date;
                                dt = dt.AddHours(rnd.Next(10, 23)).AddMinutes(rnd.Next(0, 2) * 30);
                                ev.Time = dt;

                                events.Add(ev);
                                db.Event.Add(ev);
                                db.SaveChanges();

                                if (sport.SportID > 3)
                                {
                                    Bet bet1 = new Bet();
                                    bet1.EventID = ev.EventID;
                                    bet1.Mark = "1";
                                    int perc1 = rnd.Next(1, 100);
                                    bet1.Odds = (double)100 / perc1;

                                    Bet bet2 = new Bet();
                                    bet2.EventID = ev.EventID;
                                    bet2.Mark = "2";
                                    int perc2 = 100 - perc1;
                                    bet2.Odds = (double)100 / perc2;

                                    db.Bet.Add(bet1);
                                    db.Bet.Add(bet2);
                                }
                                else
                                {
                                    Bet betx = new Bet();
                                    betx.EventID = ev.EventID;
                                    betx.Mark = "x";
                                    int percx = rnd.Next(15 / sublist.SportID, 40 / sublist.SportID);
                                    betx.Odds = (double)100 / percx;

                                    Bet bet1 = new Bet();
                                    bet1.EventID = ev.EventID;
                                    bet1.Mark = "1";
                                    int perc1 = rnd.Next(15, 100 - percx);
                                    bet1.Odds = (double)100 / perc1;

                                    Bet bet2 = new Bet();
                                    bet2.EventID = ev.EventID;
                                    bet2.Mark = "2";
                                    int perc2 = 100 - perc1 - percx;
                                    bet2.Odds = (double)100 / perc2;

                                    Bet bet1x = new Bet();
                                    bet1x.EventID = ev.EventID;
                                    bet1x.Mark = "1x";
                                    int perc1x = percx + perc1;
                                    bet1x.Odds = (double)100 / perc1x;

                                    Bet betx2 = new Bet();
                                    betx2.EventID = ev.EventID;
                                    betx2.Mark = "x2";
                                    int percx2 = percx + perc2;
                                    betx2.Odds = (double)100 / percx2;

                                    Bet bet12 = new Bet();
                                    bet12.EventID = ev.EventID;
                                    bet12.Mark = "12";
                                    int perc12 = perc1 + perc2;
                                    bet12.Odds = (double)100 / perc12;

                                    db.Bet.Add(bet1);
                                    db.Bet.Add(betx);
                                    db.Bet.Add(bet2);

                                    db.Bet.Add(bet1x);
                                    db.Bet.Add(betx2);
                                    db.Bet.Add(bet12);
                                }
                            }
                        }
                    }
                }

                db.SaveChanges();

                var specialSublist = new Sublist();
                specialSublist.ListID = list.ListID;
                specialSublist.Name = "Special offer";
                specialSublist.SportID = 0;
                db.Sublist.Add(specialSublist);
                db.SaveChanges();

                for (int i = 0; i < 5; i++)
                {
                    var events2 = events.Where(x => x.Sublist.SportID == i + 1).ToList();
                    int specialEventIndex = rnd.Next(0, events2.Count);
                    var originalEvent = events2[specialEventIndex];

                    Event specialEvent = new Event();
                    specialEvent.SublistID = specialSublist.SublistID;
                    specialEvent.Name = originalEvent.Name;
                    specialEvent.Time = originalEvent.Time;
                    specialEvent.OriginalEventID = originalEvent.EventID;

                    db.Event.Add(specialEvent);
                    db.SaveChanges();

                    foreach (var bet in events2[specialEventIndex].Bet)
                    {
                        var specialBet = new Bet();
                        specialBet.EventID = specialEvent.EventID;

                        specialBet.Mark = bet.Mark;
                        specialBet.Odds = bet.Odds * 1.1;
                        db.Bet.Add(specialBet);
                    }

                }
                db.SaveChanges();

            }
        }

        public static void EndEvents(bool flash)
        {
            using (KladionicaEntities db = new KladionicaEntities())
            {
                var list = db.List.OrderByDescending(x => x.Date).FirstOrDefault();
                DateTime listTime = list.Time;

                Random rnd = new Random();
                List<Event> events = new List<Event>();

                foreach (var sublist in list.Sublist)
                {
                    events.AddRange(sublist.Event.Where(x => x.Outcome == null));
                }
                DateTime timeNext;
                if (events.Count == 0)
                {
                    timeNext = listTime.Date.AddHours(24);
                }
                else
                {
                    timeNext = events.Min(y => y.Time);
                }

                if (!flash)
                {
                    events = events.Where(x => x.Time == timeNext).ToList();
                }
                else
                {
                    timeNext = listTime.Date.AddHours(24);
                }
                list.Time = timeNext;

                foreach (var ev in events)
                {
                    if (ev.Sublist.SportID > 0)
                    {

                        var bets = ev.Bet.ToList();

                        string selectedBet = "0";
                        double diceRoll = rnd.NextDouble();

                        double cumulative = 0.0;
                        for (int i = 0; i < bets.Count; i++)
                        {
                            cumulative += 1 / bets[i].Odds;

                            if (diceRoll < cumulative)
                            {
                                selectedBet = bets[i].Mark;
                                break;
                            }
                        }
                        ev.Outcome = selectedBet;
                    }
                    else
                    {
                        ev.Outcome = ev.Event2.Outcome;
                    }

                }
                db.SaveChanges();

                var tickets = db.Ticket.Where(x => x.TicketItem.FirstOrDefault().Bet.Event.Sublist.List.ListID == list.ListID);
                foreach (var ticket in tickets)
                {
                    List<TicketItem> ticketItems = new List<TicketItem>();
                    ticketItems = flash == true ? ticket.TicketItem.ToList() : ticket.TicketItem.Where(x => x.Bet.Event.Time == timeNext).ToList();

                    foreach (var ticketItem in ticketItems)
                    {
                        ticketItem.Status = ticketItem.Bet.Mark.Trim().Contains(ticketItem.Bet.Event.Outcome.Trim()) ? 1 : 2;
                    }
                    if (ticket.Status == 0)
                    {
                        ticket.Status = ticket.TicketItem.All(x => x.Status == 1) ? 1 : ticket.TicketItem.Any(x => x.Status == 2) ? 2 : 0;
                        if (ticket.Status == 1)
                        {
                            double oldSaldo = db.Saldo.OrderByDescending(x => x.TimeStamp).FirstOrDefault().Amount;
                            Saldo saldo = new Saldo()
                            {
                                Amount = oldSaldo + ticket.Gain,
                                Difference = ticket.Gain,
                                TimeStamp = DateTime.Now
                            };
                            db.Saldo.Add(saldo);
                        }
                    }
                }
                db.SaveChanges();
            }
        }
    }
}
