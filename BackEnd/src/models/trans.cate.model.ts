import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Index } from "typeorm";
import TransType from "./trans.type.model";
import Transaction from "./transaction.model";
import TransSubCate from "./trans.subcate";

@Entity()

@Index(["name", "transType"], { unique: true })

export class TransCate {

    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    //@ts-ignore
    id: number;

    @Column({ name: "name", type: "nvarchar", length: 255, nullable: false })
    //@ts-ignore
    name: string;

    @ManyToOne(() => TransType, transType => transType.transCates)
    @JoinColumn({ name: "type_id" })
    //@ts-ignore
    transType: TransType;

    @OneToMany(() => Transaction, transaction => transaction.category)
    //@ts-ignore
    transactions: Transaction[];

    @OneToMany(() => TransSubCate, transSubCate => transSubCate.category)
    //@ts-ignore
    subCategories: TransSubCate[];

}

export default TransCate;