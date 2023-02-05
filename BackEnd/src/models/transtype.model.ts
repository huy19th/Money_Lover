import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()

export class TransType{
    
    @PrimaryColumn({ type: "int", name: "id"})
    //@ts-ignore
    id: int;

    @Column({ type: "varchar", name: "name", nullable: false})
    //@ts-ignore
    name: string;

}

export default TransType;