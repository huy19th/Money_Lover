import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Wallet from "./wallet.model";

@Entity()

export class User {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    //@ts-ignore
    id: number;

    @Column({ name: "email", type: "nvarchar", length: 255, nullable: false, unique: true })
    //@ts-ignore
    email: string;

    @Column({ name: "password", type: "nvarchar", length: 255, nullable: false })
    //@ts-ignore
    password: string;

    @Column({ name: "name", type: "nvarchar", length: 255, nullable: true })
    //@ts-ignore
    name: string;

    @Column({ name: "image", type: "nvarchar", length: 500, nullable: true })
    //@ts-ignore
    image: string;

    @OneToMany(() => Wallet, wallet => wallet.user, {
        cascade: true
    })
    //@ts-ignore
    wallets: Wallet[];

    @Column({name: "refresh_token", type: "nvarchar", length: 255, nullable: true})
    //@ts-ignore
    refreshToken: string;

}

export default User;