import { Column, Entity, PrimaryGeneratedColumn, OneToMany } from "typeorm";
import TransCate from "./transcate.model";

@Entity()

export class TransType{
    
    @PrimaryGeneratedColumn({ name: "id", type: "int" })
    //@ts-ignore
    id: number;

    @Column({ name: "name", type: "nvarchar", length: 255, nullable: false, unique: true})
    //@ts-ignore
    name: string;
    
    @OneToMany(() => TransCate, transCate => transCate.transType)
    //@ts-ignore
    transCates: TransCate[]
}

export default TransType;