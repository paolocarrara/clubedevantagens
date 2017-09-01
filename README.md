## clubedevantagens

### Clube de vantagens Javascript client.

### Installing

```shell
npm install clubedevantagens --save
```

### Setting it up

To initiate the client you need to pass your authenticated user and password.

```javascript
var clubedevantagens = require('clubedevantagens');
clubedevantagens.setUser('your-authenticated-user');
clubedevantagens.setPassword('user-password');
```

### Using it
```javascript
...
var clienteAutenticarPromise = clubedevantagens.clienteAutenticar('registereduseremail@provider.com')
clienteAutenticarPromise
  .then(function (response) {
    // do what you gotta do.
  })
  .catch(function (error) {
    // error handling.
  });
```

### Methods

#### clienteCadastrar
Registers an user.
```javascript
clubedevantagens.clienteCadastrar('User full name', 'User email', 'User CPF', 'User cellphone', 'User birth date', 'User gender', 'User state', 'User city', 'User password');
```

#### clienteAutenticar
Verifies if the user with the given email and password is registered
```javascript
clubedevantagens.clienteAutenticar('User email, User password');
```
