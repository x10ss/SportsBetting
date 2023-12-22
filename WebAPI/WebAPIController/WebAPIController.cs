using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Web.Http;
using Repository;
using Resource;
namespace WebAPI.WebAPIController
{
    public class WebAPIController : ApiController
    {
        [HttpGet]
        [Route("list")]
        public ListResource GetList()
        {
            var lRepo = new ListRepository();
            return lRepo.GetList();
        }

        [HttpGet]
        [Route("saldo")]
        public double GetSaldo()
        {
            var sRepo = new SaldoRepository();
            return sRepo.GetSaldo();
        }

        [HttpGet]
        [Route("tickets")]
        public Pager<TicketResource> GetTicketList([FromUri] int pageNumber)
        {
            var tRepo = new TicketRepository();
            return tRepo.GetTicketList(pageNumber);
        }

        [HttpGet]
        [Route("end")]
        public void EndEvents()
        {
            SampleDatabaseGenerator.EndEvents(false);
        }

        [HttpGet]
        [Route("flashend")]
        public void FlashEndEvents()
        {
            SampleDatabaseGenerator.EndEvents(true);
        }

        [HttpGet]
        [Route("generate")]
        public void Generate()
        {
            SampleDatabaseGenerator.Generate();
        }
        [HttpGet]
        [Route("stats")]
        public StatsResource GetStats()
        {
            var tRepo = new TicketRepository();
            return tRepo.GetStats();
        }

        [HttpPost]
        [Route("deposit")]
        public void Deposit(SaldoResource deposit)
        {
            var sRepo = new SaldoRepository();
            sRepo.Deposit(deposit);
        }

        [HttpPost]
        [Route("ticket")]
        public void SubmitTicket(TicketResource resource)
        {
            var tRepo = new TicketRepository();
            tRepo.SubmitTicket(resource);
            
        }
    }
}
