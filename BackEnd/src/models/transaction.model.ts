import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import Wallet from "./wallet.model";
import TransCate from "./trans.cate.model";

@Entity()

export class Transaction{
    
    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    //@ts-ignore
    id: int;

    @ManyToOne(() => Wallet, wallet => wallet.transactions, {
        onDelete: "CASCADE"
    })
    @JoinColumn({name: "wallet_id"})
    //@ts-ignore
    wallet: Wallet;

    @ManyToOne(() => TransCate, transCate => transCate.transactions)
    @JoinColumn({name: "category_id"})
    //@ts-ignore
    category: TransCate;

    @Column({ name: "money", type: "int", nullable: false })
    //@ts-ignore
    money: number;

    @Column({ name: "date", type: "date", nullable: false })
    //@ts-ignore
    date: Date;

    @Column({ name: "note", type: "nvarchar", length: 255, nullable: true })
    //@ts-ignore
    note: string;

    @Column({ name: "image", type: "nvarchar", length: 500, nullable: true })
    //@ts-ignore
    image: string;

}

export default Transaction;