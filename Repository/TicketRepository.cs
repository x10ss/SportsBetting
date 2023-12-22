using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Resource;
using Database;

namespace Repository
{
    public class TicketRepository
    {
        public void SubmitTicket(TicketResource resource)
        {
            using (KladionicaEntities db = new KladionicaEntities())
            {
                double oldSaldo = db.Saldo.OrderByDescending(x => x.TimeStamp).FirstOrDefault().Amount;
                Saldo saldo = new Saldo()
                {
                    Amount = oldSaldo - resource.Wager,
                    Difference = -resource.Wager,
                    TimeStamp = DateTime.Now
                };

                Ticket ticket = new Ticket();
                resource.ToEntity(ticket);
                ticket.Date = DateTime.Now;
                ticket.Status = 0;
                db.Ticket.Add(ticket);
                db.SaveChanges();

                List<TicketItem> tItemEntityList = new List<TicketItem>();
                foreach (var item in resource.TicketItems)
                {
                    item.TicketID = ticket.TicketID;
                    TicketItem itemEntity = new TicketItem();
                    item.ToEntity(itemEntity);

                    db.TicketItem.Add(itemEntity);

                    db.SaveChanges();
                }

                double totalOdds = 1;

                resource.TicketItems.ForEach(x => totalOdds *= Math.Round(x.Odds, 2));
                totalOdds = Math.Round(totalOdds, 2);
                if (totalOdds != resource.TotalOdds)
                {
                    ticket.Status = 99;
                    db.SaveChanges();
                    throw new Exception();
                }
                if (0.95 * totalOdds * resource.Wager != resource.Gain)
                {
                    ticket.Status = 99;
                    db.SaveChanges();
                    throw new Exception();
                }

                tItemEntityList = db.TicketItem.Include("Bet").Where(x => x.TicketID == ticket.TicketID).ToList();
                foreach (var item in tItemEntityList)
                {
                    if (tItemEntityList.Any(x => x.Bet.EventID == item.Bet.Event.OriginalEventID || x.Bet.Event.OriginalEventID == item.Bet.EventID))
                    {
                        ticket.Status = 99;
                        db.SaveChanges();
                        throw new Exception();
                    }
                    if (tItemEntityList.Where(x => x.Bet.Event.OriginalEventID != null).Count() > 1)
                    {
                        ticket.Status = 99;
                        db.SaveChanges();
                        throw new Exception();
                    }
                    if (item.Bet.Event.OriginalEventID != null && tItemEntityList.Where(x => x.Bet.Odds >= 1.1 && x.Bet.Event.OriginalEventID == null).Count() < 5)
                    {
                        ticket.Status = 99;
                        db.SaveChanges();
                        throw new Exception();
                    }
                }
                if (saldo.Amount < 0)
                {
                    ticket.Status = 99;
                    db.SaveChanges();
                    throw new Exception();
                }
                else
                {
                    db.Saldo.Add(saldo);

                    db.SaveChanges();
                }

            }
        }

        public Pager<TicketResource> GetTicketList(int pageNumber)
        {
            using (KladionicaEntities db = new KladionicaEntities())
            {
                var tickets = db.Ticket.Where(x => x.Status != 99).OrderByDescending(x => x.Date).ToList();
                var pagedTickets = tickets.Skip((pageNumber - 1) * 10).Take(10).Select(x => TicketResource.FromEntity(x)).ToList();
                Pager<TicketResource> pager = new Pager<TicketResource>();
                pager.PagedItems = pagedTickets;
                pager.ItemsCount = tickets.Count();
                return pager;
            }
        }

        public StatsResource GetStats()
        {
            using (KladionicaEntities db = new KladionicaEntities())
            {
                var tickets = db.Ticket.ToList();

                List<TicketItem> ticketItems = new List<TicketItem>();

                double totalmoneywon = 0;
                double totalmoneylost = 0;

                tickets.ToList().ForEach(x => totalmoneylost += x.Wager);
                tickets.Where(x => x.Status == 1).ToList().ForEach(x => totalmoneywon += x.Gain);

                int betsNotPlayed = 0;
                int betsWon = 0;
                int betsLost = 0;
                tickets.ToList().ForEach(x => ticketItems.AddRange(x.TicketItem.ToList()));
                ticketItems.Where(x => x.Status == 0).ToList().ForEach(y => betsNotPlayed += 1);
                var WonBets = ticketItems.Where(x => x.Status == 1).ToList();
                WonBets.ForEach(y => betsWon += 1);

                ticketItems.Where(x => x.Status == 2).ToList().ForEach(y => betsLost += 1);

                double totalOddsWon = 1;
                WonBets.ForEach(x => totalOddsWon *= x.Bet.Odds);

                double totalWonTicketOdds = 1;
                WonBets.Where(x => x.Ticket.Status == 1).ToList().ForEach(x => totalWonTicketOdds *= x.Bet.Odds);

                var stats = new StatsResource()
                {
                    TicketsPlayed = tickets.Count(),
                    TicketsWon = tickets.Where(x => x.Status == 1).Count(),
                    TicketsLost = tickets.Where(x => x.Status == 2).Count(),
                    TotalMoneyWon = totalmoneywon,
                    TotalMoneyLost = totalmoneylost,
                    TicketsNotPlayed = tickets.Where(x => x.Status == 0).Count(),
                    BetsNotPlayed = betsNotPlayed,
                    BetsLost = betsLost,
                    BetsWon = betsWon,
                    TotalOddsWon = totalOddsWon,
                    TotalWonTicketOdds = totalWonTicketOdds,
                    BiggestOddsWon = WonBets.Count == 0 ? 1 : WonBets.Max(x => x.Bet.Odds)
                };
                return stats;
            }
        }
    }
}