import { GameRequest } from "./game.interface"
import { findAllGames, playerMove, startGame } from "./game.service"

describe('Game.service', () => {

    describe('Find all games', () => {
        it('should return empty array if there are no available games', async () => {
            const gamesFound = await findAllGames();
            expect(gamesFound.length).toEqual(0)
        })

        it('should create find all available games', async () => {
            await startGame()
            const gamesFound = await findAllGames();
            expect(gamesFound.length).toEqual(1)
        })
    })

    describe('Start game', () => {
        it('should create a new Game entry for empty payload and return game details with default values', async () => {
            const game = await startGame()
            expect(game.boardSize).toEqual(3)
            expect(game.currentPlayer).toEqual('X')
        })

        it('should create a new Game entry for specified payload values and return correct game details', async () => {
            const game = await startGame(4, 'O')
            expect(game.boardSize).toEqual(4)
            expect(game.currentPlayer).toEqual('O')
            expect(game.blockedPositions.length).toEqual(0)
            expect(game.players['X'].length).toEqual(0)
            expect(game.players['O'].length).toEqual(0)
        })
    })

    describe('Player action', () => {
        let game;
        beforeAll(async () => {
            const response = await startGame();
            game = response;
        })
        it('should prompt game doesnt exist for incorrect game ids', async () => {
            try {
                await playerMove(123, game)
            } catch (e) {
                expect(e.message).toEqual('game does not exist')
            }
        })
        it('should prompt for invalid index input', async () => {
            try {
                const params: GameRequest = { newPosition: "13" }
                await playerMove(game.id, params)
            } catch (e) {
                expect(e.message).toEqual('Invalid index position!')
            }
        })
        it('should prompt for already taken position', async () => {
            try {
                const params: GameRequest = { newPosition: "00" }
                await playerMove(game.id, params)
                await playerMove(game.id, params)
            } catch (e) {
                expect(e.message).toEqual('position is taken!')
            }
        })

        it('should prompt game is already a draw', async () => {
            try {
                let params: GameRequest = { newPosition: "01" }
                console.log(game.id)
                await playerMove(game.id, params)
                params.newPosition = "02"
                await playerMove(game.id, params)
                params.newPosition = "10"
                await playerMove(game.id, params)
                params.newPosition = "11"
                await playerMove(game.id, params)
                params.newPosition = "12"
                await playerMove(game.id, params)
                params.newPosition = "21"
                await playerMove(game.id, params)
                params.newPosition = "20"
                await playerMove(game.id, params)
                params.newPosition = "22"
                await playerMove(game.id, params)
            } catch (e) {
                expect(e.message).toEqual('DRAW!!!')
            }
        })
    })

    describe('Players WINNING actions', () => {
        let game;
        beforeAll(async () => {
            const response = await startGame();
            game = response;
        })
        it('when X has horizontal winning match', async () => {
            try {
                let params: GameRequest = { newPosition: "00" }
                await playerMove(game.id, params)
                params.newPosition = "10"
                await playerMove(game.id, params)
                params.newPosition = "01"
                await playerMove(game.id, params)
                params.newPosition = "11"
                await playerMove(game.id, params)
                params.newPosition = "02"
                const resp = await playerMove(game.id, params)
                expect(resp.winner).toEqual('X')

                params.newPosition = "12"
                await playerMove(game.id, params)

            } catch (e) {
                expect(e.message).toEqual('this game was already won by player X')
            }
        })
        it('when X has vertical winning match', async () => {
            try {
                let params: GameRequest = { newPosition: "01" }
                await playerMove(game.id, params)
                params.newPosition = "01"
                await playerMove(game.id, params)
                params.newPosition = "11"
                await playerMove(game.id, params)
                params.newPosition = "02"
                await playerMove(game.id, params)
                params.newPosition = "21"
                const resp = await playerMove(game.id, params)
                expect(resp.winner).toEqual('X')

                params.newPosition = "12"
                await playerMove(game.id, params)

            } catch (e) {
                expect(e.message).toEqual('this game was already won by player X')
            }
        })
        it('when X has diagonal from top left to bottom right winning match', async () => {
            try {
                let params: GameRequest = { newPosition: "00" }
                await playerMove(game.id, params)
                params.newPosition = "01"
                await playerMove(game.id, params)
                params.newPosition = "11"
                await playerMove(game.id, params)
                params.newPosition = "02"
                await playerMove(game.id, params)
                params.newPosition = "22"
                const resp = await playerMove(game.id, params)
                expect(resp.winner).toEqual('X')

                params.newPosition = "12"
                await playerMove(game.id, params)

            } catch (e) {
                expect(e.message).toEqual('this game was already won by player X')
            }
        })
        it('when X has diagonal from top right to bottom left winning match', async () => {
            try {
                let params: GameRequest = { newPosition: "02" }
                await playerMove(game.id, params)
                params.newPosition = "00"
                await playerMove(game.id, params)
                params.newPosition = "11"
                await playerMove(game.id, params)
                params.newPosition = "01"
                await playerMove(game.id, params)
                params.newPosition = "20"
                const resp = await playerMove(game.id, params)
                expect(resp.winner).toEqual('X')

                params.newPosition = "12"
                await playerMove(game.id, params)

            } catch (e) {
                expect(e.message).toEqual('this game was already won by player X')
            }
        })
    })
})