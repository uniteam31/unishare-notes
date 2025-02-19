import { createRoot } from 'react-dom/client';
import App from 'app/App';

const domNode = document.getElementById('root');

if (!domNode) {
	throw new Error('Could not find root node!');
}

const root = createRoot(domNode as HTMLElement);

root.render(<App />);
