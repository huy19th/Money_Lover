import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Index } from "typeorm";
import TransCate from "./trans.cate.model";

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

}

export default TransSubCate;