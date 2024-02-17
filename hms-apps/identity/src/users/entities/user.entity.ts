import {Column, Entity, PrimaryGeneratedColumn} from 'typeorm';

@Entity()

export class User {
    @PrimaryGeneratedColumn('uuid')
    id: string;

      @Column()
      primaryEmailAddress: string;

      @Column()
      passwordHash: string;

      @Column()
      firstName: string;
      
      @Column()
      lastName: string;

      

}
