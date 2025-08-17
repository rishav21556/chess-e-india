import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Game } from './games.entity';
@Entity('moves')
export class MoveEntity {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Index()
    @Column()
    game_id: string;

    @Column()
    move_number: number;

    @Column({ nullable: true })
    white_notation: string;

    @Column({ nullable: true })
    black_notation: string;

    @Column({ type: 'jsonb', nullable: true })
    extra: any;

    @ManyToOne(() => Game)
    @JoinColumn({ name: 'game_id' })
    game: Game;
}
