import { useHistory } from 'react-router-dom';

export default function GoToPage(url: string) {
    const history = useHistory();

    history.push(url);
}