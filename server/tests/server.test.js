const expect = require('expect');
const request = require('supertest');

const {app} = require('../server.js');
const {Todo} = require('../models/todo.js');
const {ObjectID} = require('mongodb');

const todos = [{
  _id: new ObjectID(),
  text: "first test todo",
}, {
  _id: new ObjectID(),
  text: "second test todo",
  completed: true,
  completedAt: 333
}];

beforeEach((done) => {
  Todo.remove({}).then(() => {
    return Todo.insertMany(todos);
  }).then(() => done());
});

describe('POST /todos', () => {
  it('should create a new todo', (done) => {
    let text = "test todo text";
    request(app)
      .post('/todos')
      .send({text})
      .expect(200)
      .expect((res) => {
        expect(res.body.text).toBe(text);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find({text}).then((todos) => {
          expect(todos.length).toBe(1);
          expect(todos[0].text).toBe(text);
          done();
        }).catch((e) => done(e));
      });
  })

  it('should not create todo with invalid body data', (done) => {
    request(app)
      .post('/todos')
      .send()
      .expect(400)
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.find().then((todos) => {
          expect(todos.length).toBe(2);
          done();
        }).catch((e) => done(e));
      })
  })
})


describe('GET /todos', () => {
  it('should get all todos', (done) => {
    request(app)
      .get('/todos')
      .expect(200)
      .expect((res) => {
        expect(res.body.todos.length).toBe(2);
      })
      .end(done)
  })
})

describe('GET /todos/:id', () => {
  it('should get the todo with the right id', (done) => {
    let todo = todos[0];
    request(app)
      .get('/todos/' + todo._id.toHexString())
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(todo._id.toHexString());
      })
      .end(done)
  })

  it('should return 404 if todo not found', (done) => {
    let id = new ObjectID().toHexString();
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)
  })

  it('should return 404 if invalid id', (done) => {
    let id = '123';
    request(app)
      .get(`/todos/${id}`)
      .expect(404)
      .end(done)
  })
})

describe('DELETE /todos/:id', () => {
  it('should remove a todo with an id', (done) => {
    let todoId = todos[0]._id.toHexString();
    request(app)
      .delete(`/todos/${todoId}`)
      .expect(200)
      .expect((res) => {
        expect(res.body.todo._id).toBe(todoId);
      })
      .end((err, res) => {
        if (err) {
          return done(err);
        }
        Todo.findById(todoId).then((todo) => {
          expect(todo).toNotExist();
        })
        Todo.find().then((todos) => {
          expect(todos.length).toBe(1);
          done();
        }).catch((e) => done(e));
      });
  })

  it('should return 404 if todo not found', (done) => {
    let todoId = new ObjectID();
    request(app)
      .delete(`/todos/${todoId}`)
      .expect(404)
      .end(done)
  })

  it ('should return 404 if invalid id', (done) => {
    let todoId = '123';
    request(app)
      .delete(`/todos/${todoId}`)
      .expect(404)
      .end(done)
  })
})


describe('PATCH /todos', () => {
  it("should update the todo", (done) => {
    let todoId = todos[0]._id.toHexString();
    let text = "this should be the new text";
    request(app)
      .patch(`/todos/${todoId}`)
      .send({text: text, completed: true})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(true);
        expect(res.body.todo.completedAt).toBeA('number');
      })
      .end(done);
  })

  it("should clear completedAt when todo is not completed", (done) => {
    let todoId = todos[1]._id.toHexString();
    let text = "updated test";
    request(app)
      .patch(`/todos/${todoId}`)
      .send({complete: false, text: text})
      .expect(200)
      .expect((res) => {
        expect(res.body.todo.text).toBe(text);
        expect(res.body.todo.completed).toBe(false);
        expect(res.body.todo.completedAt).toNotExist();
      })
      .end(done);
  })
})
