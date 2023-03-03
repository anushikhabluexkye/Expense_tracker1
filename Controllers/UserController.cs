using server.Models;
using System.Data.SqlClient;
using Microsoft.AspNetCore.Mvc;
using Dapper;
using System.Data;


namespace server.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IConfiguration _config;

        public UserController(IConfiguration config)
        {
            _config = config;
        
        }

        [HttpPost("GetAllUser")]

        public async Task<ActionResult<List<User>>> GetAllUser([FromBody] User objUser)
        {
            SqlConnection cnn;
            cnn = new SqlConnection("Data Source=LAPTOP-4CO8AGP8; Initial Catalog =Expense_tracker; Integrated Security = true;  TrustServerCertificate=True;");
            using (SqlCommand cmd =  new SqlCommand("GetSingleUser", cnn))
            {
                User getUser = new User();
              
                cnn.Open();
                cmd.CommandType = CommandType.StoredProcedure;
                cmd.Parameters.Add("Name", SqlDbType.VarChar, 50).Value = objUser.Name;
                cmd.Parameters.Add("@Email", SqlDbType.VarChar, 50).Value = objUser.Email;
                using(SqlDataReader rdr = cmd.ExecuteReader())
                {
                    while (rdr.Read())
                    {    
                        {
                            getUser.Name = Convert.ToString(rdr["Name"]);
                            getUser.Email = Convert.ToString(rdr["Email"]);
                            
                        }
                        rdr.NextResult();
                    }
                    return Ok(getUser);
                }

            }

        }


        [HttpPost]
        public async Task<ActionResult<List<User>>> Createuser(User entity)
        {
            var connection = new SqlConnection(_config.GetConnectionString("sqlServerConnStr"));
            
            await connection.ExecuteAsync("insert into tbl_login(Name,Email) values (@Name,@Email)", entity);
            return Ok(await SelectallUser(connection));
        }
        private static async Task<IEnumerable<User>> SelectallUser(SqlConnection connection)
        {
            return await connection.QueryAsync<User>("select * from tbl_login");
        }

        // [HttpPut]
        // public async Task<ActionResult<List<User>>> updateUser(User entity)
        // {
        //     var connection = new SqlConnection(_config.GetConnectionString("sqlServerConnStr"));
        //     await connection.ExecuteAsync("update tbl_login set Email=@Email, Password=@Password where id = @id", entity);
        //     return Ok(await SelectallUser(connection));
        // }

        // [Route("UpdateUser")]
        // [HttpPut]
        // public IActionResult UpdateCar([FromQuery] int id, [FromBody] User users)
        // {

        //     if (id == 0)
        //     {
        //         return BadRequest();
        //     }
        //     int rowsAffected;
           

        //     DynamicParameters parameters = new DynamicParameters();

        //     parameters.Add("@Id", id);
        //     parameters.Add("@Email", users.Email);
        //     parameters.Add("@Password",users.Name);
           
        //     rowsAffected = new SqlConnection("Data Source=LAPTOP-4CO8AGP8; Initial Catalog =Expense_tracker; Integrated Security = true;  TrustServerCertificate=True;").Execute("UpdateById", parameters, commandType: CommandType.StoredProcedure);

        //     if (rowsAffected != 0)
        //         return Ok();
        //     else
        //         return BadRequest();
        // }

    }
}
