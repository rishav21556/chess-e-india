import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('chats')
export class Chat {
    @PrimaryGeneratedColumn('uuid')
    chat_id: string;

    @Index()
    @Column()
    sender_id: string;

    @Index()
    @Column()
    receiver_id: string;

    @Column({ type: 'text' })
    message: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'sender_id' })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'receiver_id' })
    receiver: User;
}
