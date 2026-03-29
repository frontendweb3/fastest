// Initialize Lucide icons - include only the icons you need

import { createIcons, Sun, Moon, Search,UserRound, SendHorizontal, House, ChevronRight,ChevronLeft, PanelLeft, CircleUserRound, Rss, Hash, Dot, ArrowRight, BadgeCheck, Copy, CopyCheck, UserPlus, Globe, Crown, Tag, Lock, MoveRight } from 'lucide';
export function initIcons() {
  createIcons({
    icons: {
      Sun,
      Moon,
      Search,
      UserRound,
      SendHorizontal,
      House,
      ChevronRight,
      ChevronLeft,
      PanelLeft,
      CircleUserRound,
      Rss,
      Hash,
      Dot,
      ArrowRight,
      BadgeCheck,
      Copy,
      CopyCheck,
      UserPlus,
      Globe,
      Crown,
      Tag,
      Lock,
      MoveRight,
    }
  });
}

// Auto-initialize icons
initIcons();

// {{> "components/icon" name="search" ariaLabel="search icon"}}
