import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import Wallet from "./wallet.model";

@Entity()

export class User {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "email", type: "nvarchar", length: 255, nullable: false, unique: true })
    email: string;

    @Column({ name: "password", type: "nvarchar", length: 255, nullable: false })
    password: string;

    @Column({ name: "name", type: "nvarchar", length: 255, nullable: true })
    name: string;

    @Column({ name: "image", type: "nvarchar", length: 500, nullable: true })
    image: string;

    @OneToMany(() => Wallet, wallet => wallet.user, {
        cascade: true
    })
    wallets: Wallet[];

    @Column({name: "refresh_token", type: "nvarchar", length: 255, nullable: true})
    refreshToken: string;

}

export default User;