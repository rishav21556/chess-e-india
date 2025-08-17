import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('friend-list')
export class FriendList {
    @Column()
    user_id: string;

    @Column()
    friend_id: string;

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'user_id' })
    user: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'friend_id' })
    friend: User;

    @PrimaryGeneratedColumn()
    @Index(['user_id', 'friend_id'], { unique: true })
    id: string;
}