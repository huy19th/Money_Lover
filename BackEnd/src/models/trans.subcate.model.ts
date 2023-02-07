import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Index, OneToMany } from "typeorm";
import TransCate from "./trans.cate.model";
import Transaction from "./transaction.model";

@Entity()

@Index(["category", "name"], { unique: true })

export class TransSubCate {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @ManyToOne(() => TransCate, transCate => transCate.subCategories)
    @JoinColumn({name: "cate_id"})
    category: TransCate

    @Column({ name: "name", type: "nvarchar", length: 255, nullable: false })
    name: string;

    @OneToMany(() => Transaction, transaction => transaction.subCategory)
    transactions: Transaction[];
}

export default TransSubCate;