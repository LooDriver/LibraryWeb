using LibraryWeb.IntegrationsTests.SetupEnviroment;
using LibraryWeb.Sql.Models;
using Newtonsoft.Json;
using System.Net;

namespace LibraryWeb.IntegrationsTests
{
    public class BooksIntegrationsTests : IClassFixture<BaseTestServerFixture>
    {
        // �������� ������� ������ BaseTestServerFixture ������� �������� �� ��������� ��������� ������� � ���� ������
        private readonly BaseTestServerFixture _fixture;

        public BooksIntegrationsTests(BaseTestServerFixture fixture)
        {
            // ������������� ������� ����� ������������ ������ BooksIntegrationsTests
            _fixture = fixture;
        }

        [Fact]
        public async Task Get_AllBooks_Json_Async()
        {
            // �������� ���������� response � ������� ���������� �������� �� ����������� BooksController
            var response = await _fixture.Client.GetAsync("/api/books/allBooks");

            // �������� ���������� responseBody �������� ������� �� �������� �� ���������� response
            var responseBody = await response.Content.ReadAsStringAsync();

            // �������� ���������� models �������� ������� �� �������� ����� �������������� �������� �� ���������� responseBody
            var models = JsonConvert.DeserializeObject<IEnumerable<�����>>(responseBody);

            // ��������� ��� ��������� ��� ������� ���������� � ���������� response ����� 200 (��) 
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            // ��������� ��� ���������� models �� ������
            Assert.NotEmpty(models);
        }

        [Theory]
        [InlineData("����� 1")]
        public async Task Get_CurrentBook_Json_Async(string bookName)
        {
            // �������� ���������� response � ������� ���������� �������� �� ����������� BooksController
            var response = await _fixture.Client.GetAsync($"/api/books?name={bookName}");

            // �������� ���������� responseBody �������� ������� �� �������� �� ���������� response
            var responseBody = await response.Content.ReadAsStringAsync();

            // �������� ���������� model �������� ������� �� �������� ����� �������������� �������� �� ���������� responseBody
            var model = JsonConvert.DeserializeObject<�����>(responseBody);

            // ��������� ��� ��������� ��� ������� ���������� � ���������� response ����� 200 (��)
            Assert.Equal(HttpStatusCode.OK, response.StatusCode);
            // ��������� ��� ���������� model �� �������� �������� NULL
            Assert.NotNull(model);
            // ��������� ��� �������� ������� �� �������� �� ��������� ����� �������� ������� ��������� � ���������� model
            Assert.Contains(bookName, model.��������);
        }
    }
}