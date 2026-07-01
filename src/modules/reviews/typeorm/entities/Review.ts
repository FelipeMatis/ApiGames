import {
    Entity,
    Column,
    CreateDateColumn,
    PrimaryGeneratedColumn,
    UpdateDateColumn,
    ManyToOne,
    JoinColumn
} from "typeorm";
import Game from "@modules/games/typeorm/entities/Game";
import User from "@modules/users/typeorm/entities/User";

@Entity('reviews')
export default class Review {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    titulo: string;

    @Column('text')
    descricao: string;

    @Column('decimal', { precision: 3, scale: 1 })
    nota: number;

    @Column()
    plataforma_jogada: string;

    @Column({ nullable: true })
    horas_jogadas: number;

    @Column({ default: false })
    recomenda: boolean;

    @Column()
    game_id: string;

    @ManyToOne(() => Game, { eager: true })
    @JoinColumn({ name: 'game_id' })
    game: Game;

    @Column()
    user_id: string;

    @ManyToOne(() => User, { eager: true })
    @JoinColumn({ name: 'user_id' })
    user: User;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}
