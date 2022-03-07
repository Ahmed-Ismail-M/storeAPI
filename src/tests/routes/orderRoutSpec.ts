import Express from 'express'
import { OrderQuery } from '../../models/order'
import { orderSerializer } from '../../serializers/orderSerializer'
const request = require('supertest')
const app: Express.Application = require('../../server')
const orderQuery :OrderQuery = {
  id: 2,
  product_id: 2,
  user_id: 2,
  qty: 10,
  status: 'pending'
}
describe('Test Server', () => {
  describe('test /order', () => {
    it('shoud return 200 ok create order', (done) => {
      request(app)
        .post('/order')
        .send({ id: orderQuery.id, product_id: orderQuery.product_id, user_id: orderQuery.user_id, qty: orderQuery.qty, status: orderQuery.status })
        .expect(200)
        .expect(orderQuery)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get order', (done) => {
      request(app)
        .get('/order')
        .expect(200)
        // .expect(typeof Array)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok get order by id', (done) => {
      request(app)
        .get('/order/2')
        .expect(200)
        .expect(async () => { orderSerializer(orderQuery) })
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return 200 ok delete order', (done) => {
      request(app)
        .delete('/order')
        .send({ id: 3 })
        .expect(200)
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
  describe('error test /order', () => {
    it('shoud return error 400 price is not a number', (done) => {
      request(app)
        .post('/order')
        .send({ id: orderQuery.id, product_id: orderQuery.product_id, user_id: orderQuery.user_id, qty: 'string', status: orderQuery.status })
        .expect(400)
        .expect({})
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
    it('shoud return error 400 price is not a number', (done) => {
      request(app)
        .delete('/order')
        .send({ id: 33 })
        .expect([])
        .expect('Content-Type', 'application/json; charset=utf-8')
        .end((error: Error) => (error ? done.fail(error) : done()))
    })
  })
})
