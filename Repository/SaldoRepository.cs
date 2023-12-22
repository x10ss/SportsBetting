using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;
using Resource;

namespace Repository
{
    public class SaldoRepository
    {
        public double GetSaldo()
        {
            using (KladionicaEntities db = new KladionicaEntities())
            {
                return db.Saldo.OrderByDescending(x=>x.TimeStamp).FirstOrDefault().Amount;
            }
        }

        public void Deposit(SaldoResource deposit)
        {
            using (KladionicaEntities db = new KladionicaEntities())
            {
                double oldSaldo = db.Saldo.OrderByDescending(x => x.TimeStamp).FirstOrDefault().Amount;
                Saldo s = new Saldo()
                {
                    Amount = oldSaldo + deposit.Difference,
                    Difference = deposit.Difference,
                    TimeStamp = DateTime.Now
                };
                db.Saldo.Add(s);
                db.SaveChanges();
            }
        }
    }
}