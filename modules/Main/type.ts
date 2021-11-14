import { StackNavigationProp } from '@react-navigation/stack';
import { MostViewArticleType } from '../SearchNews/types';
import { NewsDeskParamList } from '../utils/NavigatorsAndTypes';

export interface NewDeskCategoryListProps {
   item: string;
   navigation: StackNavigationProp<
      NewsDeskParamList,
      'NewsDeskCategory'
   >;
   setMyClipedNewsDesk: React.Dispatch<
      React.SetStateAction<string[]>
   >;
   myClipedNewsDesk: string[];
}
export interface NewsDeskStackNavigationProps {
   isClip?: boolean;
}

export interface NewsDeskCategoryPageNationProps {
   currentPage: number;
   maxPage: number;
   pageNationHandler: (where: 'forward' | 'back') => any;
}
export interface ClipedCategoryProps {
   item: string;
   navigation: StackNavigationProp<
      NewsDeskParamList,
      'NewsDeskCategory'
   >;
   deleteClipedNewsDesk: (item: string) => void;
}
export interface MostViewSelectBoxProps {
   setSearchDays: React.Dispatch<React.SetStateAction<number>>;
   searchDays: number;
   item: number;
}
export type MostViewListProps = MostViewArticleType;
