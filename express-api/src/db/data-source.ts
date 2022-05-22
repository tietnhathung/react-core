import { DataSource } from "typeorm"
import UserEntity from "../entity/user.entity";

const dataSource = new DataSource({
    type: "mysql",
    host: "localhost",
    port: 3306,
    username: "root",
    password: "",
    database: "react-core",
    synchronize: true,
    logging: true,
    entities: [UserEntity],
    subscribers: [],
    migrations: [],
})

dataSource.initialize()
    .then(() => {
        console.log("dataSource initialize")
    })
    .catch((error) => console.log(error))
export default dataSource