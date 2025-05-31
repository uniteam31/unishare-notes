import path from 'path';
import { WebpackConfiguration } from 'webpack-cli';
import { BuildOptions } from './types/config';

export const BuildResolvers = (options: BuildOptions): WebpackConfiguration['resolve'] => {
	return {
		extensions: ['.tsx', '.ts', '.js'],
		// настройки для работы абсолютных путей
		preferAbsolute: true,
		modules: [options.paths.src, 'node_modules'],
		mainFiles: ['index'],
		alias: {
			/** Эти алиасы нужны для корректной работы yarn link при локальной разработке пакетов */
			react: path.join(options.paths.nodeModules, 'react'),
			'react-dom': path.join(options.paths.nodeModules, 'react-dom'),
			'react-hook-form': path.join(options.paths.nodeModules, 'react-hook-form'),
		},
	};
};
