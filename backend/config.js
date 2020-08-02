
// the configuration of the db, export to server.js
export default {
    MONGODB_URL: process.env.MONGODB_URL || 'mongodb://localhost/game_review_board',
    JWT_SECRET: process.env.JWT_SECRET || 'somethingsecret'
}