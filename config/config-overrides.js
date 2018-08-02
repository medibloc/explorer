/* eslint-disable */
module.exports = (config) => {
	// Add the SASS loader second-to-last
	// (last one must remain as the "file-loader")

	// Added postcss-loader before sass-loader
	// postcss is post processing css (https://github.com/postcss/postcss-loader)

	let loaderList = config.module.rules[1].oneOf;
	loaderList.splice(loaderList.length - 1, 0,
		{
			test: /\.scss$/,
			use: [
				"style-loader",
				{ loader: 'css-loader', options: { importLoaders: 1 } },
				{
					loader: require.resolve('postcss-loader'),
					options: {
						// Necessary for external CSS imports to work
						// https://github.com/facebookincubator/create-react-app/issues/2677
						ident: 'postcss',
						plugins: () => [
							require('postcss-flexbugs-fixes'),
							require('autoprefixer')({
								browsers: [
									'>1%',
									'last 4 versions',
									'Firefox ESR',
									'not ie < 9', // React doesn't support IE8 anyway
								],
								flexbox: 'no-2009',
							}),
						],
					},
				},
				"sass-loader"
			]
		}
	);
};
