import { Column, Entity, PrimaryColumn, OneToMany } from "typeorm";
import Wallet from "./wallet.model";

@Entity()

export class User{
    
    @PrimaryColumn({ type: "int", name: "id"})
    //@ts-ignore
    id: int;

    @Column({ type: "varchar", name: "email", nullable: false})
    //@ts-ignore
    email: string;

    @Column({ type: "varchar", name: "password", nullable: false})
    //@ts-ignore
    password: string;

    @Column({ type: "varchar", name: "name", nullable: true})
    //@ts-ignore
    name: string;

    @Column({ type: "varchar", name: "image", nullable: true})
    //@ts-ignore
    image: string;

}

export default User;