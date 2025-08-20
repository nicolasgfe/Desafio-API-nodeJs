import { unique } from 'drizzle-orm/pg-core'
import { uniqueIndex } from 'drizzle-orm/pg-core'
import { timestamp } from 'drizzle-orm/pg-core'
import { pgTable, uuid, text, pgEnum } from 'drizzle-orm/pg-core'

export const useRole = pgEnum("user_roles", [
  "student",
  "manager"
])

export const users = pgTable('users', {
  id: uuid().primaryKey().defaultRandom(),
  name: text().notNull(),
  email: text().notNull().unique(),
  password: text().notNull(),
  role: useRole().notNull().default("student")
})

export const courses = pgTable('courses', {
  id: uuid().primaryKey().defaultRandom(),
  title: text().notNull().unique(),
  description: text(),
})

export const enrollments = pgTable('enrollments', {
  id: uuid().primaryKey().defaultRandom(),
  userId: uuid().notNull().references(() => users.id),
  courseId: uuid().notNull().references(() => courses.id),
  createdAt: timestamp({ withTimezone: true }).notNull().defaultNow()
}, table => [
  uniqueIndex().on(table.userId, table.courseId)
])