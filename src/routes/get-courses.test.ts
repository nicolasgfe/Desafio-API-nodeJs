import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { faker } from "@faker-js/faker"
import { makeCourse } from "../tests/factories/make-course.ts"
import { randomUUID } from "node:crypto"


test('get courses', async () => {
	server.ready()

	const titleId = randomUUID()

	const course = await makeCourse(titleId)

	const response = await request(server.server)
		.get(`/courses?search=${titleId}`)

	console.log(response.body);

	expect(response.status).toEqual(200)
	expect(response.body).toEqual({
		courses: [{
			id: expect.any(String),
			title: titleId,
			enrollments: 0,
		}],
		total: 1
	})

})
