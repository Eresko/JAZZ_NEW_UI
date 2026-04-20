module.exports = {
    apps: [
        {
            name: 'jazz-app-nuxt4',
            script: './.output/server/index.mjs',
            args: '', // Можно передать аргументы, если нужно
            env: {
                PORT: 8067,
                NODE_ENV: 'development'
            },
            env_production: {
                PORT: 8067,
                NODE_ENV: 'production'
            },
            watch: false // В продакшене лучше false, перезагружайте вручную после билда
        }
    ],

    deploy: {
        production: {
            user: 'SSH_USERNAME',
            host: 'SSH_HOSTMACHINE',
            ref: 'origin/master',
            repo: 'GIT_REPOSITORY',
            path: 'DESTINATION_PATH',
            // Важно: для Nuxt 4 нужно запускать билд перед релоадом
            'post-deploy': 'npm install && npm run build && pm2 reload ecosystem.config.cjs --env production'
        }
    }
};