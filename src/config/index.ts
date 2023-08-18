import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  dbURL: process.env.DB_URL,
  Port: process.env.PORT,
  stuPass: process.env.DEFAULT_STUDENT_PASS,
};
