import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('restaurants')
export class Restaurant {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  name!: string;

  @Column()
  cuisine!: string;

  @Column({ type: 'int', default: 30 })
  deliveryTimeMinutes!: number;

  @Column({ type: 'decimal', precision: 2, scale: 1, default: 4.5 })
  rating!: number;

  @Column({ type: 'decimal', precision: 5, scale: 2, default: 2.99 })
  deliveryFee!: number;

  @Column({ default: true })
  isOpen!: boolean;

  @Column({ default: false })
  isFeatured!: boolean;

  @Column({ type: 'int', default: 0 })
  promoPercent!: number;
}
