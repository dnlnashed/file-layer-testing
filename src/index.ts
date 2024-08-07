// without this import, this file doesn't end up in the build
import './css/style.css';

import { GoodTimes } from '@/internal';

// everything after is what executes at startup

const givver = new GoodTimes();
givver.doWork();
