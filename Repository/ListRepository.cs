using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using Resource;
using Database;
namespace Repository
{
    public class ListRepository
    {
        public ListResource GetList()
        {
            using (KladionicaEntities db = new KladionicaEntities())
            {
                var list = db.List.OrderByDescending(x=>x.Date).FirstOrDefault();
                return ListResource.FromEntity(list);
            }
        }
    }
}