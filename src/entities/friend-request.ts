import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, Index, ManyToOne, JoinColumn } from 'typeorm';
import { User } from './users.entity';

@Entity('friend-request')
export class FriendRequest {
    @PrimaryGeneratedColumn('uuid')
    request_id: string;

    @Index()
    @Column()
    from_user_id: string;

    @Index()
    @Column()
    to_user_id: string;

    @Column({ type: 'enum', enum: ['pending', 'accepted', 'rejected'], default: 'pending' })
    status: 'pending' | 'accepted' | 'rejected';

    @CreateDateColumn()
    createdAt: Date;

    @UpdateDateColumn()
    updatedAt: Date;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'from_user_id' })
    sender: User;

    @ManyToOne(() => User)
    @JoinColumn({ name: 'to_user_id' })
    receiver: User;
}