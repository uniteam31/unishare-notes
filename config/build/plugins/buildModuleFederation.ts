import webpack from 'webpack';
import packageJson from '../../../package.json';

export const buildModuleFederation = () => {
	return new webpack.container.ModuleFederationPlugin({
		name: 'notes',
		filename: 'remoteEntry.js',
		//
		exposes: {
			'./App': 'app/App.tsx',
		},
		shared: {
			...packageJson.dependencies,
			// 	react: {
			// 		eager: true,
			// 		// requiredVersion: packageJson.dependencies['react'],
			// 	},
			// 	'react-router-dom': {
			// 		eager: true,
			// 		// requiredVersion: packageJson.dependencies['react-router-dom'],
			// 	},
			// 	'react-dom': {
			// 		eager: true,
			// 		// requiredVersion: packageJson.dependencies['react-dom'],
			// 	},
		},
	});
};
