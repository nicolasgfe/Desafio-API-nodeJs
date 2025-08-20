import { test, expect } from "vitest"
import request from "supertest"
import { server } from "../app.ts"
import { makeCourse } from "../tests/factories/make-course.ts"


test('get course by id', async () => {
	server.ready()

	const course = await makeCourse()

	const response = await request(server.server)
		.get(`/courses/${course.id}`)

	expect(response.status).toEqual(200)
	expect(response.body).toEqual({
		course: {
			id: expect.any(String),
			title: expect.any(String),
			description: null,
		}
	})

})
test('return 404 for non existing courses', async () => {
	server.ready()


	const response = await request(server.server)
		.get(`/courses/f842be97-bc28-4127-aae5-d60eabee9c84`)

	expect(response.status).toEqual(404)
})
