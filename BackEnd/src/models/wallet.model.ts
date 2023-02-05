import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity()

export class Wallet{
    
    @PrimaryColumn({ type: "int", name: "id"})
    //@ts-ignore
    id: int;

    @Column({ type: "int", name: "user_id", nullable: false})
    //@ts-ignore
    userID: string;

    @Column({ type: "nvarchar", name: "name", nullable: false})
    //@ts-ignore
    name: string;

    @Column({ type: "int", name: "balance", nullable: true})
    //@ts-ignore
    balance: string;

    @Column({ type: "boolean", name: "include_total", nullable: true})
    //@ts-ignore
    includeTotal: boolean;

    @Column({ type: "boolean", name: "active", nullable: true})
    //@ts-ignore
    active: boolean;

}

export default Wallet;