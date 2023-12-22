using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;

namespace Resource
{
    public class ListResource
    {
        public int ListID { get; set; }
        public DateTime Date { get; set; }
        public DateTime Time { get; set; }

        public List<List<SublistResource>> Sublists { get; set; }

        public static ListResource FromEntity(List entity)
        {
            
            return new ListResource {
                ListID = entity.ListID,
                Date = entity.Date,
                Time = entity.Time,
                Sublists = entity.Sublist.OrderBy(x=>x.SportID).ThenBy(x=>x.SublistID).Select(x=> SublistResource.FromEntity(x)).ToList().GroupBy(x=>x.SportID).Select(x=>x.ToList()).ToList()
            };
        }
        
    }
}