import { Column, Entity, PrimaryGeneratedColumn, ManyToOne, OneToMany, JoinColumn, Index } from "typeorm";
import TransType from "./trans.type.model";
import TransSubCate from "./trans.subcate.model";
import User from "./user.model";

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

    @OneToMany(() => TransSubCate, transSubCate => transSubCate.category)
    subCategories: TransSubCate[];

    @ManyToOne(() => User, user => user.transCates)
    @JoinColumn({name: "user_id"})
        //@ts-ignore
    user: User

}

export default TransCate;