const expect = require('expect');

const {Users} = require('./users');

describe('Users', () => {
  var users;

  beforeEach(() => {
    users = new Users();

    users.users = [{
      id: '1',
      name: 'Jo',
      room: 'Grads'
    },{
      id: '2',
      name: 'Mo',
      room: 'Science'
    }, {
      id: '3',
      name: 'Po',
      room: 'Grads'
    }];

  });

  it('should add new user', () => {
    var users = new Users();
    var user = {
      id: '123',
      name: 'John',
      room: 'Old Trafford'
    };
    var resUser = users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should return names for Grads course', () => {
    var userList = users.getUserList('Grads');
    expect(userList).toEqual(['Jo', 'Po']);
  });

  it('should return names for Science course', () => {
    var userList = users.getUserList('Science');
    expect(userList).toEqual(['Mo']);
  });

  it('should remove a user', () => {
    var userId = '1'
    var user = users.removeUser(userId);

    expect(user.id).toBe(userId);;
    expect(users.users.length).toBe(2);
  });

  it('should not remove user', () => {
    var userId = '50'
    var user = users.removeUser(userId);

    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find a user', () => {
    var userId = '2'
    var user = users.getUser(userId);

    expect(user.id).toEqual(userId);
  });

  it('should not find user', () => {
    var userId = '50'
    var user = users.getUser(userId);

    expect(user).toNotExist();
  });
});
