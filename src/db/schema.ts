import { pgTable, serial, text, varchar, timestamp, boolean, integer } from 'drizzle-orm/pg-core';

export const menuItems = pgTable('menu_items', {
  id: serial('id').primaryKey(),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description'),
  price: integer('price').notNull(), // stored in cents/paise
  category: varchar('category', { length: 100 }).notNull(),
  image_url: varchar('image_url', { length: 500 }),
  is_available: boolean('is_available').default(true).notNull(),
  created_at: timestamp('created_at').defaultNow().notNull(),
});

export const locations = pgTable('locations', {
  id: serial('id').primaryKey(),
  city: varchar('city', { length: 100 }).notNull(),
  address: text('address').notNull(),
  phone: varchar('phone', { length: 50 }),
  maps_url: varchar('maps_url', { length: 500 }),
  is_active: boolean('is_active').default(true).notNull(),
});

export const reservations = pgTable('reservations', {
  id: serial('id').primaryKey(),
  customer_name: varchar('customer_name', { length: 255 }).notNull(),
  customer_email: varchar('customer_email', { length: 255 }).notNull(),
  customer_phone: varchar('customer_phone', { length: 50 }).notNull(),
  location_id: integer('location_id').references(() => locations.id).notNull(),
  reservation_time: timestamp('reservation_time').notNull(),
  guests: integer('guests').notNull(),
  special_requests: text('special_requests'),
  status: varchar('status', { length: 50 }).default('pending').notNull(), // pending, confirmed, cancelled
  created_at: timestamp('created_at').defaultNow().notNull(),
});
