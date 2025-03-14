import { useEffect } from 'react';
import { NotesPage } from 'pages/NotesPage';
import { useUserStore } from 'entities/User';

import './styles/index.scss';
import '@uniteam31/uni-shared-ui/dist/esm/global.scss';

const App = () => {
	const { initAuthData } = useUserStore();

	useEffect(() => {
		initAuthData();
	}, [initAuthData]);

	return <NotesPage />;
};

export default App;
