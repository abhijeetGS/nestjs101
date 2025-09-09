import { Entity } from '@nestjs/common';
import { Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity( {name: 'user_posts'} )
export class Posts {

  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  description: string;
}