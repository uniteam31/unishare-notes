import webpack from 'webpack';
import packageJson from '../../../package.json';

export const buildModuleFederation = () => {
	return new webpack.container.ModuleFederationPlugin({
		name: 'notes',
		filename: 'remoteEntry.js',
		//
		exposes: {
			'./App': 'app/App.tsx',
			'./Widget': 'widgets/NoteWidget/index.ts',
		},
		shared: {
			...packageJson.dependencies,
			react: {
				singleton: true,
				requiredVersion: packageJson.dependencies['react'],
			},
			'react-router-dom': {
				singleton: true,
				requiredVersion: packageJson.dependencies['react-router-dom'],
			},
			'react-dom': {
				singleton: true,
				requiredVersion: packageJson.dependencies['react-dom'],
			},
			zustand: {
				singleton: true,
				requiredVersion: packageJson.dependencies['zustand'],
			},
		},
	});
};
