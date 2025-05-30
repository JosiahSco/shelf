namespace Shelf.Api.Controllers
{
    using Microsoft.AspNetCore.Mvc;
    using Microsoft.EntityFrameworkCore;
    using Shelf.Api.Data;
    using Shelf.Api.Models;

    [ApiController]
    [Route("api/[controller]")]
    public class MovieController : ControllerBase
    {
        private readonly IConfiguration _configuration;
        private readonly IHttpClientFactory _httpClientFactory;
        private readonly String _apiKey;
        private readonly String _baseUrl;

        public MovieController(IConfiguration configuration, IHttpClientFactory httpClientFactory)
        {
            _configuration = configuration;
            _httpClientFactory = httpClientFactory;
            _apiKey = _configuration["Omdb:ApiKey"] ?? throw new ArgumentNullException("Omdb:ApiKey");
            _baseUrl = _configuration["Omdb:BaseUrl"] ?? throw new ArgumentNullException("Omdb:BaseUrl");
        }

        [HttpGet("search")]
        public async Task<IActionResult> SearchMovies([FromQuery] string query)
        {
            if (string.IsNullOrEmpty(query))
            {
                return BadRequest("Query parameter is required.");
            }
            var client = _httpClientFactory.CreateClient();
            var response = await client.GetAsync($"{_baseUrl}?s={query}&apikey={_apiKey}&type=movie");
            if (response.IsSuccessStatusCode)
            {
                var content = await response.Content.ReadAsStringAsync();
                Console.WriteLine($"Response from OMDb API: {content}");
                // add handling for no movie found or too many results
                return Ok(content);
            }
            else
            {
                return StatusCode((int)response.StatusCode, "Error fetching data from the movie API.");
            }
        }
    }
}