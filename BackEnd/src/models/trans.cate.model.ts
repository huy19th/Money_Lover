import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Index } from "typeorm";
import TransType from "./trans.type.model";
import Transaction from "./transaction.model";
import TransSubCate from "./trans.subcate";

@Entity()

@Index(["name", "transType"], { unique: true })

export class TransCate {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    id: number;

    @Column({ name: "name", type: "nvarchar", length: 255, nullable: false })
    name: string;

    @ManyToOne(() => TransType, transType => transType.transCates)
    @JoinColumn({ name: "type_id" })
    transType: TransType;

    @OneToMany(() => Transaction, transaction => transaction.category)
    transactions: Transaction[];

    @OneToMany(() => TransSubCate, transSubCate => transSubCate.category)
    subCategories: TransSubCate[];

}

export default TransCate;