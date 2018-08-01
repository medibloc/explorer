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
				'postcss-loader',
				"sass-loader"
			]
		}
	);
};
