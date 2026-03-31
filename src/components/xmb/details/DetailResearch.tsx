import type { XMBItem } from '../../../types/xmb';
import { DetailProject } from './DetailProject';

interface Props {
  item: XMBItem;
}

export function DetailResearch({ item }: Props) {
  // Research items use the same project detail format
  return <DetailProject item={item} />;
}
