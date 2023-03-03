
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using server.Models;
using System.Data;

namespace server.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class CategoryController : ControllerBase
    {
        public static IConfiguration _config;
        static SqlConnection  connection = new SqlConnection(_config.GetConnectionString("sqlServerConnStr").ToString());
        procedure_enum prcCategory = new procedure_enum();
        public CategoryController(IConfiguration config)
        {
            _config = config;

        }
        public static async Task<IEnumerable<Category>> GetAllProduct()
        {
            return await connection.QueryAsync<Category>("select * from category");
        }
        [HttpPost("GetCategory")]
        public async Task<ActionResult<List<Category>>> Addproduct(Category categoty)
        {
            // var connection = new SqlConnection(_config.GetConnectionString("sqlServerConnStr"));
            // await connection.ExecuteAsync("insert into category(Product_Name) values (@Product_Name)", entity);
            // return Ok(await GetAllProduct(connection));

            //var connection = new SqlConnection(_config.GetConnectionString("sqlServerConnStr"));
           //using (SqlCommand cmd =  new SqlCommand("insertCategory", connection))
            using (SqlCommand cmd = new SqlCommand(prcCategory.insertCategory))
            {

                connection.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("@Product_Name", SqlDbType.VarChar, 500).Value = categoty.Product_Name;
                int category = cmd.ExecuteNonQuery();
                // if(category ==- -1)
                // {
                    
                // }
                connection.Close();
                return Ok(category);
            }
        }
       
    }



}
