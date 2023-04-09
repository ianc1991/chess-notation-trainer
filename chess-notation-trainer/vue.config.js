module.exports = {
	css: {
		loaderOptions: {
			postcss: {
				config: {
					path: './postcss.config.cjs',
				},
			},
		},
	},

	devServer: {
		proxy: {
			'^/api': {
				target: 'https://lichess.org',
				changeOrigin: true,
				pathRewrite: { '^/api': '/api' },
			},
		},
	},
}
