# quote

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### DB Configuration

Variables
1. MONGO_HOST - mongodb hostname
2. MONGO_USER - mongodb user name
3. MONGO_PASS - mongodb user auth password
4. MONGO_DB - database to connect

**Adding new USER**
```
> db.createUser({
    user:'MONGO_USER', 
    pwd:'MONGO_PASS', 
    roles:[
        {
            role:'readWrite', 
            db:'MONGO_DB'
            }
    ]
});
```