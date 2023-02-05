import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()

export class Transaction{
    
    @PrimaryColumn({ type: "int", name: "id"})
    //@ts-ignore
    id: int;

    @Column({ type: "int", name: "type_id", nullable: false })
    //@ts-ignore
    typeID: int;

    @Column({ type: "int", name: "category_id", nullable: false })
    //@ts-ignore
    categoryId: int;

    @Column({ type: "int", name: "money", nullable: false })
    //@ts-ignore
    money: int;

    @Column({ type: "date", name: "date", nullable: true })
    //@ts-ignore
    date: Date;

    @Column({ type: "nvarchar", name: "note", nullable: true })
    //@ts-ignore
    note: string;

    @Column({ type: "nvarchar", name: "image", nullable: true })
    //@ts-ignore
    image: string;


}

export default Transaction;