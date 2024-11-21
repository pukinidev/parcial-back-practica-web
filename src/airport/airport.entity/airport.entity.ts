import { AirlineEntity } from 'src/airline/airline.entity/airline.entity';
import { Column, Entity, ManyToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class AirportEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  code: string;

  @Column()
  country: string;

  @Column()
  city: string;

  @ManyToMany(() => AirlineEntity)
  airlines: AirlineEntity[];
}
