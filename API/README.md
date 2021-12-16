# Available Endpoints

- Create Game

```
POST /games

payload: {
    "boardSize"(optional): number but defaults to 3,
    "currentPlayer"(optional): X or O but defaults to X 
}
```

- Get All Games

```
GET /games
```

- Get Game By Id

```
GET /games/:gameId
```

- Player move - called when played clicks on a square

```
PUT /games/:gameId

payload: {
    newPosition: e.g "10"
}
```