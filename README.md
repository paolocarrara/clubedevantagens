## clubedevantagens

### Clube de Vantagens javascript client.

* ### Installing
```shell
npm install clubedevantagens --save
```

* ### Setting it up
To initiate the client you need to pass your authenticated user and password.
```javascript
var clubedevantagens = require('clubedevantagens');
clubedevantagens.setUser('your-authenticated-user');
clubedevantagens.setPassword('user-password');
```

* ### Using it
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

* #### clienteCadastrar
Registers an user.
```javascript
clubedevantagens.clienteCadastrar('User full name', 'User email', 'User CPF', 'User cellphone', 'User birth date', 'User gender', 'User state', 'User city', 'User password');
```

---

* #### clienteAutenticar
Verifies if the user with the given email and password is registered.
```javascript
clubedevantagens.clienteAutenticar('User email, User password');
```

---

* #### clienteRecuperarSenha
Sends an recover password email to the given email address.
```javascript
clubedevantagens.clienteRecuperarSenha('User email');
```

---

* #### ofertaCodigo
Gets the details of an offer.
```javascript
clubedevantagens.ofertaCodigo('offer code');
```

---

* #### ofertaBuscar (limit, offset, uf, codigoCategoria, urlCategoria, termoDeBusca)
Lists offers based on a search term.
##### arguments
__limit__: Total of results per page
__offset__: Page number
__uf__: State abbreviation
__codigoCategoria__: Category code
__urlCategoria__: Category url
__termoDeBusca__: Search term
```javascript
clubedevantagens.ofertaBuscar('limit', 'offset', 'uf', 'codigoCategoria', 'urlCategoria', 'termoDeBusca');
```
