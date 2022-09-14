import {
    Entity, 
    PrimaryColumn
} from "typeorm";

@Entity({ name: "like" })
export class Like {
    
    @PrimaryColumn()
    postId: number;

    @PrimaryColumn()
    userId: number;
};