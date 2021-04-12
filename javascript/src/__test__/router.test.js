const app = require('../router')
require('iconv-lite').encodingExists('foo')
const request = require("supertest")

describe('User API', () => {
    it('should show all users', async () => {
        const res = await request(router).get('/api/register')
        expect(res.statusCode).toEqual(200)
    })
})