using System.Text;
using Core.Platforms.Data.Twitter;
using Infrastructure.Platforms.Twitter;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Tweetinvi;
using Tweetinvi.Models;
using Tweetinvi.Parameters.V2; // Required for V2 parameters
namespace API.Controllers.Platforms
{
    [Route("api/[controller]")]
    [ApiController]
    public class TwitterController : ControllerBase
    {
        [HttpPost]
        public async Task<IActionResult> PostTweet(TwitterDot twitterDot)
        {
            // Initialize TwitterClient with your credentials
            var client = new TwitterClient(
                "4FGhmivaX4W6PNeDF6zdpZtwR",
                "R24sYDahYHCru7RJF1i5oKiatQhY70cK6WrhVGbyt2hIbci5mi",
                "1216926462005006336-Q75W3sfV6JjmgFQuOBrl1xq5QRQKnq",
                "3h20oU8zzVs8HS26N8D9J2eJmDomM3xiOYS9RAP8eYefc"
            );

            // Post a simple Tweet
            var tweet = await client.Tweets.PublishTweetAsync(twitterDot.Text);

            if (tweet == null)
                return BadRequest("Failed to publish tweet.");

            return Ok(new { tweet.Id, tweet.Text });
        }

    }
}
