import {BaseEntity, Column, Entity, PrimaryGeneratedColumn} from "typeorm";

@Entity("user")
class User extends BaseEntity{

    @PrimaryGeneratedColumn({
        name: "id",
        type:"int"
    })
    id: number;

    @Column({
        nullable: false,
        name: "fullName"
    })
    fullName: string

    @Column({
        nullable: false,
        name: "username"
    })
    username: string

    @Column({
        nullable: false,
        name: "password"
    })
    password: string

    @Column({
        nullable: false,
        name: "status",
        type:"tinyint"
    })
    status: boolean

    @Column({
        name: "accessTokenApp"
    })
    accessTokenApp: string

    @Column({
        name: "createdAt",
        type:"datetime",
        default: () => 'NOW()',
    })
    createdAt: Date

    @Column({
        name: "createdBy"
    })
    createdBy: number

}

export default User;
