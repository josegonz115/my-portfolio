import { XMBLayout } from './components/xmb/XMBLayout';
import { xmbCategories } from './data/xmbData';
import { useXMBNavigation } from './hooks/useXMBNavigation';
import { useXMBReducer } from './hooks/useXMBReducer';
import { useXMBSound } from './hooks/useXMBSound';

export default function App() {
  const [state, dispatch] = useXMBReducer(xmbCategories);
  const sound = useXMBSound();
  useXMBNavigation(state, dispatch, sound);

  return <XMBLayout state={state} dispatch={dispatch} sound={sound} />;
}
