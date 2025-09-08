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
            // Ensure you have a paid Basic or higher access level.
            // You can verify this in your X Developer Portal.
            var client = new TwitterClient(
                "4FGhmivaX4W6PNeDF6zdpZtwR",
                "R24sYDahYHCru7RJF1i5oKiatQhY70cK6WrhVGbyt2hIbci5mi",
                "1216926462005006336-Q75W3sfV6JjmgFQuOBrl1xq5QRQKnq",
                "3h20oU8zzVs8HS26N8D9J2eJmDomM3xiOYS9RAP8eYefc"
            );

            // Use the TweetsV2 property to explicitly call the API v2 endpoint.
            var tweet = await client.TweetsV2.PublishTweetAsync(new PublishTweetParameters
            {
                Text = twitterDot.Text
            });

            // The 'tweet' object from V2 is different.
            if (tweet == null || tweet.Tweet == null)
                return BadRequest("Failed to publish tweet.");

            return Ok(new { tweet.Tweet.Id, tweet.Tweet.Text });
        }
    }
}
