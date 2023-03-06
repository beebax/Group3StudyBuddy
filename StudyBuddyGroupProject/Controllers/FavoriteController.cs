using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyBuddyGroupProject.Controllers
{
    [Route("api/[controller]")]
    public class FavoriteController : Controller
    {
        StudyDbContext dbContext = new StudyDbContext();

        [HttpPut("addFavorite")]
        public Favorite addFavorite(int _userQID, string _userName)
        {
            Favorite result = new Favorite()
            {
                UserId = _userName,
                Qid = _userQID
            };

            Question favorited = dbContext.Questions.FirstOrDefault(q => q.Id == _userQID);
            favorited.NumFav++;
            dbContext.Update(favorited);
            dbContext.Add(result);
            dbContext.SaveChanges();

            return result;
        }

        [HttpDelete("removeFavorite")]
        public Favorite removeFavorite(int _userQID, string _userName)
        {
            List<Favorite> result = dbContext.Favorites.Where(q => q.Qid == _userQID).ToList();
            Favorite finalResult = result.FirstOrDefault(q => q.UserId == _userName);

            Question favorited = dbContext.Questions.FirstOrDefault(q => q.Id == _userQID);
            favorited.NumFav--;
            dbContext.Update(favorited);
            dbContext.Remove(finalResult);
            dbContext.SaveChanges();

            return finalResult;
        }
    }
}

