import { User } from "../../model/user";

 
  //when
  const user = new User({id: 1, role: 'admin', name: 'name', firstName: 'firstName', password: 'password'});
  //then

  expect(user.getId()).toBe(1);
  expect(user.getRole()).toBe('admin');
  expect(user.getName()).toBe('name');
  expect(user.getFirstName()).toBe('firstName');
  expect(user.getPassword()).toBe('password');
});

test('given: user with missing role, when: creating user, then: error is thrown', () => {
  //when
  //then
  const user = () =>
    new User({role: '', name: 'name', firstName: 'firstName', password: 'password'});

  // then
  expect(user).toThrow('User role is required');
  
});

test('given: user with missing name, when: creating user, then: error is thrown', () => {
  //when
  //then
  const user = () =>
    new User({role: 'admin', name: '', firstName: 'firstName', password: 'password'});
  // then
  expect(user).toThrow('User name is required');
});

test('given: user with missing first name, when: creating user, then: error is thrown', () => {
  //when
  //then
  const user = () =>
    new User({role: 'admin', name: 'name', firstName: '', password: 'password'});
  // then
  expect(user).toThrow('User first name is required');
});

test('given: user with missing password, when: creating user, then: error is thrown', () => {
  //when
  //then
  const user = () =>
    new User({role: 'admin', name: 'name', firstName: 'firstName', password: ''});
  // then
  expect(user).toThrow('User password is required');
});

