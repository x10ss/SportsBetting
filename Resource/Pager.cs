using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Resource
{
    public class Pager<T>
    {
        public int ItemsCount { get; set; }
        public List<T> PagedItems { get; set; }

        public Pager()
        {
            PagedItems = new List<T>();
        }
    }
}