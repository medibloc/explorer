import { startSubscribe, sync } from './handler';


export default () => startSubscribe(sync());
