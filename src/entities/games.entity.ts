import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { Timestamp } from 'typeorm/browser';
import { User } from './users.entity';

enum GameResult {
    WHITE = 'white',
    BLACK = 'black',
    DRAW = 'draw',
    IN_PROGRESS = 'in_progress'
}

enum Termination {
    CHECKMATE = 'checkmate',
    RESIGN = 'resign',
    TIMEOUT = 'timeout',
    AGREED_DRAW = 'agreed_draw',
    STALEMATE = 'stalemate',
    REPETITION = 'repetition',
}

@Entity('games')
export class Game {
    @PrimaryGeneratedColumn('uuid')
    game_id: string;

    @Index()
    @Column()
    black_user_id: string;

    @Index()
    @Column()
    white_user_id: string;

    // remaining time in ms (not absolute timestamp)
    @Column({ type: 'integer', default: 0 })
    white_time_ms: number;

    @Column({ type: 'integer', default: 0 })
    black_time_ms: number;

    @Index()
    @Column({ type: 'enum', enum: GameResult, default: GameResult.IN_PROGRESS })
    result: GameResult;

    @Column({ type: 'enum', enum: Termination, nullable: true })
    termination: Termination;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'white_user_id' })
    whiteUser: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'black_user_id' })
    blackUser: User;
}
