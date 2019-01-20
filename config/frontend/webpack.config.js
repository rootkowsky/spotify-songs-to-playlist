const utils = require('../utils');
const configPath = utils.path('config/frontend/');
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
const globImporter = require('node-sass-glob-importer');


module.exports = {
	mode: 'production',
	entry: {
		app: utils.path('src/frontend/index.tsx'),
	},
	output: {
		path: utils.path('public/dist/js'),
		filename: "[name].bundle.js",
	},
	resolve: {
		extensions: [".tsx", ".ts", ".jsx", ".js"],
	},
	module: {
		rules: [
			{
				test: /\.tsx?$/,
				exclude: /node_modules/,
				use: [
					{
						loader: 'babel-loader',
						options: {
							babelrc: true,
							configFile: configPath + '.babelrc',
						},
					},
					{
						loader: 'awesome-typescript-loader',
						options: {
							configFileName: configPath + 'tsconfig.json',
						},
					},
				],
			},
			{
				test: /\.scss$/,
				use: [
					MiniCssExtractPlugin.loader, // creates style nodes from JS strings
					"css-loader", // translates CSS into CommonJS
					{
						loader: "sass-loader",
						options: {
							importer: globImporter(),
						},
					}, // compiles Sass to CSS, using Node Sass by default
				],
			},
		],
	},
	plugins: [
		new MiniCssExtractPlugin({
			// Options similar to the same options in webpackOptions.output
			// both options are optional
			filename: "../css/[name].css",
			chunkFilename: "[id].css",
		}),
		new OptimizeCSSAssetsPlugin({}),
	],
	optimization: {
		splitChunks: {
			cacheGroups: {
				styles: {
					name: 'styles',
					test: /\.css$/,
					chunks: 'all',
					enforce: true,
				},
			},
		},
	},
};