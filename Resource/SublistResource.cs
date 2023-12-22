using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Database;

namespace Resource
{
    public class SublistResource
    {
        public int SublistID { get; set; }
        public int ListID { get; set; }
        public int SportID { get; set; }
        public string SportName { get; set; }
        public string Name { get; set; }
        public List<EventResource> Events { get; set; }

        public static SublistResource FromEntity(Sublist entity)
        {
            return new SublistResource
            {
                SublistID = entity.SublistID,
                ListID = entity.ListID,
                SportID = entity.SportID,
                SportName = entity.Sport.Name,
                Name=entity.Name,
                Events = entity.Event.OrderBy(x=>x.Time).Select(x => EventResource.FromEntity(x)).ToList()
            };
        }
    }
}