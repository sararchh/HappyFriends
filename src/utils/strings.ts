export function getRandomString() {
  let chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuwxyz0123456789";
  let length = 8;

  var string = '';

  for (let i = length; i > 0; --i) {
    string += chars[Math.floor(Math.random() * chars.length)];
  }
  return string;
}