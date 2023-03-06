using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;

// For more information on enabling Web API for empty projects, visit https://go.microsoft.com/fwlink/?LinkID=397860

namespace StudyBuddyGroupProject.Controllers
{
    [Route("api/[controller]")]
    public class QuestionController : Controller
    {

        StudyDbContext dbContext = new StudyDbContext();

        [HttpGet("getQuestions")]
        public List<Question> getQuestions()
        {
            return dbContext.Questions.ToList();
        }

        [HttpGet("getByCategory")]
        public List<Question> getByCategory(string userCat)
        {
            return dbContext.Questions.Where(q => q.Category == userCat).ToList();
        }

        [HttpGet("getByFavorites")]
        public List<Question> getByFavorites()
        {
            return dbContext.Questions.OrderByDescending(q => q.NumFav).ToList();
        }

        [HttpPut("addQuestion")]
        public Question addQuestion(string _question1, string _answer, string _category, string _author)
        {
            Question userQ = new Question()
            {
                Question1 = _question1,
                Answer = _answer,
                Category = _category,
                Author = _author,
                NumFav = 0
            };

            dbContext.Add(userQ);
            dbContext.SaveChanges();
            return userQ;

        }

        [HttpDelete("deleteQuestion")]
        public Question deleteQuestion(int userDelete, string userName)
        {
            Question result = dbContext.Questions.FirstOrDefault(q => q.Id == userDelete);

            if(result.Author == userName)
            {
                dbContext.Remove(result);
                dbContext.SaveChanges();
            }
            else
            {
                Console.WriteLine("You cannot delete questions you didn't author.");
            }

            return result;

        }

    }
}

