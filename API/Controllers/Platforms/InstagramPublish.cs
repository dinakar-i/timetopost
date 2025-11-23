using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers.Platforms
{
    [ApiController]
    public class InstagramPublish : ControllerBase
    {
        private readonly IInstagramPublishContent _instagramPublishContent;
        public InstagramPublish(IInstagramPublishContent instagramPublishContent)
        {
            _instagramPublishContent = instagramPublishContent;
        }
        [HttpPost("imagecontainer")]
        public async Task<IActionResult> CreateImageContainer(InstagramImageContainer image)
        {
            var result = await _instagramPublishContent.CreateImageContainer(image);
            return Ok(result);
        }
        [HttpPost("publishcontainer")]
        public async Task<IActionResult> PublishMedia(string creationId)
        {
            var result = await _instagramPublishContent.PublishMedia(creationId);
            return Ok(result);


        }
    }
}
