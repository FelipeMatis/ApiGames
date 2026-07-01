import { Entity, Column, CreateDateColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

@Entity('games')
export default class Game {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column()
    nome: string;

    @Column()
    genero: string;

    @Column()
    plataforma: string;

    @Column('date')
    data_lancamento: Date;

    @Column()
    classificacao_indicativa: string;

    @Column()
    desenvolvedora: string;

    @CreateDateColumn()
    created_at: Date;

    @UpdateDateColumn()
    updated_at: Date;
}