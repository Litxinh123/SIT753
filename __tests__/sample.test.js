// __tests__/user.test.js

function authenticateUser(username, password) {
  if (username === 'lilleetaste' && password === '123456') {
    return true;
  }
  return false;
}

test('User login with correct credentials', () => {
  expect(authenticateUser('lilleetaste', '123456')).toBe(true);
});

test('User login fails with incorrect username', () => {
  expect(authenticateUser('wronguser', '123456')).toBe(false);
});

test('User login fails with incorrect password', () => {
  expect(authenticateUser('atuan', 'wrongpass')).toBe(false);
});
