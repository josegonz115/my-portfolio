import { XMBLayout } from './components/xmb/XMBLayout';
import { useXMBReducer } from './hooks/useXMBReducer';
import { useXMBNavigation } from './hooks/useXMBNavigation';
import { useXMBSound } from './hooks/useXMBSound';
import { xmbCategories } from './data/xmbData';

export default function App() {
  const [state, dispatch] = useXMBReducer(xmbCategories);
  const sound = useXMBSound();
  useXMBNavigation(state, dispatch, sound);

  return <XMBLayout state={state} dispatch={dispatch} sound={sound} />;
}
