import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()

export class TransCate{
    
    @PrimaryColumn({ type: "int", name: "id"})
    //@ts-ignore
    id: int;

    @Column({ type: "int", name: "type_id", nullable: false})
    //@ts-ignore
    typeID: int;

    @Column({ type: "nvarchar", name: "name", nullable: false})
    //@ts-ignore
    name: string;

}

export default TransCate;