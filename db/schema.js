import { sql } from "drizzle-orm"
import { integer, real, sqliteTable, text } from "drizzle-orm/sqlite-core"

export const grahak = sqliteTable("grahak", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  naam: text("naam").notNull(),
  mobile: text("mobile").notNull(),
  pata: text("pata"),
  banaya: text("banaya").default(sql`CURRENT_TIMESTAMP`),
})

export const samaan = sqliteTable("samaan", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  naam: text("naam").notNull(),
  shreni: text("shreni").notNull(),
  matra: integer("matra").notNull().default(0),
  kharidMulya: real("kharid_mulya").notNull(),
  bikriMulya: real("bikri_mulya").notNull(),
  ikaai: text("ikaai").notNull(),
})

export const bill = sqliteTable("bill", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  billNumber: text("bill_number").notNull().unique(),
  grahakId: integer("grahak_id").references(() => grahak.id),
  kulRakam: real("kul_rakam").notNull(),
  bhugtanVidhi: text("bhugtan_vidhi").notNull(),
  sthiti: text("sthiti").notNull().default("nakad"),
  banaya: text("banaya").default(sql`CURRENT_TIMESTAMP`),
})

export const billItem = sqliteTable("bill_item", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  billId: integer("bill_id").references(() => bill.id),
  samaanId: integer("samaan_id").references(() => samaan.id),
  matra: integer("matra").notNull(),
  mulya: real("mulya").notNull(),
  kul: real("kul").notNull(),
})

export const udhaari = sqliteTable("udhaari", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  grahakId: integer("grahak_id").references(() => grahak.id),
  billId: integer("bill_id").references(() => bill.id),
  rakam: real("rakam").notNull(),
  chukaya: real("chukaya").notNull().default(0),
  banaya: text("banaya").default(sql`CURRENT_TIMESTAMP`),
})