import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  cuisine: string;

  @Column({ type: 'int', default: 30 })
  deliveryTimeMinutes: number;
}
