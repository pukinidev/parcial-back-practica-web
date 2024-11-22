import { AirportEntity } from 'src/airport/airport.entity/airport.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class AirlineEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  description: string;

  @Column()
  foundationDate: Date;

  @Column()
  website: string;

  @ManyToMany(() => AirportEntity)
  @JoinTable()
  airports: AirportEntity[];
}
