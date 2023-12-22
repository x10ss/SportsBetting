using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;

namespace Resource
{
    public class SaldoResource
    {
        public double Amount { get; set; }
        public int SaldoID { get; set; }
        public DateTime TimeStamp { get; set; }
        public double Difference { get; set; }

        public void ToEntity(Saldo entity)
        {
            entity.Amount = Amount;
            entity.TimeStamp = TimeStamp;
            entity.Difference = Difference;
        }
    }
}