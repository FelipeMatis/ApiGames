export default {
    jwt: {
        secret: process.env.JWT_SECRET ?? 'games_api_secret_2024',
        expiresIn: '1d',
    }
}
