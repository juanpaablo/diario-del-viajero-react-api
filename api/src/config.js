import { config } from "dotenv";
config()
export default{
host:process.env.HOST ||"" ,
database:process.env.DATABASE ||"" ,
user:process.env.USER ||"",
password:process.env.PASSWORD ||""
}
//con esto usare las credenciales sin necesidad de compartir las que tengo en .env que son personales