const router = require('../router')
const request = require("supertest")

describe('Access teachers, students. subjects and classes API', () => {
    it('should show all users', async (done) => {
        const res = await request(router).get('/api/register')
        expect(res.statusCode).toEqual(200)
        done()
    }),
    it('should allow admin users to add information for one class to the Database', async (done) => {
        const res = await request(router).post('/api/register')
            .send({
                "teacherID": "1",
                "classID": "2",
                "subjectID": "1",
                "students": ["1","2","3"]
            })
            expect(a.status).toBe(204)
            done()
    }),
    it('should allow admin users to override information for one class to the Database', async (done) => {
        const res = await request(router).post('/api/register')
            .send({
                "teacherID": "1",
                "classID": "2",
                "subjectID": "1",
                "students": ["1"]
            })
            expect(a.status).toBe(204)
            done()
    }),
})

describe('Access teachers, students. subjects and classes API', () => {
    it('should allow the teachers workload to be displayed', async (done) => {
        const res = await request(router).get('/api/reports/workload')
        expect(res.statusCode).toEqual(200)
        expect(res.body.data).toBeTruthy()
        expect(res.body.data)
        done()
    })
})
